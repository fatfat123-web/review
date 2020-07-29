<template>

        <el-main style="display: flex">

         <el-header style="font-size: 30px;color: cornflowerblue">
            登录
        </el-header>
            <el-form ref="form" :model="form" label-width="180px"   >
                <el-form-item  label="帐号" > </el-form-item>
                <el-input v-model="form.username" style=""></el-input>

                <el-form-item label="密码" > </el-form-item>
                <el-input v-model="form.loginPassword" type="password"></el-input>

            </el-form>
            <el-button type="primary" @click="login">登录</el-button>
        </el-main>


</template>

<script>
    import {mapState} from 'vuex'
    import md5 from 'md5'
    import UseraccountServiceApi from '@/api/UseraccountServiceApi'
    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: 'admin',
                    loginPassword: 123456,
                    // captchaCode: ''
                },
            }
        },
        created() {
        },
        mounted() {
        },
        computed:{

            ...mapState([''])
        },
        methods: {
            login(){
                let form = JSON.parse(JSON.stringify(this.form));
                const timestamp = new Date().getTime();
                form.timestamp = timestamp;
                form.loginPassword = md5(`${form.username}${md5(md5(`${form.username}${form.loginPassword}`))}${timestamp}`);

                UseraccountServiceApi.user_account.login(form)
                    //这里是写好在api文档里的UseraccountServiceApi
                    .then(res => {
                        console.log(res);
                        //从这里获得token后用commit的方法发送给vuex
                        this.$store.commit('SET_TOKEN', res.accessToken);
                        this.$router.push('/index');
                    })
                    .catch(err => {
                        console.log(err)
                    })

            },
        }
    }
</script>

<style scoped lang="scss">
.el-main{
    /deep/.el-button{
        letter-spacing:10px;
        width: 330px;
        height: 45px;
        font-size: 18px;
        margin-top: 20px;
        background: #0177d2;

    }
    .el-form {
    margin: 0;

    /deep/ .el-form-item {

        margin: 15px 0;
        padding: 0 2px;
    }

    /deep/ .el-form-item__label {
        color: rgba(118, 122, 147, 1);
        font-size: 16px;
        float: none;
        line-height: 40px;

    }

    /deep/ .el-input {
        input {
            font-size: 18px;
            height: 40px;
            border: none;
            padding: 0;
            border-bottom: 1px silver solid;
            width: 360px;
            border-radius: 0;
        }
    }
}
}
</style>