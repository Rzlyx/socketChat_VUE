<template>
  <div>
    <video ref="localVideo" autoplay></video>
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
      socket: null
    };
  },
  methods: {
    startVideoChat() {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          this.localStream = stream;
          this.$refs.localVideo.srcObject = stream;

          this.createPeerConnection();
          this.addLocalStreamToPeerConnection();
          this.createAndSendOffer();
        })
        .catch(error => {
          console.error('Error accessing media devices:', error);
        });
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
      this.$router.go(0)
    },
    createPeerConnection() {
      // 创建RTCPeerConnection对象并设置相关事件处理程序
      // ...

      // 建立WebSocket连接
      this.socket = new WebSocket('ws://your-server-url');
      this.socket.onopen = () => {
        console.log('WebSocket connection opened');
      };
      this.socket.onmessage = (event) => {
        // 处理服务器发送的消息
      };
      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    },
    addLocalStreamToPeerConnection() {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });
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
    }
  }
};
</script>
