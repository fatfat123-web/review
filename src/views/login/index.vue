<template>
    <el-container>
        <el-main style="padding: 0" class="main">

            <div style="display: flex;">
                <div class="bg">
                </div>
                <div class="content">
                    <router-view style="padding:40px 0"/>
                </div>
            </div>
        </el-main>
        <el-footer style="padding: 0;display: flex;height: 150px ">
            <div style="height: 60px;text-align: center;letter-spacing:20px;">桂呈科技智联食安</div>
            <div style="background: #2e3440;width: 100%">
            <div class="hyperlink">
                <a style="" v-for="(aa, index) in hyperlink" :href="aa.URL" :key="index" :class="index===4?'aaa':''">
                    {{aa.title}}</a>
            </div>
            <div style="height: 40px;text-align: center;display: block;font-size: 0.1rem">
                版权所有 © 2019 广西桂呈永军科技有限公司 All Rights Reserved 桂ICP备450103020017</div>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: 'admin',
                    loginPassword: 123456,
                    captchaCode: ''
                },
                hyperlink: [
                    {
                        URL:'https://www.baidu.com',
                        title: '关于我们',
                    },
                    {
                        URL:'https://www.qq.com',
                        title: '新闻动态',
                    },
                    {
                        URL:'https://www.163.com',
                        title: '产品展示'
                    },
                    {
                        URL:'https://www.bilibili.com/',
                        title: '食安查询'
                    },
                    {
                        URL:'https://map.baidu.com',
                        title: '联系我们'
                    },
                ],
            }
        },
        comments: {},
        methods: {}
    }
</script>

<style scoped lang="scss">
    .test{
        font-size: 90px;
    }
    .el-container {
        font-size:20px;
        width: 100vw;
        height: 100vh;

        .el-main {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: white;

            div > .bg {
                width: 481px;
                height: 560px;
                background: url(../../assets/images/bg.png) no-repeat;
                background-size: 100%;
            }
        }

        .el-footer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            .hyperlink {
             margin-top: 20px;
                width: 100%;
                background: #2e3440;
                height: 30px;
                padding: 10px 0;
                text-align: center;
                display: flex;
                justify-content: center;

                > a {
                    color: white;
                    margin-right: 20px;
                    font-size: 0.15rem;
                    line-height: 30px;
                    }
                >a:hover{
                    color: red;
                }
                > a:after{
                    content: '';
                    margin-left: 20px;
                    border-right: 1px solid slategray;
                    display: inline-block;
                    background: slategray;
                    height: 10px;
                }
                }
        }
    }

    .aaa:after {
        border-right: none !important;
    }
    .content {
        width: 519px;
        height: 560px;
        border-radius: 0 12px 12px 0;
        background: white;
        -webkit-box-shadow: 0 2px 59px 0 rgba(145, 145, 145, 0.24);
        box-shadow: 0 2px 59px 0 rgba(145, 145, 145, 0.24);
    }

    /deep/ .el-input {
        input {
            border: none;
            border-bottom: 1px silver solid;
            border-radius: 0;
            width: 360px;
            padding-left: 3px;
        }
    }
    /deep/ .but1 {
        letter-spacing: 10px;
        width: 360px;
        height: 48px;
        font-size: 18px;
        margin-top: 15px;
        background: #0177d2;
    }
    /deep/ .but1:hover{
        background: cornflowerblue;
    }
    /deep/  .fon1 {
        margin: 20px 0 0 50%;
        font-size: 16px;
    }
    /deep/.el-header {
        font-size: 34px;
        color: cornflowerblue;
        font-weight:600
    }
    /deep/ label {
        color: rgba(118, 122, 147, 1);
        font-size: 16px;
        float: none;

    }
</style>