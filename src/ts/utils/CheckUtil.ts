/**
 * 表单验证
 */
export default class CheckUtil {
    /**
     * 验证手机号
     */
    public static checkPhone(phoneNum: string) {
        let phoneReg = /^1\d{10}$/;
        if (phoneReg.test(phoneNum)) {
            //手机号码格式正确
            return true
        } else {
            //手机号码格式不正确
            return false
        }
    }

    /**
     * 验证邮箱
     */
    public static checkEmail(email: string) {
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (emailReg.test(email)) {
            //邮箱格式正确
            return true;
        } else {
            //邮箱格式不正确
            return false;
        }
    }

    /**
     * 验证账号
     */
    public static checkAccount(email: string) {
        let emailReg = /^[a-zA-Z0-9/!@#$%^&*()-_+,.?/<>|]{1,32}$/;
        if (emailReg.test(email)) {
            //邮箱格式正确
            return true;
        } else {
            //邮箱格式不正确
            return false;
        }
    }

    /**
         * 验证图形验证码
         */
    public static checkimgVerificatioCode(imgVerificatioCode: string) {
        if (imgVerificatioCode.length == 4) {
            //短信验证码正确
            return true;
        } else {
            //短信验证码不正确
            return false;
        }
    }

    /**
     * 验证短信验证码
     */
    public static checkSmscode(smscode: string) {
        if (smscode.length == 6 || smscode.length == 5) {
            //短信验证码正确
            return true;
        } else {
            //短信验证码不正确
            return false;
        }
    }

    /**
     * 验证邮箱验证码
     */
    public static checkMailcode(mailcode: string) {
        if (mailcode.length == 6) {
            //邮箱验证码格式正确
            return true;
        } else {
            //邮箱验证码格式不正确
            return false;
        }
    }

    /**
     * 验证被记住密码
     */
    public static checkRemberPwd(pwd: string) {
        let pwdReg = /^[a-zA-Z0-9]{32}$/
        if (pwdReg.test(pwd)) {
            //密码格式正确
            return true;
        } else {
            //密码格式不正确
            return false;
        }
    }

    /**
     * 验证密码
     */
    public static checkPwd(pwd: string) {
        let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![!@#$%^&*()_+,.?/<>|]+$)[0-9A-Za-z!@#$%^&*()_+,.?/<>|]{6,20}$/
        if (pwdReg.test(pwd)) {
            //密码格式正确
            return true;
        } else {
            //密码格式不正确
            return false;
        }
    }

    /**
     * 验证密码
     */
    public static checkLoginPwd(pwd: string) {
        // let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![!@#$%^&*()_+,.?/<>|]+$)[0-9A-Za-z!@#$%^&*()_+,.?/<>|]{6,20}$/
        let pwdReg = /^[a-zA-Z0-9_.-]{6,32}$/
        if (pwdReg.test(pwd)) {
            //密码格式正确
            return true;
        } else {
            //密码格式不正确
            return false;
        }
    }

    /**
     * 验证二级密码
     */
    public static checkSecondPwd(pwd: string) {
        let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,12}$/
        if (pwdReg.test(pwd)) {
            //密码格式正确
            return true;
        } else {
            //密码格式不正确
            return false;
        }
    }

    /**
     * 确认密码验证
     */
    public static checkPwdTwo(pwdTwo: string, pwd: string) {
        if (pwdTwo == pwd) {
            //密码格式正确
            return true;
        } else {
            //密码格式不正确
            return false;
        }
    }

    /**
     * 充值卡卡号验证
     */
    public static checkCardNum(cord: string) {
        if (cord.length > 0 && cord.length <= 128) {
            //卡号格式正确
            return true;
        } else {
            //卡号格式不正确
            return false;
        }
    }

    /**
     * 充值卡密码验证
     */
    public static checkCardPwd(cordpwd: string) {
        if (cordpwd.length > 0 && cordpwd.length <= 32) {
            //密码格式正确
            return true;
        } else {
            //密码格式不正确
            return false;
        }
    }
}