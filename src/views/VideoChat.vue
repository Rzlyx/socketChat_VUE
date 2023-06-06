<template>
  <div>
    <div style="width: 200px; height: 150px;">
      <video ref="localVideo" autoplay style="width: 100%; height: 100%;"></video>
    </div>
    <video ref="remoteVideo" autoplay></video>
    <button @click="startVideoChat">Start Video Chat</button>
    <button @click="toggleVideo">Toggle Video</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      isVideoOn: true,
      socket: null,
      mediaSource: null,
      sourceBuffer: null,
    };
  },
  mounted() {
    this.$refs.localVideo.addEventListener('loadeddata', this.handleVideoLoaded);
  },
  methods: {
    startVideoChat() {
      // 关闭之前的连接
      if (this.peerConnection) {
        this.peerConnection.close();
        this.peerConnection = null;
      }
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }

      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          console.log(1)
          this.localStream = stream;
          console.log(2)
          this.$refs.localVideo.srcObject = stream;
          console.log(3)
          this.createPeerConnection();
          console.log(4)
          this.addLocalStreamToPeerConnection();
          console.log(5)
          this.createAndSendOffer();

          // 手动触发loadeddata事件
          this.$refs.localVideo.dispatchEvent(new Event('loadeddata'));
        })
        .catch(error => {
          console.log(8)
          console.error('Error accessing media devices:', error);
        });

      this.mediaSource = new MediaSource();
      this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen);
      const remoteVideoElement = this.$refs.remoteVideo;
      remoteVideoElement.srcObject = this.remoteStream;
    },
    toggleVideo() {
      const videoElement = this.$refs.localVideo;
      if (videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => {
          track.enabled = !this.isVideoOn;
        });
      }
      this.isVideoOn = !this.isVideoOn;
    },
    // createPeerConnection() {
    //   // 创建RTCPeerConnection对象并设置相关事件处理程序
    //   this.peerConnection = new RTCPeerConnection();
    //   // ...

    //   // 建立WebSocket连接
    //   this.socket = new WebSocket('ws://192.168.2.172:/ws/'+"123456987");
    //   this.socket.onopen = () => {
    //     console.log('WebSocket connection opened');
    //   };
    //   this.socket.onmessage = (event) => {
    //     this.handleVideoData(event.data); // 处理从后端接收到的视频流数据
    //   };
    //   // this.socket.onclose = () => {
    //   //   console.log('WebSocket connection closed');
    //   // };
    // },
    addLocalStreamToPeerConnection() {
      if (this.peerConnection) {
        this.localStream.getTracks().forEach(track => {
          this.peerConnection.addTrack(track, this.localStream);
        });
      }
    },
    createAndSendOffer() {
      this.peerConnection.createOffer()
        .then(offer => {
          return this.peerConnection.setLocalDescription(offer);
        })
        .then(() => {
          // 将本地描述通过信令服务器发送给对方
          this.socket.send(JSON.stringify({
            type: 'offer',
            description: this.peerConnection.localDescription
          }));
        })
        .catch(error => {
          console.error('Error creating offer:', error);
        });
    },
    handleVideoData(data) {
      if (this.sourceBuffer && this.mediaSource.readyState === 'open') {
        const buffer = new Uint8Array(data);
        if (!this.sourceBuffer.updating && !this.isUpdatingBuffer) {
          this.isUpdatingBuffer = true;
          this.sourceBuffer.appendBuffer(buffer);
        } else {
          this.sourceBuffer.addEventListener('updateend', () => {
            if (!this.isUpdatingBuffer) {
              this.isUpdatingBuffer = true;
              this.sourceBuffer.appendBuffer(buffer);
            }
          });
        }
      }

      // 检查是否成功获取到视频轨道
      if (this.localStream && this.localStream.getVideoTracks().length > 0) {
        // 从接收到的视频数据创建一个新的 MediaStream 对象
        const receivedStream = new MediaStream();
        const videoTrack = this.localStream.getVideoTracks()[0].clone();
        receivedStream.addTrack(videoTrack);

        videoTrack.onended = () => {
          this.remoteStream = null; // 当流结束时清理远程流
        };
        videoTrack.onmute = () => {
          this.remoteStream = null; // 当流被静音时清理远程流
        };
        videoTrack.onunmute = () => {
          this.remoteStream = receivedStream; // 将接收到的流赋值给 remoteStream
        };

        const videoElement = this.$refs.remoteVideo;
        videoElement.srcObject = receivedStream;
      }
    },

    handleSourceOpen() {
      if (this.mediaSource.readyState === 'open') {
        this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
        this.sourceBuffer.addEventListener('updateend', this.handleBufferUpdateEnd);
      }
    },

    handleBufferUpdateEnd() {
      if (this.isUpdatingBuffer) {
        this.isUpdatingBuffer = false;
        return;
      }
      if (!this.sourceBuffer.updating && this.mediaSource.readyState === 'open') {
        this.mediaSource.endOfStream();
      }
    },
  },
  created() {
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen);
    this.createPeerConnection();
  },
};
</script>
