<template>

    <el-main style="display: flex;">

        <el-header style="margin-top: 30px">
            登录
        </el-header>
        <el-form ref="form" :model="form" label-width="180px" class="formLogin">
            <el-form-item class="formItem" label="帐号"></el-form-item>
            <el-input class="formInput" v-model="form.username" style=""></el-input>

            <el-form-item class="formItem" label="密码"></el-form-item>
            <el-input class="formInput" v-model="form.loginPassword" type="password"></el-input>

        </el-form>
        <el-button type="primary" @click="login" class="but1" style="margin-top: 60px">登录</el-button>
        <span class="fon1" @click="$router.push('/cut')">忘记密码？</span>
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
        computed: {

            ...mapState([''])
        },
        methods: {
            async login() {

                let form = JSON.parse(JSON.stringify(this.form));
                const timestamp = new Date().getTime();
                form.timestamp = timestamp;
                form.loginPassword = md5(`${form.username}${md5(md5(`${form.username}${form.loginPassword}`))}${timestamp}`);
                // 如果不需要处理错误的信息 可以不用try和catch
                try {
                    const res = await UseraccountServiceApi.user_account.login(form)
                    // console.log(res);
                    //从这里获得token后用commit的方法发送给vuex
                    this.$store.commit('SET_TOKEN', res.accessToken);
                    this.$router.push('/index');
                } catch (err) {

                    console.log(err)
                }

            },
        }
    }
</script>

<style scoped lang="scss">
    .el-main {

        .formLogin {
            margin: 0;

            .formItem {
                margin: 15px 0;
                padding: 0 2px;

            }

            /deep/ input {
                font-size: 18px;
                height: 40px;
                border-radius: 0;
            }
        }
    }
</style>