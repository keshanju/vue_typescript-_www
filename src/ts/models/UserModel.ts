/**
 * 手机注册请求参数
 */
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

export class PhoneRegisterRequestModel {
    public register_type: string = "1"; // 注册类型，1：国内注册，2：海外注册，默认：1
    public checkcode: string = "";
    public checkcode_key: string = "";

    public phone?: string = "";
    public country_code?: string = "86";
    public smscode?: string = "";
    public smscode_key?: string = "";
    public password?: string = "";

    public package_id: number = 0; //套餐id
    public price_id: number = 0; // 价格id

    public refer_code: string = ""; // 推荐码(可为空)

    public nickname?: string = "";
    public username?: string = "";

    public os_type: number = 4; //注册来源
}

/**
 * 手机找回密码请求参数
 */
export class PhoneFindPwdRequestModel {
    public account_type: string = "1"; // 注册类型，1：手机账号，2：邮箱账号，默认：1
    public checkcode: string = "";
    public checkcode_key: string = "";

    public phone?: string = "";
    public country_code?: string = "86";
    public smscode?: string = "";
    public smscode_key?: string = "";
    public password?: string = "";
}

/**
 * 邮箱注册请求参数
 */
export class EmailRegisterRequestModel {
    public register_type: string = "1"; // 注册类型，1：国内注册，2：海外注册，默认：1
    public checkcode: string = "";
    public checkcode_key: string = "";

    public username?: string = "";
    public email?: string = "";
    public mailcode?: string = "";
    public mailcode_key?: string = "";
    public password?: string = "";
    public nickname?: string = "";

    public package_id: number = 0; //套餐id
    public price_id: number = 0; // 价格id

    public refer_code: string = ""; // 推荐码(可为空)

    public os_type: number = 4; //注册来源
}

/**
 * 邮箱找回密码请求参数
 */
export class EmailFindPwdRequestModel {
    public account_type: string = "2"; // 注册类型，1：手机账号，2：邮箱账号，默认：1
    public checkcode: string = "";
    public checkcode_key: string = "";

    public email?: string = "";
    public mailcode?: string = "";
    public mailcode_key?: string = "";
    public password?: string = "";
}

/**
 * 第三方登录绑定手机号/邮箱请求参数
 */
export class BindRequestModel {
    public register_type: string = "3"; // 3 已注册，未绑定过  4 未注册，未绑定
    public account_type?: string; // 注册类型，1：手机账号，2：邮箱账号，默认：1
    public checkcode: string = "";
    public checkcode_key: string = "";
    public account_token: string = ""; //用户token
    public verify_code: string = "";
    public verify_key: string = "";
    public refer_code: string = "";//推荐码

    public country_code: string = "";
    public phone: string = "";
    public smscode: string = "";
    public smscode_key: string = "";
    public password?: string;

    public email: string = "";
    public mailcode: string = "";
    public mailcode_key?: string = "";

    public package_id?: number; //套餐id
    public price_id?: number; // 价格id
    public state?: string; // 区分内嵌官网  内嵌传pc，官网不传
    public os_type: string = "";

    public code: string = ""; //第三方登录返回码：根据服务器url传值获取（rc4加密后的值）
}

/**
 * 登陆请求参数
 */
export class LoginRequestModel {
    public country_code?: string; //手机区号  默认'86'
    public username?: string = "";
    public password?: string = "";
    public user_type: string = "0"; //0 普通用户  1网吧用户  2 主播用户
    public src_channel: string = ""; //来源
    public code?: string = ""; // 微信公众号绑定 传就是绑定  不传就是不绑定
}

/**
 * 登录成功返回参数
 */
export class LoginModel {
    public login_info: UserToken = new UserToken();

    public user_info: UserInfo = new UserInfo();
}

/**
 * 用户信息
 */
