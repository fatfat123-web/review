<!--这里是平台商品标准-->
<template>
<!--    -->
    <el-main style="height: 900px;" v-loading="loading" >
        <el-tree
                style="overflow-y: auto;background: gainsboro"
                :data="treeList"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                node-key="id">
        </el-tree>
        <!--        overflow: hidden-->
        <el-main class="tabulation" >
            <el-header style="height: 90px;width:550px;">
                <el-dropdown trigger="click" style="margin-right: 20px;height: 35px;">
                    <el-button size="small" class="el-dropdown-link">
                        导入\导出
                    </el-button>
                    <el-dropdown-menu slot="dropdown" style="width: 90px;left: 422px;text-align: center">
                        <el-upload
                                action="#"
                                ref="upload"
                                class="upload-demo"
                                :limit=limit
                                :auto-upload="true"
                                :before-upload="beforeUpload"
                                :file-list="fileList"
                        >
                            <el-button    type="text">导入</el-button>
                        </el-upload>
                        <el-dropdown-item @click.native="derive()">导出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button size="small" type="primary">下载导入模版</el-button>
                <el-button size="small" type="primary" style="margin-right: 10px" @click="add">添加单个商品</el-button>

                <el-select
                        class=" distance"
                        v-model="list.packagingAttribute"
                        placeholder="选择包装属性"
                        size="small"
                        clearable
                        style="height: 25px;margin: 10px 10px 0 0;width: 170px"
                >
                    <el-option label="选择包装属性 " :value="0"></el-option>
                    <el-option label="散装" :value="1"></el-option>
                    <el-option label="包装" :value="2"></el-option>
                </el-select>


                <el-input size="small" style="width: 220px" placeholder="商品编号/商品名称/商品规格"
                          v-model="list.parameter"></el-input>
                <el-button size="small" type="primary" style="margin-left: 15px"
                           @click="pageParam.pageNum = 1,getTable()">查询
                </el-button>
            </el-header>
            <el-table
                    header-align="center"
                    :data="tableList"
                    style="width: 100%;"
                    height="718">
                <el-table-column
                        align="center"
                        prop="code"
                        label="商品编号"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="picUrl"
                        label="商品图片"
                        width="120">
                    <template slot-scope="scope">
                        <!--这个是鼠标移动到图片上放大图片的插件-->
                        <img-tooltip :pic-url="scope.row.picUrl"/>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="商品名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="specification"
                        label="商品规格"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="packagingAttribute"
                        label="包装属性"
                        width="300">
                    <template slot-scope="scope"> {{scope.row.packagingAttribute === 1 ? '散装' : '包装'}}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="unit"
                        label="单位">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        width="300"
                >
                    <template slot-scope="scope">
                        <el-button size="small" type="primary">复制</el-button>
                        <el-button size="small" type="primary" @click="compile(scope)">编辑</el-button>
                        <el-button size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    layout="total,prev, pager, next,  sizes, jumper"
                    :total="pageParam.total"
                    :page-size="pageParam.pageSize"
                    @current-change="page"
                    :page-sizes=" [10, 20, 30, 50, 100]"
                    @size-change="changePageSize"
            >
            </el-pagination>
        </el-main>
    </el-main>
</template>

<script>
    import ProductServiceApi from '@/api/ProductServiceApi'
    import ImgTooltip from '@/views/components/ImgTooltip'

    export default {
        name: "product",
        data() {
            return {
                pageParam: {
                    pageNum: 1,
                    pageSize: 20,
                    pages: 0,
                    size: 0,
                    total: 0,
                    packagingAttribute: '',
                },
                loading:true,
                treeList: [],
                tableList: [],

                defaultProps: {
                    label: 'name',
                    children: 'children'
                },
                list: {
                    packagingAttribute: '',
                    parameter: '',

                },
                limit: 1,  // 上传excell时，同时允许上传的最大数
                fileList: [],   // excel文件列表
            }
        },
        created() {
            Promise.all([ this.tree(), this.getTable()])
                .then(res => {
                    if (res){
                        console.log(res)
                        this.loading=false;
                        console.log(this.loading)
                    }
                })
                .catch(console.error)
        },
        mounted() {

        },
        watch: {},
        methods: {
            //点击节点展开
            async handleNodeClick(data) {
                // 点击树里面节点，单独请求树里面id的内容
                console.log(data)
                await this.getTable({productCategoryId: data.id})
            },
            //页码
            page(page) {
                this.pageParam.pageNum = page;
                this.getTable();
            },
            //每页显示的东西
            changePageSize(val) {
                this.pageParam.pageSize = val;
                this.getTable();
            },
            //树
            async tree() {
                this.treeList = await ProductServiceApi.standard_product_categor.tree()
                   return this.treeList
            },
            //获取表格
            async getTable(config) {
                const res = await ProductServiceApi.standard_product.list_page({...this.pageParam, ...this.list,...config})
                this.tableList = res.list
                this.pageParam.total = res.total
                return res
            },
            //添加
            add() {

            },
            //编辑
            compile(scope){
                console.log(scope.row.id);
                console.log(scope.row);
                this.$router.push(     {path: '/product/supplyProduct/compile', query: {
                        id:scope.row.id
                    }},
                );
            },
            //导入
            beforeUpload(file){
                // 验证格式 xls xlsx,要小于5MB
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!extension&& !extension2) {
                    this.$message.warning('上传模板只能是 xls、xlsx格式!')
                    return
                }
                if (!isLt5M) {
                    this.$message.warning('上传模板大小不能超过 5MB!')
                    return
                }
                setTimeout(() => {
                    const formData = new FormData();
                    formData.append('file',file,'fileName');
                    ProductServiceApi.standard_product.excel_import(formData)
                        .then(res => {
                            this.$message.success('文件上传成功')
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        });

                },1500);
                return false; // 返回false不会自动上传
            },

        //    导出
            derive(){
                    ProductServiceApi.standard_product.educe(this.list)
                    //    其实我不太懂这个data为什么会存在呢
                    .then(data => {
                        console.log(data)
                        let blob = new Blob([data], {type: "application/vnd.ms-excel"});
                        let url = window.URL.createObjectURL(blob);
                        let link = document.createElement("a");
                        link.style.display = "none";
                        link.href = url;
                        link.setAttribute('download', `平台商品标准.xls`);
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        },
        components: {
            ImgTooltip
        },
    }
</script>

<style scoped lang="scss">
    .el-main {
        background: white;
        color: black;
        display: flex;
        padding: 0 20px;
        .tabulation {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
    }
    /deep/ .el-table__fixed-right {
        text-align: center;
        height: 98%;
    }
    /deep/ .el-table__fixed-right:before {
        content: none;
    }
    /deep/.upload-demo:hover{
        background-color: #ecf5ff;
    }
    /deep/.upload-demo{
        /deep/.el-button{
            color:black;
        }
        /deep/.el-button:hover{
                color: #66b1ff;
        }
    }
    /deep/ .el-pagination {
        padding: 15px 5px;
        text-align: right;
        overflow: hidden;
    }
  /deep/.el-table th{
      background: #ffc5c5;
  }
</style>