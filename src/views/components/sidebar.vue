<template>
<!--这里是侧边栏-->

        <el-menu
                :default-active="defaultActive"
                :default-openeds="openeds"
                style="height: 100%;background:#435665;"
                router>
            <el-submenu :index="item.path" v-for="(item, index) in list" :key="index">
                <template slot="title">
                    <span style="color: white">{{item.name}}</span>
                </template>
                <el-menu-item :index="n.path" :key="n.path" v-for="(n,i) in item.children" v-if="!n.meta">{{n.name}}</el-menu-item>
            </el-submenu>
        </el-menu>

</template>

<script>
    import {roleRouter} from "@/router";
    export default {
        name: "sidebar",
        data(){
            return{
                list: [],
                defaultActive: '0',
                openeds:[]
            }

        },
        methods: {

        },
        watch: {
            $route: {
                immediate: true,
                handler(val) {
                    console.log(roleRouter)
                    // // 路由要三层结构，所以matched能看到三层数组
                    // const oneName = val.matched[0].name;    //取第0层的名字
                    // this.list = roleRouter.find(n=>{       //从路由表过滤出来
                    //     return n.name === oneName
                    // }).children;
                    // this.defaultActive = val.path;  //默认menu激活当前路由
                    // this.openeds = [val.matched[1].path]

                }
            }
        },
    }
</script>

<style scoped>
    /deep/ .el-menu {
        background: #333c4c;
        color: white;
    }

    /deep/ .el-submenu__title:hover {
        background: none;
    }

    .el-menu-item.is-active {
        background: #1c2d3b;

    }

    .el-menu-item.is-active:before {
        display: block;
        position: absolute;
        content: " ";
        width: 6px;
        height: 49px;
        float: left;
        background: #0177d2;
        margin-left: -40px;
    }

    .el-menu-item.is-active {
        color: white;
    }

    .el-menu-item:focus, .el-menu-item {
        color: silver;
    }

    .el-submenu .el-menu-item {
        min-width: 0;
    }

    .el-menu-item:focus, .el-menu-item:hover {
        background: #272e3b;
    }
</style>