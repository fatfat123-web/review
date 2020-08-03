<template>
    <el-container style="height: 100%;overflow-y: auto;">
        <el-header style="height: 50px;display: flex;background: #2e3440;line-height: 50px">

            <div class="font1" >桂呈智联食安总后台</div>
            <el-menu ref="menu" mode="horizontal" style="z-index: 111">
                <el-menu-item @click="aColro=null" :class="{'nameClick':aColro===null}">
                    首页
                </el-menu-item>
                <el-menu-item v-for="(name, index) in header" :class="{'nameClick':aColro===index}" :key="index"
                              @click="head(index)">{{name}}
                </el-menu-item>
            </el-menu>

            <dropdown></dropdown>

        </el-header>

<el-main style="padding: 0;display: flex">
    <sidebar style="height: 100%" v-if="aColro!==null"></sidebar>
    <home ></home>

</el-main>
    </el-container>
</template>

<script>
    import dropdown from '../views/components/dropdown'
    import home from './components/home'
    import sidebar from './components/sidebar'

    export default {
        name: "index",
        data() {
            return {
                aColro: null,

                header: ['商品管理', '企业管理', '系统设置',]
            }
        },
        methods: {


            head(index) {
                this.aColro = index;

            },


        },
        components: {
            dropdown,
            home,
            sidebar,
        },
        mounted() {

        },
        watch: {

        }
    }
</script>

<style scoped lang="scss">
    .font1 {
        margin: 0 20px;
        width: 150px;
        text-align: center;
        display: inline-block;
        overflow: hidden;
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

    .nameClick {
        color: white !important;
        background: #0177d2 !important;
    }

</style>