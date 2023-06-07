<template>
    <div class="container">
        <el-form :model="form" :rules="rules" ref="form" class="register-form">
            <el-form-item label="用户名" prop="username" class="form-group">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="form-group">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" class="form-group">
                <el-input v-model="form.sex"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone_number" class="form-group">
                <el-input v-model="form.phone_number"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" class="form-group">
                <el-input v-model="form.e_mail"></el-input>
            </el-form-item>
            <el-form-item label="签名" prop="phone_number" class="form-group">
                <el-input v-model="form.signature"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday" class="form-group">
                <el-input v-model="form.birthday"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    data() {
        return {
            form: {
                username: '李利来',
                password: '123321',
                sex: "1",
                phone_number: '15648598754',
                e_mail: '15648598754@qq.com',
                signature: '无',
                birthday: '1998-09-20'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                e_mail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        register() {
            this.$refs.form.validate(async valid => {
                if (!valid) return;
                alert
                const { data: res } = await this.$http.post('http://192.168.2.220:8070/register',
                    {
                        username: this.form.username,
                        password: this.form.password,
                        sex: Number(this.form.sex),
                        phone_number: this.form.phone_number,
                        e_mail: this.form.e_mail,
                        signature: this.form.signature,
                        birthday: this.form.birthday,
                    }
                );
                console.log(res);
                if (res.code !== 1000) return this.$message.error('注册失败');
                this.$message.success('注册成功');
                this.$router.push('/login1');
            });
        }
    },
    created() {
        window.sessionStorage.setItem("contactor_id", "")
    }
}
</script>

<style scoped>
/* 调整容器样式 */
.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
}

/* 调整表单样式 */
.register-form {
    width: 400px;
    padding: 30px 40px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-form-item__label {
    width: 80px;
    text-align: right;
    font-size: 14px;
}

.form-group {
    margin-bottom: 20px;
}

.el-button {
    width: 100%;
}
</style>