export class UserInfo {
    public user_name: string = "";
    public nickname: string = "";
    public email: string = "";
    public sex: string = "保密";
    public birthday: string = "";
    public mobile: string = "";
    public avatar: string = "";
    public avatar_new?: string;
    public region_code: number = 0;
    public address: string = "";
    public is_switch_package = 0;
    public package_id = 0;
    public group_title: string = "";
    public expiry_time: string = "";
    public expiry_time_samp: number = 0; //剩余时间的总秒数
    public package_title: string = "";
    public package_level: number = 0;
    public pause_status_id: number = 1; //暂停状态 0未暂停 1暂停中
    public is_set_admin_pass: number = 0; //是否设置了二级密码  0未设置  1已设置
    public mobile_contact_number: string = ""; //qq 或者第三方账号
    public billing_type: number = 0; //计时0,包月1
    public master_account: number = 0; //主账号 0手机号 1邮箱
    public vip_level: string = 'VIP0';//用户会员等级
    public is_pay_user: number = 0;//是否付费用户
    public wall_log_switch: number = 0;//壁纸漫游状态: 0 关闭 1 开启
    public experience_expiry_time="";//体验过期截止时间
    public experience_time=0//体验过期剩余时间
    public first_invoice_discount: number = 0;//是否能参加首冲立减优惠

    /**
     * 设置昵称
     */
    public static getUserName(userInfo: UserInfo) {
        let name = "";
        if (userInfo.nickname != "") {
            name = userInfo.nickname + "";
        } else if (userInfo.mobile.length > 0) {
            // name = userInfo.mobile.substr(0, 3) + '****' + userInfo.mobile.substr(7);
            name = userInfo.mobile;
        } else if (userInfo.email.length > 0) {
            name = userInfo.email;
        } else if (userInfo.user_name != "") {
            name = userInfo.user_name;
        }
        userInfo.nickname = name;

        return userInfo.nickname;
    }

    /**
     * 设置用户头像
     */
    public static getUserAvatar(userInfo: UserInfo) {
        if (userInfo.avatar_new == "") {
            userInfo.avatar_new = "./images/default_avatar.png";
            userInfo.avatar = userInfo.avatar_new;
        } else {
            userInfo.avatar = userInfo.avatar_new;
        }

        return userInfo;
    }

    /**
     * 更新用户信息
     * @param userInfo
     * @param avatar 头像
     */
    public static updateUserInfo(
        userInfo: UserInfo,
        avatar: any = null,
        nickname: any = null
    ) {
        var updateInfo: UserInfo = LocalStorageUtil.getUserInfo();
        if (userInfo != null) {
            updateInfo = new UserInfo();
            updateInfo.nickname = userInfo.nickname;
            updateInfo.email = userInfo.email;
            updateInfo.mobile = userInfo.mobile;
            updateInfo.sex = userInfo.sex;
            updateInfo.birthday = userInfo.birthday;
            updateInfo.avatar = userInfo.avatar;
            updateInfo.avatar_new = userInfo.avatar_new;
            updateInfo.master_account = userInfo.master_account;
            updateInfo.expiry_time = userInfo.expiry_time;
            updateInfo.is_switch_package = userInfo.is_switch_package;
            updateInfo.package_id = userInfo.package_id;
            updateInfo.package_level = userInfo.package_level;
            updateInfo.package_title = userInfo.package_title;
            updateInfo.address = userInfo.address;
            updateInfo.mobile_contact_number = userInfo.mobile_contact_number;
            updateInfo.experience_time = userInfo.experience_time;
            updateInfo.experience_expiry_time = userInfo.experience_expiry_time;
            updateInfo.expiry_time_samp = userInfo.expiry_time_samp;


            LocalStorageUtil.addUserInfo(updateInfo);
        }
        if (avatar != null && updateInfo != null) {
            updateInfo.avatar = avatar;
            LocalStorageUtil.addUserInfo(updateInfo);
        }
        if (nickname != null && updateInfo != null) {
            updateInfo.nickname = nickname;
            LocalStorageUtil.addUserInfo(updateInfo);
        }
    }
}

/**
 * 用户的token
 */
