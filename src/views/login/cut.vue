<template>
    <el-main >
        <el-header  >
        忘记密码
        </el-header>
            <el-form ref="form" :model="param" label-width="180px"   >

                <el-input v-model="param.mobile" placeholder="帐号"></el-input>
                <div style="display: flex" >
                <el-input  v-model="params.randstr" stype="password" placeholder="验证码"></el-input>
                <el-button @click="send" type="primary" style="position: absolute;text-align: center;margin:5px 0 0 320px">
                    发送验证码</el-button>
                </div>
                <el-input v-model="param.smsCaptcha" type="password" placeholder="请输入8位数新密码"></el-input>
                <el-input v-model="param.smsCaptcha" type="password" placeholder="确认密码"></el-input>

            </el-form>
        <el-button type="primary" class="but1" @click="">确定</el-button>
        <span class="fon1" @click="$router.push('/login')">去登录</span>
    </el-main>
</template>

<script>
    export default {
        name: "cut",
        data(){
            return{
                param: {
                    mobile: '',
                    username: '',
                    smsCaptcha: '',
                },
                params: {

                    randstr: '',

                },
            }


        },
        created() {
        },
        methods:{
            send(){

            }
        }
    }
</script>

<style scoped lang="scss">
.el-main{

    .el-form{
        margin: 0;
        text-align: center;
        /deep/  input{
            margin: 10px 0;
            height: 55px;
            font-size: 20px;
            line-height: 40px;

        }

    }

}
</style>