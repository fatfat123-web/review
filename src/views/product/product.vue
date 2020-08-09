<!--这里是平台商品标准-->
<template>
    <el-main style="height: 1200px;">
        <el-tree
                style="overflow-y: auto"
                :data="treeList"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :default-expand-all="true"
                node-key="id">
        </el-tree>
<!--        overflow: hidden-->
        <el-main style="display: flex;flex-direction: column;overflow: hidden">
            <el-header style="height: 90px;width: 600px;">
                <el-dropdown  trigger="click" style="margin-right: 20px;height: 35px;">
                    <el-button size="small" class="el-dropdown-link" >
                        导入\导出
                    </el-button>
                    <el-dropdown-menu slot="dropdown" style="width: 90px;left: 422px;text-align: center">
                        <el-dropdown-item >导入</el-dropdown-item>
                        <el-dropdown-item>导出</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
                <el-button size="small" type="primary">下载导入模版</el-button>
                <el-button size="small" type="primary">添加单个商品</el-button>
                <el-dropdown  trigger="click" style="margin-right: 20px;height: 35px;margin-top: 10px">
                    <el-button size="small" class="el-dropdown-link" >
                        选择包装属性<i class="el-icon-arrow-down el-icon--right" style="margin-left: 95px"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" style="width: 90px;left: 422px;text-align: center">
                        <el-dropdown-item >选择包装属性</el-dropdown-item>
                        <el-dropdown-item>散装</el-dropdown-item>
                        <el-dropdown-item>包装</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
                <el-input size="small" style="width: 220px" placeholder="商品编号/商品名称/商品规格"></el-input>
                <el-button size="small" type="primary" style="margin-left: 15px" >查询</el-button>
            </el-header>
            <el-table
                    header-align="center"
                    :data="tableList"
                    style="width: 100%;"
                    max-height="1030">
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
                    <template slot-scope="scope"> {{scope.row.packagingAttribute === 1 ? '散装' : '预包装'}}</template>
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
                        <el-button size="small" type="primary">编辑</el-button>
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
                    parameter: '',

                },
                treeList: [],
                tableList: [],
                defaultProps: {
                    label: 'name',
                    children: 'children'
                }
            }
        },
        created() {
            this.tree()
            this.list();
        },
        mounted() {

        },
        methods: {
            //点击节点展开
            handleNodeClick(data) {
                // 树的形式是传id 后端不一定写在接口  在这里调用this.list方法
                this.list({productCategoryId: data.id})

            },
            page(page) {
                this.pageParam.pageNum = page;
                this.list();
            },
            changePageSize(val) {
                this.pageParam.pageSize = val;
                this.list();
            },
            async tree() {
                this.treeList = await ProductServiceApi.standard_product_categor.tree()


            },
            async list(config) {
                const res = await ProductServiceApi.standard_product.list_page({...this.pageParam, ...config})
                this.tableList = res.list
                this.pageParam.total = res.total
                console.log(config)
                console.log(this.pageParam)
            },

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
    }

    /deep/ .el-table__fixed-right {

        text-align: center;
        height: 98%;

    }

    /deep/ .el-pagination {
        padding: 15px 5px;
        text-align: right;
        overflow: hidden;
    }
 /*.el-dropdown-menu .el-popper{*/

 /*       width: 100px !important;*/
 /*       left: 426px !important;*/

 /*   }*/
</style>