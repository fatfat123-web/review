<template>
    <el-main>
        <el-header>
            忘记密码
        </el-header>
        <el-form ref="form" :model="param" label-width="180px">

            <el-input v-model="param.username" placeholder="帐号"></el-input>
            <div style="display: flex">
                <el-input v-model="params.randstr" stype="password" placeholder="验证码"></el-input>
                <el-button @click="send" type="primary" :disabled="code === '发送验证码' ? false : true" class="btn2"  id="TencentCaptcha">
                    {{code}}
                </el-button>
            </div>
            <el-input v-model="param.smsCaptcha" type="password" placeholder="请输入8位数新密码"></el-input>
            <el-input v-model="param.smsCaptcha" type="password" placeholder="确认密码"></el-input>

        </el-form>
        <el-button type="primary" class="but1" @click="">确定</el-button>
        <span class="fon1" @click="$router.push('/login')">去登录</span>
    </el-main>
</template>

<script>
    import UseraccountServiceApi from '@/api/UseraccountServiceApi'
    export default {
        name: "cut",
        data() {
            return {
                param: {
                    mobile: '',
                    username: "",
                    smsCaptcha: '',
                },
                params: {

                    randstr: '',

                },
                code: '发送验证码'
            }


        },
        created() {
        },
        mounted() {

            //这是引入外部js网站的方法 看起来有点傻吊
            let sca=document.getElementsByTagName("script");
            console.log(sca)
            const SCA=Array.from(sca);
            console.log(SCA)
            let through=SCA.some(item=>item.src==="https://ssl.captcha.qq.com/TCaptcha.js");
            console.log(SCA.some)
            console.log(through)
            if(!through){
                const SC=document.createElement("script");
                SC.src="https://ssl.captcha.qq.com/TCaptcha.js";

                try{
                    document.body.append(SC);
                }catch(e){
                    document.getElementsByTagName('head')[0].appendChild(SC);
                }
            }
        },
        methods: {
            async send() {
                if (this.param.username === "") {
                    //this.$message.error 出错的时候弹出 element里面的方法
                    this.$message.error("请填入账号");
                    //这里不用return错误的信息无法终止下一步操作
                    return;
                }
                console.log(this.param.username)
                // account_exists
                // useraccount-service/user_account/v1/account_exists
                const existsStatus =await UseraccountServiceApi.user_account.account_exists(this.param.username)
                console.log(existsStatus)
                if (existsStatus) {
                    let id = process.env.VUE_APP_ENV === "development" ? "2014661572" : "2068807196";

                    var captcha1 = new TencentCaptcha(id, async res => {
                        console.log(res)
                        if (res.ret === 0) {
                            const send=await UseraccountServiceApi.sms_captcha.send_captcha(this.param.username,res.randstr, res.ticket)
                            console.log(send)
                            this.$message.success("发送验证码成功");
                            let time = 6;
                            let timer = setInterval(() => {
                                console.log(time)
                                time--;
                                this.code = time
                                if (time === 0) {
                                    this.code = '发送验证码';
                                    clearInterval(timer)

                                }
                            }, 1000);
                        }
                    });
                    captcha1.show();
                }else {
                    this.$message.error("账号不存在");
                }


            }
        }
    }
</script>

<style scoped lang="scss">
    .el-main {

        .el-form {
            margin: 0;
            text-align: center;

            /deep/ input {
                margin: 10px 0;
                height: 55px;
                font-size: 20px;
                line-height: 40px;

            }

            .btn2 {
                position: absolute;
                text-align: center;
                margin: 5px 0 0 310px;
                width: 120px
            }
        }

    }
</style>