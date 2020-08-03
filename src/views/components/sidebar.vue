<template>
<!--这里是侧边栏-->

        <el-menu
                :default-active="defaultActive"
                :default-openeds="openeds"
                router>
            <el-submenu :index="item.path" v-for="(item, index) in list" :key="index">
                <template slot="title">
                    <span >{{item.name}}</span>
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
                defaultActive: '',
                openeds:[]
            }

        },
        methods: {

        },
        watch: {
            $route: {
                immediate: true,
                handler(val) {
                    // console.log(val)
                    // 路由要三层结构，所以matched能看到三层数组
                    const oneName = val.matched[0].name;    //取第0层的名字
                    // console.log(oneName)
                    this.list = roleRouter.find(n=>{       //从路由表过滤出第一层名字
                        return n.name === oneName
                    }).children;
                    this.defaultActive = val.path;  //默认menu激活当前路由
                    this.openeds = [val.matched[1].name]
                    // console.log(this.defaultActive)
                    // console.log(this.openeds )

                }
            },
            openeds(value){
                console.log(value)
            }
        },
        created() {

        }
    }
</script>

<style scoped lang="scss">
.el-menu{
    background:rgb(67, 86, 101);
    width: 200px;
   >li{
       background: #333c4c;
       /deep/.el-submenu__title{
           background:rgb(67, 86, 101);
           color: white;
       }
       >ul{
           >li{
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
           >li:hover{
              background: #272e3b;
           }
       }
   }
}



</style>