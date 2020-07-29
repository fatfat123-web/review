/**
 * 用户账号服务接口
 */
import request from '@/utils/request'

export default class UseraccountServiceApi {
    // 用户账号服务
    static user_account = {
        // 登入
        login(data) {
            return request('post', '/useraccount-service/user_account/public/v1/login', data)
        },
        //重置密码
        reset_password(data) {
            return request('post', '/useraccount-service/user_account/common/v1/reset_password',data)
        },
        //发送验证码
        send_captcha(data) {
            return request('post', '/useraccount-service/user_account/common/v1/send_captcha',data)
        },

    }

};

