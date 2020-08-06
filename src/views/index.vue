<template>
    <el-container style="height: 100%;overflow: auto;">
        <el-header style="height: 50px;display: flex;background: #2e3440;line-height: 50px;">

            <div class="font1">桂呈智联食安总后台</div>
            <el-menu ref="menu" mode="horizontal" style="z-index: 111" router>

                <el-menu-item
                        v-for="(name, index) in list" :class="{'nameClick':name.path===defaultActive}" :key="index"
                        :index="name.path">{{name.name}}
                </el-menu-item>
            </el-menu>

<!--            <dropdown></dropdown>-->

        </el-header>
<!--        增加了 magin:0 auto-->
        <el-container style="overflow: auto;">

            <sidebar v-if="$route.path !== '/index'" ></sidebar>
            <el-main style="height: 100%;padding: 0">
            <shortcut v-if="$route.path !== '/index'"></shortcut>
                <home v-if="$route.path === '/index'"></home>

            <router-view style="padding: 10px 0 0 0;margin:0 0 0 15px"> </router-view>
            </el-main>
            </el-container>
    </el-container>
</template>

<script>

    import shortcut from '../views/components/shortcut';
    import dropdown from '../views/components/dropdown';
    import home from './components/home';
    import sidebar from './components/sidebar';
    import {roleRouter} from '@/router';

    export default {
        name: 'index',
        data() {
            return {
                list: roleRouter,
                defaultActive: '',
            };
        },
        created() {
            this.defaultActive = this.$route.matched[0].path;
        },
        components: {
            dropdown,
            home,
            sidebar,
            shortcut,
        },

        watch: {
            $route() {
                this.defaultActive = this.$route.matched[0].path;
            }
        },


    };
</script>

<style scoped lang="scss">

    .font1 {
        margin: 0 20px;
        width: 150px;
        text-align: center;
        display: inline-block;
        overflow: hidden;
        color: white;
    }

    .el-container {
        .el-header {
            .el-menu {
                background: #2e3440;
                border: none;
                flex: 4;
                display: flex;
                text-align: center;

                .el-menu-item {
                    color: slategray;
                    display: inline-block;
                    padding: 0 30px;
                    margin-right: 20px;
                    line-height: 52px;
                    height: 52px;
                }

                .el-menu-item:hover {
                    color: white;
                    background: none;
                }
            }
        }

    }

    .el-menu--horizontal > .el-menu-item.is-active {
        border: none;
    }

    .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
    .el-menu--horizontal > .el-submenu .el-submenu__title:hover{
        background: none;
    }
    .nameClick {
        color: white !important;
        background: #0177d2 !important;
    }

</style>
