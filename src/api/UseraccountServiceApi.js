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

        //      检测帐号是否存在
        account_exists(data){
            return request('post', `/useraccount-service/user_account/v1/account_exists?username=${data}`)
        }
    }
//      发送验证码服务
    static sms_captcha={
        //发送短信验证码
        send_captcha(mobile,randstr,ticket){
            return request('post','/useraccount-service/sms_captcha/public/v1/send_captcha',{mobile,randstr,ticket})
        }

    }
};

