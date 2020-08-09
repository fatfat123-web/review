<!--选中图片让图片放大的组件，目前这个组件的接口被删除了-->
<template>
<!--    Tooltip文字提示 就是鼠标移到图片上会产生的效果-->
    <div>
<!--        满足有picUrl并且不报错的情况下 才会出现图片-->
    <el-tooltip
            v-if="picUrl&&!error"
            effect=""
            placement="bottom-start"
            :visible-arrow="false"
            popper-class="tooltip-pic"
    >
        <div class="tooltip-pic" slot="content">
            <img :src="`${uploadUrl}${picUrl}?access_token=${this.$store.state.token}`" min-width="268" height="268" alt="上传图片">
        </div>

        <img
                :src="`${uploadUrl}${picUrl}?access_token=${this.$store.state.token}`"
                width="48" height="48"
                alt="上传图片"
        />

    </el-tooltip>
    <!-- 如果没有图片 -->
    <div class="no-pic" v-else>
        <i class="iconfont iconwutupian">
        </i>
    </div>
    </div>
</template>

<script>
    export default {
        name: "ImgTooltip",
        data(){
            return {
                uploadUrl:`http://api-qa.gczlsa.com/api-gateway/fileupload-service`,
                // token:localStorage.getItem('token'),
                error:false
            }
        },
        props:{
            //接收父组件传过来的字符串
            picUrl:String
        },
        mounted(){
            let img =new Image();
            img.src=`${this.uploadUrl}${this.picUrl}?access_token=${this.$store.state.token}`;
            img.onerror=()=>{
                this.error=true;
            }
        }
    }
</script>

<style scoped>

</style>