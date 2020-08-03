<template>
    <div>
    <el-dropdown trigger="click">
                    <span class="el-dropdown-link" style="margin-left: 10px;color: white">
                        admin
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools">切换环境</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-tools" @click.native="dialogVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete-solid">退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="520px"
            style="z-index:2555"
            :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dropdown",
        data(){
            return{
                dialogVisible: false,
            }

        },
        methods:{

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
        }
    }
</script>

<style scoped>

</style>