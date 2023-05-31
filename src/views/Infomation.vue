<template>
    <div class="container">
        <div class="profile">
            <div class="avatar">
                <img :src="avatar" @click="showPreview" />
            </div>
            <div class="info">
                <span>{{ name }}</span>
                <span>{{ age }}</span>
                <span>{{ gender }}</span>
            </div>
            <div class="preview" v-if="previewVisible">
                <div class="mask" @click="hidePreview"></div>
                <img :src="avatar" class="preview-img" />
            </div>
            <div class="setting">
                <ul>
                    <li>
                        <span>邮箱：</span>
                        <span v-show="!editing">{{ email }}</span>
                        <input type="text" v-show="editing" v-model="email">
                        <button v-show="editing" @click="editing = false">保存</button>
                    </li>
                    <li>
                        <span>密码：</span>
                        <span v-show="!editing">{{ passwordMask }}</span>
                        <input type="password" v-show="editing">
                        <button v-show="editing" @click="editing = false">保存</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            avatar: 'https://p.qqan.com/up/2020-2/2020022708453463508.jpg',
            name: 'John Doe',
            age: 25,
            gender: 'Male',
            previewVisible: false,
            email: "john@example.com",
            password: "123456",
            editing: false,
        }
    },
    methods: {
        showPreview() {
            this.previewVisible = true
        },
        hidePreview() {
            this.previewVisible = false
        }
    },
    computed: {
        passwordMask() {
            return '*'.repeat(this.password.length);
            console.log(this.password.length)
        }
    }
}
</script>


<style scoped>
.container {
    position: fixed;
    width: 60%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(240, 240, 240);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
}

.profile {
    display: flex;
    align-items: center;
    padding: 20px;
}

.avatar {
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 30px;
}

.avatar img {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.info {
    display: flex;
    flex-direction: column;
}

.preview {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 999;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
}

.preview-img {
    max-width: 80%;
    max-height: 80%;
}
.setting{
    border-radius: 10px;
    background-color: rgb(250, 250, 250);
}
</style>