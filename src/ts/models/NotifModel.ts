import { TipsMsgUtil } from '../utils/TipsMsgUtil';

/**
 * 提示数据
 */
export class NotifModel {
    public tipTitle: string = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE); //提示信息标题
    public tipMessage: string = ""; //提示信息message
    public tipType: string = "success"; //提示信息类型
}