export class UserToken {
    public account_token: string = "";
    public expiry_time: string = "";
}

/**
 * 用户套餐信息请求成功服务端返回
 */
export class UserRechargeInfo {
    public billing_type: number = 0;
    public package_level: number = 0;
    public package_desc: string = ""; // 邮箱验证码Key
    public package_id: number = 0; // 套餐ID
    public package_short_desc: string = ""; // 套餐简介
    public package_title: string = ""; // 套餐标题
    public package_is_recommend: number = 0; //
    public short_desc: number = 0; //
    public include_region_codes?: string; //套餐地区 0国际区  1国内
    public is_change_price?: number; // 是否首单特惠
    public start_time?: string; //首单特惠开始时间
    public end_time?: string; //首单特惠结束时间

    public price: Array<PriceList> = [];
}

/**
 * 价格列表
 */
export class PriceList {
    public exclude_region_codes: string = "";
    public include_region_codes: string = "";
    public price_desc: string = "";
    public price_id: number = 0;
    public price_is_recommend: number = 0;
    public price_num: string = "";
    public price_order_num: number = 0;
    public price_short_desc: string = "";
    public price_title: string = "";
    public price_type: number = 0;
}

/**
 * 支付请求参数
 */
export class PayRequestModel {
    public account_token: string = "";
    public package_id: number = 0;
    public price_id: number = 0;
    public invoice_from: number = 0;
    public invoice_id: number = 0; //订单界面支付时需传值
    public pay_type: number = 0;
    public discount_code?: string;
    public pay_plat?: number;
    public width?: number;
    public src_channel: string = ""; //来源
    public os_type: string = "1"; //来源

    /**
     * 转换from，与服务端对应
     * 1window 2mac 3android 4ios 5微信公众号
     * 转换成
     * 1window 2ios 3android 4apple 7微信公众号
     */
    public switchFrom(from: number) {
        switch (from) {
            case 4:
                return 2;
                break;
            case 2:
                return 6;
                break;
            case 5:
                return 7;
        }
        return from;
    }
}

/**
 * 修改密码请求参数
 */
export class ResetpwdRequestModel {
    public account_token: string = "";
    public old_password: string = "";
    public new_password: string = "";
    public new_password_confirmation: string = "";
}

/**
 * 修改密码请求参数(新接口用)
 */
export class NewResetpwdRequestModel {
    public account_token: string = "";
    public new_password: string = "";
    public new_password_confirmation: string = "";
    public verify_code: string = "";
    public verify_key: string = "";
}

/**
 * 刷新支付状态请求参数
 */
export class InvoiceRequestModel {
    public account_token: string = "";
    public invoice_id: number = 0;
}

/**
 * 刷新支付状态返回参数
 */
export class InvoiceModel {
    public status: number = 0; //支付状态
}

/**
 * 支付请求成功返回参数
 */
export class PayModel {
    public amount: string = "";
    public amount_type: number = 0;
    public order_no: string = "";
    public invoice_id: number = 0;
    public package_title: string = "";
    public pay_url: string = "";
    public price_title: string = "";
    public payType: number = 0;
}

/**
 * 支付方式
 */
export class PayConfigModel {
    public is_show_wx: number = 0;
    public is_show_zfb: number = 0;
    public is_show_qq: number = 0;
    public is_show_paypal: number = 1;
}

/**
 * 用户活动 - 奖品列表-请求参数
 */
export class ActiveRecordRequestModel {
    public account_token: string = "";
    public size?: number = 15;
    public page: number = 1;
}

/**
 * 用户活动 - 奖品领奖-请求参数
 */
export class ActiveRecordPrizeRequestModel {
    public account_token: string = "";
    public username: string = "";
    public prize_id: number = 0;
    public country_code?: string = "";
    public phone?: string = "";
    public email?: string = "";
    public address?: string = "";
    public is_auth_use?: number = 0;
}

/**
 * 用户活动 - 奖品领奖-返回充值卡的样式
 */
