<template>
    <!--这里是侧边栏-->

    <el-menu :default-active="defaultActive" router :collapse-transition="false">
        <el-submenu :index="item.path"
                    v-for="item in list"
                    :key="item.path"
                    v-if="item.meta.title!=='图片管理'"
        >

            <template slot="title">
                <i class="el-icon-setting"></i>
                <span>{{item.meta.title}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item.children"  :key="item2.path" style=" padding-left: 60px;">
                {{item2.name}}
            </el-menu-item>

        </el-submenu>
                <!--路由为systematic才会一直出现-->
        <el-menu-item class="picture" :index="picture.path" v-if="this.$route.matched[0].path==='/systematic'">
            <i class="el-icon-setting"></i>
            <span slot="title">{{picture.meta.title}}</span>
        </el-menu-item>

    </el-menu>


</template>

<script>
    import {roleRouter} from "@/router";

    export default {
        name: "sidebar",
        data() {
            return {
                list: [],
                defaultActive: '',
            }

        },
        methods: {},
        watch: {
            $route: {
                immediate: true,
                handler(val) {
                    console.log(this.$route.matched[0].path)
                    const routeName = val.name;
                    roleRouter.forEach(item => {
                        item.children && item.children.forEach(item2 => {
                            if (!item2.children) {
                                this.picture = item2
                                // console.log(this.picture)
                            }
                            // console.log(item2)
                            item2.children && item2.children.forEach(item3 => {
                                if (item3.name === routeName) {
                                    this.list = item.children;
                                    this.defaultActive = item3.path
                                }
                            })
                        })
                    })

                }
            },

        },
        created() {

        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-menu-item-group__title {
        padding: 0;
        background: none;
    }

    .el-menu {
        height: 100%;
        background: rgb(67, 86, 101);
        width: 200px;

        .picture {
            background: rgb(67, 86, 101);
            /*background: #2e3440;*/
        }

        span {
            color: white;
            margin-left: 12px;
            font-size: 16px;
        }

        .is-active:before {
            display: block;
            position: absolute;
            content: " ";
            width: 6px;
            height: 49px;
            float: left;
            background: #0177d2;
            margin-left: -60px;
            z-index: 99;
        }


        > li {
            background: #333c4c;


            /deep/ .el-submenu__title {
                background: rgb(67, 86, 101);
                color: white;
                min-width: 0;

            }

            > ul {
                min-width: 0;

                > li {
                    color: silver;

                }


                > li:hover {
                    background: #272e3b;
                }
            }
        }
    }


</style>
