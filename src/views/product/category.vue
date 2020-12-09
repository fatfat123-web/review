<template>
    <el-main>

        <el-table
                :data="tableData"
                :span-method="objectSpanMethod"
                border
                show-summary
                :row-key="aa"
                style="width: 100%; margin-top: 20px">
            <el-table-column
                    prop="title"
                    label="序号"
                    width="180">
                <!--                <template v-for="item in test">-->
                <!--                    {{item}}-->

                <!--                </template>-->
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                <!--                <div>{{aaa}}</div>-->
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="amount1"
                    label="数值 1（元）">
            </el-table-column>
            <el-table-column
                    prop="amount2"
                    label="数值 2（元）">
            </el-table-column>
            <el-table-column
                    prop="amount3"
                    label="数值 3（元）">
            </el-table-column>
        </el-table>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                test: [1, 2, 3, 4],
                tableData: [{
                    title: 'a',
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }, {
                    title: 'a',
                    id: '12987123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                }, {
                    title: 'b',
                    id: '12987124',
                    name: '王小虎',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9
                }, {
                    title: 'b',
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                }, {
                    title: 'c',
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15
                }]
            };
        },
        computed: {},
        mounted() {
            this.aaa()
        },
        methods: {
            aaa() {
                let list = []

                let i = 1
                //如果title相同则从key的第一个数组想加

                this.tableData.forEach((item, key) => {
                    // list += item.title
                    // const i=key
                    const current = list.find(e => e.title === key)
                    console.log(current)
                    this.tableData[key].title = i
                    // console.log(this.tableData)
                    i++

                })

            },
            aa(row) {
                // console.log(row)
            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                // console.log(rowIndex)
                // console.log(columnIndex)
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>