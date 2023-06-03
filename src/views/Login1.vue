<template>
    <div class="login-container">
        <div class="login-form">
            <h2>Login</h2>
            <el-form ref="form" :model="form" :rules="rules" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="Password"></el-input>
                </el-form-item>
                <div class="bt">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="primary" @click="register">注册</el-button>
                </div>

            </el-form>
        </div>

    </div>
</template>
  
<script>
export default {

    name: 'LoginPage',
    data() {
        return {
            //这是登录表单的数据绑定对象
            form: {
                username: '',
                password: ''
            },
            //这是表单的验证规则对象
            rules: {
                username: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        //保存密码
        saveCredentials(username, password) {
            const credentials = {
                username: username,
                password: password
            };
            const encryptedCredentials = btoa(JSON.stringify(credentials));
            localStorage.setItem("credentials", encryptedCredentials);
        },
        retrieveCredentials() {
            const encryptedCredentials = localStorage.getItem("credentials");
            if (encryptedCredentials) {
                const credentials = JSON.parse(atob(encryptedCredentials));
                return credentials;
            }
            return null;
        },
        login() {
            this.$refs.form.validate(async valid => {
                if (!valid) return;
                const { data: res } = await this.$http.post('http://127.0.0.1:8070/login', this.form);
                if (res.code !== 1000) return this.$message.error('登录失败');
                window.sessionStorage.setItem("token", res.data.token);
                window.sessionStorage.setItem("userid", res.data.id);
                this.saveCredentials(this.form.username, this.form.password);
                this.$message.success("登录成功")
                this.$root.$emit('loginSuccess'); // 触发自定义事件 'loginSuccess'
                this.$router.replace('/selector');


            });
        },
        async auto_login() {
            const { data: res } = await this.$http.post('http://127.0.0.1:8070/login', this.form);
            if (res.code !== 1000) return this.$message.error('自动登录失败');
            window.sessionStorage.setItem("token", res.data.token);
            window.sessionStorage.setItem("userid", res.data.id);
            this.saveCredentials(this.form.username, this.form.password);
            this.$message.success("自动登录成功")
            this.$root.$emit('loginSuccess'); // 触发自定义事件 'loginSuccess'
        },
        register() {
            this.$router.push('/register');
        },

    },
    mounted() {

    },
    created() {
        const info = this.retrieveCredentials();
        if (info) {
            this.form.username = info.username;
            this.form.password = info.password;

            this.$nextTick(async () => {
                await this.auto_login();
                this.$router.replace('/selector');
            });
        }
    }
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000000;
}

.particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.login-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

input {
    display: block;
    width: 89%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    display: block;
    width: 40%;
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.bt {
    display: flex;
    justify-content: space-between;
}
</style>
  