/**
 * 所有的tips语言管理
 */
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

export class TipsMsgUtil {
    /**
     * 中文的字典
     */
    public enMap: Map<string, string> = new Map<string, string>();

    /**
     * 英文字典
     */
    public cnMap: Map<string, string> = new Map<string, string>();
    public static instance: TipsMsgUtil;

    // key
    public static KEY_LOADING: string = "KEY_LOADING";
    public static KEY_WAITING: string = "KEY_WAITING";
    public static KEY_NOTIF: string = "KEY_NOTIF";
    public static KEY_NOTIF_ERROR_TITLE: string = "KEY_NOTIF_ERROR_TITLE";
    public static KEY_NOTIF_SUCCESS_TITLE: string = "KEY_NOTIF_SUCCESS_TITLE";
    public static KEY_NOTIF_SMS: string = "KEY_NOTIF_SMS";
    public static KEY_NOTIF_EMAIL: string = "KEY_NOTIF_EMAIL";
    public static KEY_NOTIF_LOGIN: string = "KEY_NOTIF_LOGIN";
    public static KEY_NOTIF_LOGIN_FAILURE: string = "KEY_NOTIF_LOGIN_FAILURE";
    public static KEY_NOTIF_REGISTER: string = "KEY_NOTIF_REGISTER";
    public static KEY_NOTIF_BINDING_MOBILE: string = "KEY_NOTIF_BINDING_MOBILE";
    public static KEY_NOTIF_THIRDBIND_FAILD: string = "KEY_NOTIF_THIRDBIND_FAILD";
    public static KEY_NOTIF_BINDING_EMAIL: string = "KEY_NOTIF_BINDING_EMAIL";
    public static KEY_NOTIF_BINDING: string = "KEY_NOTIF_BINDING";
    public static KEY_NOTIF_FINDPWD: string = "KEY_NOTIF_FINDPWD";
    public static KEY_NOTIF_PHONE_EMPTY: string = "KEY_NOTIF_PHONE_EMPTY";
    public static KEY_NOTIF_PHONE_ERROR: string = "KEY_NOTIF_PHONE_ERROR";
    public static KEY_NOTIF_EMAIL_EMPTY: string = "KEY_NOTIF_EMAIL_EMPTY";
    public static KEY_NOTIF_EMAIL_ERROR: string = "KEY_NOTIF_EMAIL_ERROR";
    public static KEY_NOTIF_ACCOUNT_EMPTY: string = "KEY_NOTIF_ACCOUNT_EMPTY";
    public static KEY_NOTIF_ACCOUNT_ERROR: string = "KEY_NOTIF_ACCOUNT_ERROR";
    public static KEY_NOTIF_PASSWORD_EMPTY: string = "KEY_NOTIF_PASSWORD_EMPTY";
    public static KEY_NOTIF_PASSWORD_ERROR: string = "KEY_NOTIF_PASSWORD_ERROR";
    public static KEY_NOTIF_PASSWORDTWO_ERROR: string =
        "KEY_NOTIF_PASSWORDTWO_ERROR";
    public static KEY_NOTIF_IMGCAPTCHACODE_EMPTY: string =
        "KEY_NOTIF_IMGCAPTCHACODE_EMPTY";
    public static KEY_NOTIF_IMGCAPTCHACODE_ERROR: string =
        "KEY_NOTIF_IMGCAPTCHACODE_ERROR";
    public static KEY_NOTIF_SMSCODE_EMPTY: string = "KEY_NOTIF_SMSCODE_EMPTY";
    public static KEY_NOTIF_SMSCODE_ERROR: string = "KEY_NOTIF_SMSCODE_ERROR";
    public static KEY_NOTIF_EMPTY_ERROR: string = "KEY_NOTIF_EMPTY_ERROR";
    public static KEY_NOTIF_EMAILCODE_EMPTY: string = "KEY_NOTIF_EMAILCODE_EMPTY";
    public static KEY_NOTIF_EMAILCODE_ERROR: string = "KEY_NOTIF_EMAILCODE_ERROR";
    public static KEY_NOTIF_READAGREEMENT: string = "KEY_NOTIF_READAGREEMENT";
    public static KEY_NOTIF_PACKAGE_EMPTY: string = "KEY_NOTIF_PACKAGE_EMPTY";
    public static KEY_NOTIF_PAY_PACKAGE_SUCCESS: string =
        "KEY_NOTIF_PAY_PACKAGE_SUCCESS";
    public static KEY_NOTIF_RESETPWD_EMAIL_EMPTY: string =
        "KEY_NOTIF_RESETPWD_EMAIL_EMPTY";
    public static KEY_NOTIF_RESETPWD_PHONE_EMPTY: string =
        "KEY_NOTIF_RESETPWD_PHONE_EMPTY";
    public static KEY_NOTIF_RESETPWD_SUCCESS: string =
        "KEY_NOTIF_RESETPWD_SUCCESS";
    public static KEY_NOTIF_RESETNICKNAME: string = "KEY_NOTIF_RESETNICKNAME";
    public static KEY_NOTIF_RESETNICKNAME_SUCCESS: string =
        "KEY_NOTIF_RESETNICKNAME_SUCCESS";
    public static KEY_NOTIF_RESETPWD_SET_SUCCESS: string =
        "KEY_NOTIF_RESETPWD_SET_SUCCESS";
    public static KEY_NOTIF_SERVICE_AGREEN: string = "KEY_NOTIF_SERVICE_AGREEN";
    public static KEY_NOTIF_PAUSE_SUCCESS: string = "KEY_NOTIF_PAUSE_SUCCESS";
    public static KEY_NOTIF_RESTORE_SUCCESS: string = "KEY_NOTIF_RESTORE_SUCCESS";
    //
    public static KEY_NOTIF_CARD_NUM_EMPTY: string = "KEY_NOTIF_CARD_NUM_EMPTY";
    public static KEY_NOTIF_CARD_NUM_ERROR: string = "KEY_NOTIF_CARD_NUM_ERROR";
    public static KEY_NOTIF_CARD_PWD_EMPTY: string = "KEY_NOTIF_CARD_PWD_EMPTY";
    public static KEY_NOTIF_CARD_PWD_ERROR: string = "KEY_NOTIF_CARD_PWD_ERROR";
    public static KEY_NOTIF_CARD_RECHARGE_SUCCESS: string =
        "KEY_NOTIF_CARD_RECHARGE_SUCCESS";
    public static KEY_NOTIF_AUTO_LOGIN: string = "KEY_NOTIF_AUTO_LOGIN";
    public static KEY_NOTIF_WAIT: string = "KEY_NOTIF_WAIT";
    public static KEY_NOTIF_PHONE_UNBIND: string = "KEY_NOTIF_PHONE_UNBIND";
    public static KEY_NOTIF_EMAIL_UNBIND: string = "KEY_NOTIF_EMAIL_UNBIND";
    public static KEY_NOTIF_AVATAR_UPLOADED: string = "KEY_NOTIF_AVATAR_UPLOADED";
    public static KEY_WEIXIN_REMOVEBING_SUCCEED: string =
        "KEY_WEIXIN_REMOVEBING_SUCCEED";
    public static KEY_REMOVEBIND_NOTIFY: string = "KEY_REMOVEBIND_NOTIFY";
    public static KEY_NOTIF_LOGIN_OUT: string = "KEY_NOTIF_LOGIN_OUT";
    public static KEY_NOTIF_YES: string = "KEY_NOTIF_YES";
    public static KEY_NOTIF_NO: string = "KEY_NOTIF_NO";
    public static KEY_NOTIF_TIME_SUSPEND_SUCCESS: string =
        "KEY_NOTIF_TIME_SUSPEND_SUCCESS";
    public static KEY_NOTIF_TIME_RESTORE_SUCCESS: string =
        "KEY_NOTIF_TIME_RESTORE_SUCCESS";
    public static KEY_NOTIF_DATE_ERROR: string =
        "KEY_NOTIF_DATE_ERROR";
    public static KEY_NOTIF_NICKNAME_SETEMPTY: string = "KEY_NOTIF_NICKNAME_SETEMPTY";
    public static KEY_NOTIF_ADDRESS_SETEMPTY: string = "KEY_NOTIF_ADDRESS_SETEMPTY";
    public static KEY_NOTIF_BIRTHDAY_SETEMPTY: string = "KEY_NOTIF_BIRTHDAY_SETEMPTY";
    public static KEY_NOTIF_MSG_SEND_SUCCESS: string = "KEY_NOTIF_MSG_SEND_SUCCESS";
    public static KEY_NOTIF_MANYOU_OPEN: string = "KEY_NOTIF_MANYOU_OPEN";
    public static KEY_NOTIF_MANYOU_CLOSE: string = "KEY_NOTIF_MANYOU_CLOSE";
    public static KEY_NOTIF_DOWNLOAD_DOUBLE_ERROR: string = "KEY_NOTIF_DOWNLOAD_DOUBLE_ERROR";
    public static KEY_NOTIF_IMGSCALE_SMALL: string = "KEY_NOTIF_IMGSCALE_SMALL";

