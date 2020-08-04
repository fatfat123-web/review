<template>
    <!--这里是侧边栏-->

    <el-menu :default-active="defaultActive" router :collapse-transition="false" style="height: 100%;background:#435665;">
        <el-submenu :index="item.path"
                    v-for="item in list"
                    :key="item.path"
        >
            <template slot="title">
                <span style="color: white">{{item.meta.title}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item.children" v-if="!item2.meta" :key="item2.path">
                {{item2.name}}
            </el-menu-item>
        </el-submenu>
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
                openeds: []
            }

        },
        methods: {},
        watch: {
            $route: {
                immediate: true,
                handler(val) {
                    const routeName = val.name;
                    roleRouter.forEach(item => {
                        item.children && item.children.forEach(item2 => {
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
            openeds(value) {
                console.log(value)
            }
        },
        created() {

        }
    }
</script>

<style scoped lang="scss">

    .el-menu {
        background: rgb(67, 86, 101);

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

                .is-active:before {
                    display: block;
                    position: absolute;
                    content: " ";
                    width: 6px;
                    height: 49px;
                    float: left;
                    background: #0177d2;
                    margin-left: -40px;
                }

                > li:hover {
                    background: #272e3b;
                }
            }
        }
    }


</style>
