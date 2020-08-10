/**
 * 商品服务
 */
import request from '@/utils/request'

export default class ProductServiceApi {
      //运营端 标准商品信息
    static standard_product = {
       //根据条件分页获取商品信息
        list_page(data){
            return request('post', '/product-service/standard_product/operator/v1/list_page',data)
        },
        //导出excel标准商品
        educe(data){
          return request('get','/product-service/standard_product/operator/export',data, {responseType: 'blob'})
        },
        //表格导入
        excel_import(data) {
            return request('post', '/product-service/standard_product/operator/v1/excel_import', data)
        },
    };

    // 运营端_标准商品类别
    static standard_product_categor = {
        // 查询平台商品所有分类树
        tree() {
            return request('get', '/product-service/standard_product_category/operator/v1/tree')
        }
    }



};