    //
    public static KEY_NOTIF_PICTURE_OVERSIZE: string =
        "KEY_NOTIF_PICTURE_OVERSIZE";

    // button
    public static KEY_BUTTON_BACK: string = "KEY_BUTTON_BACK";

    /**
     * map
     */
    public initMap() {
        this.cnMap.set(TipsMsgUtil.KEY_LOADING, "加载中...");
        this.enMap.set(TipsMsgUtil.KEY_LOADING, "loading...");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF, "提示");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF, "notify");

        this.cnMap.set(TipsMsgUtil.KEY_WAITING, "请稍后重试!");
        this.enMap.set(TipsMsgUtil.KEY_WAITING, "Please try again later");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE, "温馨提醒");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE, "Notice");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE, "成功提醒");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE,
            "Reminded successfully"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_SMS, "验证码发送成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_SMS,
            "SMS code was obtained successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_EMAIL, "邮件发送成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_EMAIL,
            "Email has been sent successfully"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_LOGIN, "登录成功!");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_LOGIN, "login successfully!");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE, "登录失效,请重新登录!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE,
            "Login expired, please re-login "
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_REGISTER, "注册成功!");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_REGISTER, "Registered successfully!");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_BINDING_MOBILE, "手机号绑定成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_BINDING_MOBILE,
            "Mobile bound successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_THIRDBIND_FAILD, "绑定失败，该账号已被绑定！");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_THIRDBIND_FAILD,
            "Faild！that account has been bounded!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_BINDING_EMAIL, "邮箱绑定成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_BINDING_EMAIL,
            "Email bound successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_BINDING, "绑定成功!");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_BINDING, "Bound successfully!");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_FINDPWD, "密码找回成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_FINDPWD,
            "Password recovered successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY, "手机号码不能为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY,
            "Mobile cannot be empty!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR, "手机号码格式不正确!");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR, "Mobile format error!");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY, "邮箱不能为空!");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY, "Email cannot be empty!");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR, "邮箱格式不正确!");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR, "Email format error!");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_ACCOUNT_EMPTY, "邮箱/账号不能为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_ACCOUNT_EMPTY,
            "Email or account cannot be empty!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_ACCOUNT_ERROR, "邮箱/账号格式不正确!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_ACCOUNT_ERROR,
            "Email or account format error!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY, "密码不能为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY,
            "Password cannot be empty!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR, "密码格式不正确!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR,
            "Password format error!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR,
            "两次输入密码不一致!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR,
            "The two passwords do not match!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY,
            "图形验证码不能为空!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY,
            "The graphic code cannot be empty!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR,
            "图形验证码格式不正确!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR,
            "The graphic code format error!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY, "短信验证码不能为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY,
            "SMS code cannot be empty!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR,
            "短信验证码格式不正确!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR,
            "SMS code format error!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_EMAILCODE_EMPTY,
            "邮箱验证码不能为空!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_EMAILCODE_EMPTY,
            "Email code cannot be empty!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_EMAILCODE_ERROR,
            "邮箱验证码格式不正确!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_EMAILCODE_ERROR,
            "Email code format error!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_EMPTY_ERROR, "验证码格式错误!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_EMPTY_ERROR,
            "Verification code format error!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_PACKAGE_EMPTY, "请选择一种体验套餐!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_PACKAGE_EMPTY,
            "Please select an experience package!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_READAGREEMENT,
            "请阅读并勾选用户协议!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_READAGREEMENT,
            "Please read and agree the user agreement!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_PAY_PACKAGE_SUCCESS,
            "恭喜您！购买套餐成功!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_PAY_PACKAGE_SUCCESS,
            "Congratulations to you! Buy the package successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_BUTTON_BACK, "返回");
        this.enMap.set(TipsMsgUtil.KEY_BUTTON_BACK, "Back");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_RESETPWD_EMAIL_EMPTY, "此邮箱未注册!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_RESETPWD_EMAIL_EMPTY,
            "Email unregistered"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_RESETPWD_PHONE_EMPTY,
            "此手机号未注册!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_RESETPWD_PHONE_EMPTY,
            "Moblie unregistered"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_RESETPWD_SUCCESS,
            "密码修改成功,下次登录生效!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_RESETPWD_SUCCESS,
            "Password reset successfully, Next login takes effect!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_RESETPWD_SET_SUCCESS, "密码设置成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_RESETPWD_SET_SUCCESS,
            "Password reset successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_RESETNICKNAME, "是否确认修改昵称?");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_RESETNICKNAME,
            "Confirm to change the nickname?"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_RESETNICKNAME_SUCCESS, "修改成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_RESETNICKNAME_SUCCESS,
            "Modified successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_CARD_NUM_EMPTY, "充值卡号不能为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_CARD_NUM_EMPTY,
            "Recharge card cannot be empty!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_CARD_NUM_ERROR, "充值卡号格式错误!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_CARD_NUM_ERROR,
            "Recharge card format error!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_CARD_PWD_EMPTY, "充值卡密码不能为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_CARD_PWD_EMPTY,
            "Recharge card password cannot be empty!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_CARD_PWD_ERROR, "充值卡密码格式错误!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_CARD_PWD_ERROR,
            "Recharge card password format error!"
        );

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_CARD_RECHARGE_SUCCESS,
            "充值卡充值成功!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_CARD_RECHARGE_SUCCESS,
            "Recharged successfully"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_PAUSE_SUCCESS, "暂停成功!");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_PAUSE_SUCCESS, "Paused successfully");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_RESTORE_SUCCESS, "恢复成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_RESTORE_SUCCESS,
            "Restore successfully"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_AUTO_LOGIN, "自动登录中...");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_AUTO_LOGIN, "Auto loging in...");

        this.cnMap.set(
            TipsMsgUtil.KEY_NOTIF_SERVICE_AGREEN,
            "请阅读并勾选会员服务条款!"
        );
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_SERVICE_AGREEN,
            "Please read and agree the membership terms!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_WAIT, "敬请期待!");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_WAIT, "Coming soon!");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_PHONE_UNBIND, "手机号解绑成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_PHONE_UNBIND,
            "The phone was unbound successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_EMAIL_UNBIND, "邮箱解绑成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_EMAIL_UNBIND,
            "The email was unbound successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_AVATAR_UPLOADED, "头像上传成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_AVATAR_UPLOADED,
            "Avatar uploaded successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_WEIXIN_REMOVEBING_SUCCEED, "解绑成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_WEIXIN_REMOVEBING_SUCCEED,
            "Unbund successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_REMOVEBIND_NOTIFY, "确定要解除绑定么?");
        this.enMap.set(TipsMsgUtil.KEY_REMOVEBIND_NOTIFY, "Be sure to unbind?");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_LOGIN_OUT, "确定要退出登录么?");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_LOGIN_OUT, "Sure to login out?");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_NO, "取消");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_NO, "No");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_YES, "确定");
        this.enMap.set(TipsMsgUtil.KEY_NOTIF_YES, "Yes");

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_TIME_SUSPEND_SUCCESS, "暂停计时成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_TIME_SUSPEND_SUCCESS,
            "Time suspended success!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_TIME_RESTORE_SUCCESS, "恢复计时成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_TIME_RESTORE_SUCCESS,
            "Time restore success!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_PICTURE_OVERSIZE, "图片大小超过限制!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_PICTURE_OVERSIZE,
            "The image size exceeds the limit!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_DATE_ERROR, "日期不能晚于今天!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_DATE_ERROR,
            "The date cannot be later than today!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_NICKNAME_SETEMPTY, "昵称不能修改为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_NICKNAME_SETEMPTY,
            "The nickname cannot be changed to null!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_ADDRESS_SETEMPTY, "地址不能修改为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_ADDRESS_SETEMPTY,
            "The address cannot be changed to null!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_BIRTHDAY_SETEMPTY, "生日不能修改为空!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_BIRTHDAY_SETEMPTY,
            "The birthday cannot be changed to null!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_MSG_SEND_SUCCESS, "信息提交成功!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_MSG_SEND_SUCCESS,
            "Information submitted successfully!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_MANYOU_OPEN, "壁纸漫游已开启!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_MANYOU_OPEN,
            "Wallpaper roaming is opend!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_MANYOU_CLOSE, "壁纸漫游已关闭!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_MANYOU_CLOSE,
            "Wallpaper roaming is closed!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_DOWNLOAD_DOUBLE_ERROR, "正在下载其它，请稍等!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_DOWNLOAD_DOUBLE_ERROR,
            "Please wait while downloading others!"
        );

        this.cnMap.set(TipsMsgUtil.KEY_NOTIF_IMGSCALE_SMALL, "请勿过度缩放头像图片!");
        this.enMap.set(
            TipsMsgUtil.KEY_NOTIF_IMGSCALE_SMALL,
            "Do not overscale the image!"
        );
    }

    /**
     * 获取对应的文字
     * @param ln 当前语言
     */
    public static getTipsMsg(key: string): string {
        if (this.instance == null) {
            this.instance = new TipsMsgUtil();
            this.instance.initMap();
        }
        let msg;
        const ln = LocalStorageUtil.getLanguage();
        switch (ln) {
            case Util.ZH_CN:
                msg = this.instance.cnMap.get(key);
                break;
            case Util.EN:
                msg = this.instance.enMap.get(key);
                break;
            default:
                msg = this.instance.enMap.get(key);
                break;
        }

        return msg as string;
    }
}