export class cardInfo {
    public card_no: string = "";
    public card_password: string = "";
    public is_auth_use?: number = 0; //是否充值成功
}

/**
 * 用户活动 - 奖品列表-返回参数
 */
export class ActiveRecordListModel {
    public current_page: number = 1;
    public last_page: number = 1;
    public per_page: number = 1;
    public total: number = 0;
    public list: Array<ActiveRecordModel> = [];
}

/**
 * 用户活动 - 奖品领奖返回模板
 */
export class ActiveRecordModel {
    public id: number = 1;
    activity_title: string = "";
    award_type: number = 0;
    create_time: string = "";
    present_title: string = "";
    public status: number = 0;
    status_title: string = "";
    message: string = "";
}

/**
 * 订单查询请求参数
 */
export class OrderRequestModel {
    public account_token: string = "";
    public size?: number = 15;
    public page: number = 1;
}

/**
 * 用户活动 - 奖品列表-返回参数
 */

/**
 * 订单查询返回参数
 */
export class OrderListModel {
    public current_page: number = 1;
    public last_page: number = 1;
    public per_page: number = 1;
    public total: number = 0;
    public list: Array<OrderModel> = [];
}

/**
 * 订单模板
 */
export class OrderModel {
    public invoice_id: number = 0;
    public invoice_no: string = "";
    public invoice_status_title: string = "";
    public invoice_status: string = "";
    public invoice_money: string = "";
    public invoice_date: string = "";
    public package_name: string = "";
    public price_name: string = "";
    public pay_date: string = "";
    public discount_code: string = "";
}

/**
 * 上传头像
 */
export class UploadAvatarRequestModel {
    public account_token = "";
    public filename = "";
    public nickname = "";
    public folder_name = "bohe";
}

/**
 * 查询账号是否存在
 */
export class FindUserIsExistModel {
    public is_exist: number;
}

/**
 * 修改二级密码获取验证码请求
 */
export class SendVerificationCodeRequestModel {
    public account_token: string = ""; //用户token
}

/**
 * 修改二级密码获取验证码返回
 */
export class SendVerificationCodeModel {
    public verify_key: string = ""; //验证码key
    public code_type: string = ""; // 发送验证码类型 0 手机验证码  1 邮箱验证码
}

/**
 * 修改二级密码请求
 */
export class SetSecondPwdRequestModel {
    public account_token: string = ""; //用户token
    public verify_key: string = ""; //验证码key
    public verify_code: string = ""; //验证码
    public new_password: string = ""; //新密码
    public new_password_confirmation: string = ""; //新密码确认密码
}

/**
 * 充值卡充值
 */
export class CardfeeModel {
    public account_token: string = ""; //用户token
    public card_no: string = ""; //充值卡卡号
    public password: string = ""; //充值卡密码
}

/**
 * CD Key充值
 */
export class CDKeyModel {
    public account_token: string = ""; //用户token
    public cd_key: string = ""; //CDKey码
}
/**
 * CD Key充值
 */
export class CDKeyResult {
    public card_type: string = ""; //0：充值卡1：不可暂停的体验卡（无有效期）2：可以暂停的体验卡
    public experience_expiry_time: string = ""; //体验卡有效时间，只有可暂停的体验卡才有这个时间
    public experience_minutes:number=0; //体验卡时间(单位为分钟)，只有可暂停的体验卡才有这个时间
}
/**
 * 批量修改用户信息请求
 */
export class UpdateInfos {
    public account_token: string = ""; //用户token
    public email?: string; //邮箱
    public nickname?: string; //昵称
    public mobile_contact_type?: number; //即时通讯类型 0:QQ
    public mobile_contact_number?: string; //即时通讯账号
    public address?: string; //地址
    public user_url?: string; //头像路径
    public sex?: number; //性别
    public birthday?: string; //出生日期
}

/**
 * 推荐码活动
 */
export class ReferActivity {
    public activity_info: ActivityInfo = new ActivityInfo();
    public user_code: UserCode = new UserCode();
}

