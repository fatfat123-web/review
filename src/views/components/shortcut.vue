<template>
    <el-header style="height: 80px">
        <div class="hide">
            <div class="advance" @click="advance(1)"></div>
            <div class="shell">
                <div class="btn">
                    <div
                            v-for="(sj,index) in defaultActive "
                            class="label"
                            :key="index"
                            :class="sj.path===color &&'active'">
                        <p @click="labeljump(sj)">{{sj.name}}</p>
                        <i style="margin: 5px 4px" class="el-icon-close" @click="omit(sj,index)"></i>
                    </div>
                </div>
            </div>
            <div class="advance" @click="advance(2)"></div>
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb" router>
            <!--用for循环 循环出路由matched里面的name-->
            <!--           这个是面包屑-->
                        <el-breadcrumb-item v-for="item in $route.matched" :key="item.name">{{item.meta.title}}</el-breadcrumb-item>

        </el-breadcrumb>
    </el-header>
</template>

<script>
    import {roleRouter} from "@/router";

    export default {
        name: "shortcut",
        data() {
            return {

                defaultActive: [],
                color: '',

            }

        },
        methods: {
            labeljump(sj) {
                if (this.$route.path !== sj.path) {
                    this.$router.push(sj.path);
                }

            },
            omit(sj, index) {
                console.log(index);
                console.log(sj);
                this.defaultActive.splice(index, 1);

            },
            scroll(e) {


            },
            advance(val) {
                console.log(val)

            }

        },
        watch: {

            $route: {
                immediate: true,
                handler() {
                    //先做外层判断
                    if (!this.$route.meta.hidden) {
                        //判断相同的名字 ，先要用find在路由中查到出来
                        if (!this.defaultActive.find(item => item.name === this.$route.name)) {
                            this.defaultActive.unshift(this.$route);
                        }
                    }
                    this.color = this.$route.path;

                }
            }

        },
        created() {
        },
    }
</script>

<style scoped lang="scss">
    .el-header {
        padding: 0;
        overflow: hidden;
        width: 100%;

    }

    /*这个是面包屑第三层要变的颜色*/
    /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
        color: #0177D2;
    }

    /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
        color: #0177D2;
    }

    .hide {
        display: flex;
        display: -webkit-box;
        position: relative;
        overflow: hidden;

        .advance {
            background: #0177D2;
            display: inline-block;
            height: 30px;
           padding: 5px 15px;

        }


        .shell {
            position: relative;
            -webkit-box-flex: 1;
            overflow: hidden;
            flex: 1;
            height: 45px;

            .btn {
                /*position: absolute;*/
                display: flex;
                margin: 10px 10px;
                overflow: auto;
                width: 999%;
                height: 26px;
                padding-left: 25px;
            }
        }
    }

    .label {
        display: flex;
        font-size: 15px;
        background: #ffc5c5;
        margin-right: 20px;
        line-height: 25px;
        cursor: pointer;
    }


    .label:before {
        content: " ";
        width: 12px;
        height: 12px;
        float: left;
        margin: 7px 5px;
        background: silver;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }

    .active:before {
        content: " ";
        width: 12px;
        height: 12px;
        float: left;
        margin: 7px 5px;
        background: red;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;

    }


    .details {
        width: 100%;
        height: 1000px;
        background: white;
        padding: 15px;

    }

    .distance {
        width: 150px;
        margin-right: 10px;
    }

    .breadcrumb {
        position: relative;
        line-height: 30px;
        margin: 0 0 0 15px;

    }
</style>