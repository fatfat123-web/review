<template>
  <!--这里是侧边栏-->
  <el-menu :default-active="$route.path" router :collapse-transition="false">
    <template v-for="(listItem, index) in list">
      <template v-if="listItem.children" >
        <el-submenu :index="listItem.path" :key="$route.path + index">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{ listItem.meta.title }}</span>
          </template>
          <el-menu-item :index="item.path" v-for="item in listItem.children" :key="item.path"  >
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
      <el-menu-item :index="listItem.path" v-if="!listItem.children" >
        <i class="el-icon-setting"></i>
        <span slot="title">{{ listItem.meta.title }}</span>
      </el-menu-item>
    </template>

  </el-menu>


</template>

<script>
  import { roleRouter } from '@/router';

  export default {
    name: 'sidebar',
    data() {
      return {
        list: [],
        defaultActive: '',
      };

    },
    methods: {},
    watch: {
      $route: {
        immediate: true,
        handler() {

          roleRouter.forEach(item => {
            //匹配路由：如果循环出来的第一层路由item===当前选定的路由
            if (item.path === this.$route.matched[0].path) {
              //list的数组就等于 第一层路由里的children
              this.list = item.children;
            }
          });
      
        }
      },

    },
    created() {

    }
  };
</script>

<style scoped lang="scss">
  /deep/ .el-menu-item-group__title {
    padding: 0;
    background: none;
  }

  /deep/ .el-menu{

    background: #333c4c;
  }
  /*背景色*/
  .el-menu {
    height: 100%;
    background: #435665;
    width: 200px;
    border:none;

    span {
      color: white;
      margin-left: 12px;
      font-size: 16px;
    }
      /*标题的颜色*/
      /deep/ .el-submenu__title {
        background: #435665;
        color: white;
        min-width: 0;

    }
  }

  /deep/ .el-menu-item.is-active {
    border-left: 5px solid #0177d2;
     background: #2e3440;
    span {
      color: #0177d2;
      display: inline-block;
      line-height: 50px;
    }
  }
  /deep/  .el-menu-item:focus, .el-menu-item:hover{
    background: #2e3440;
  }

</style>