/**
 * 活动详情
 */
export class ActivityInfo {
    public id: number = 0; //活动id
    public type: number = 0; //活动类型
    public title: string = "";
    public label: string = "";
}

/**
 * 用户推荐码
 */
export class UserCode {
    public id: number = 0;
    public user_id: number = 0;
    public refer_code: string = "";
    public activity_id: number = 0;
    public create_time: string = "";
    public state: number = 0;
    public type: number = 0;
    public activity_type: number = 0;
    public start_time: string = "";
    public end_time: string = "";
}

/**
 * 用户推荐码请求
 */
export class ReferCodeRequestModel {
    public activity_id: number = 0;
    public type: number = 0;
    public account_token: string = "";
}

/**
 * 用户推荐码返回
 */
export class ReferCodeModel {
    public activity_id: number = 0;
    public refer_code: string = "";
}

export class GetPauseStatusModel {
    public account_token: string = "";
    public client_token: string = "";
    public package_id: number = 0;
}

/**
 * 绑定邮箱请求参数
 */
export class BindEmailRequestModel {
    public email: string = "";
    public account_token: string = "";
    public mailcode: string = "";
    public mailcode_key: string = "";
}

/**
 * 绑定手机号请求参数
 */
export class BindPhoneRequestModel {
    public phone: string = "";
    public account_token: string = "";
    public smscode: string = "";
    public smscode_key: string = "";
    public country_code: string = "";
}

/**
 * 暂停/恢复时间请求参数
 */
export class TimeSuspendedRequestModel {
    public account_token: string = "";
}

/**
 * 验证用户验证码请求参数
 */
export class VerifyCodeValidateRequestModel {
    public account_token: string = "";
    public verify_code: string = "";
    public verify_key: string = "";
}

/**
 * 修改邮箱账号请求参数
 */
export class modifyEmailRequestModel {
    public account_token: string = "";
    public verify_code: string = "";
    public verify_key: string = "";
    public email: string = "";
    public mailcode: string = "";
    public mailcode_key: string = "";
}

/**
 * 修改手机账号请求参数
 */
export class modifyPhoneRequestModel {
    public account_token: string = "";
    public verify_code: string = "";
    public verify_key: string = "";
    public phone: string = "";
    public smscode: string = "";
    public smscode_key: string = "";
    public country_code: string = "";
}

/**
 * 获取用户暂停日志需要的参数
 */
export class pauseLogRequestModel {
    public account_token: string = "";
    public type?: string = ""; //0: 暂停 1: 恢复 不传查所有
    public size?: number = 10; //10 返回数量
}

/**
 * 获取用户暂停日志返回的参数
 */
export class pauseLogModel {
    public status: number = 0; //0:暂停 1:恢复
    public pause_time: string = ""; //暂停时间
    public resume_time: string = ""; //恢复时间
    public op_source: string = ""; //操作来源 0:用户 1:后台操作
}

/**
 * 页面上需要的用户暂停日志参数
 */
export class pauseLogNeedModel {
    public pauseStatus: string;
    public pauseYears: string;
    public pauseMonths: string;
    public pauseDays: string;
    public pauseHMS: string;
}

/**
 * 用户第三方登录解绑
 */
export class removeBindRequestModel {
    public account_token: string = "";
    //2:微信开放平台登录；3:qq第三方登录；4:微博第三方登录；5:google第三方登录；6:twitter第三方登录；7:facebook第三方登录
    public open_type: number = 0;
}

/**
 * 用户第三方登录已绑定列表
 */
export class ThirdbindStateListModel {
    public open_type: number = 0; //2 微信 3QQ 4微博 5google 6 twitter 7facebook
}

/**
 * 用户第三方账号绑定状态
 */
export class ThirdbindStateModel {
    public wechat: boolean = false;
    public QQ: boolean = false;
    public weibo: boolean = false;
    public facebook: boolean = false;
    public google: boolean = false;
    public twitter: boolean = false;
}
