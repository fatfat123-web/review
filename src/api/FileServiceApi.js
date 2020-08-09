/**
 * 文件服务
 */
import request from '@/utils/request'
export default class FileServiceApi {
    //只有一个独立接口的时候可以这样写 static 尾部
    //文件上传
    static upload_file(data) {
        return request('post', '/fileupload-service/attachment/v1/upload_file',data)
    }
}
