import { XmlDataModel } from '@/ts/models/IdataModel';

/**
 * 图形验证码
 */
export class ImgCaptchaRequestModel {
    public captcha_type: string = 'default';
}


/**
 * 图形验证码服务端返回
 */
export class ImgCaptchaModel extends XmlDataModel {
    public imgage: string | undefined;
    public key: string = '';
}