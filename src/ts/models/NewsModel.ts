/*************************************新*/
import Util from "@/ts/utils/Util";

export default class NewsConfigModel {
  /**
   *
   */
  public baseUrl: string = "";

  /**
   *
   */
  public region_code: number = Util.REGION_CODE_0;

  /**
   *
   */
  public page: number = 1;

  /**
   *
   */
  public size: number = 5;

  /**
   * 支持类型 1：Web官网，2：移动端， 3：windows客户端
   */
  public support_type: number = 1;

  /**
   * 标签
   */
  public label: string = "";
}

//新闻接口传递模型
export class NewsRequestModel {

  /**
   *
   */
  public region_code: number = Util.REGION_CODE_0;

  /**
   *
   */
  public page: number = 1;

  /**
   *
   */
  public size: number = 5;

  /**
   * 支持类型 1：Web官网，2：移动端， 3：windows客户端
   */
  public support_type: number = 1;

  /**
   *类别：0，默认 公告；1，帮助文档 ;2, 游戏资讯;3,相关问答，多个英文以逗号隔开
   */

  public class_type:number=0;

  /**
   * 标签
   */
  public label: string = "";
}

/**
 * 资讯列表返回参数
 */
export class NewsModel {
  public current_page: number = 0;
  public last_page: number = 0;
  public per_page: number = 0;
  public total: number = 0;
  public list: Array<NewModel> = [];
}
/**
 * 活动倒计时的类
 */
export class timeClock {
  public days: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
}
/**
 * 活动中已经推荐用户的列表
 */
export class referList {
  public account_token: string = "";
  public activity_id: number = 0;
  public type: number = 0;
  public page: number = 1;
  public size: number = 50;
}
export class referOutput {
  public create_time: string = "";
  public mobile_num: string = "";
  public mail: string = "";
  public country_code: number = 86;
}


/**
 * 资讯数据
 */
export class NewModel {
  public id: string = "";
  public title: string = "";
  public image_url: string = "";
  public summary: string = "";
  public content: string = "";
  public publish_time_year: string = "";
  public publish_time_month: string = "";
  public publish_time_day: string = "";
  public date_time: string = "";
  public label?: string = "";
  public support_type?: number = 0;

}

/**
 * 资讯info
 */
export class NewsInfoModel {
  public create_time: string = "";
  public id: string = "";
  public title: string = "";
  public image_url: string = "";
  public summary: string = "";
  public label: string = "";
}
/*************************************新 END*/

/*************************************旧*/
/**
 * 资讯列表请求参数
 */
export class NewRequestModel {
  public page: number = 0;
  public size: number = 5;
  public support_type: number = 0; //0,//all   1,//pc官网   2,//移动端  3,//windows客户端
  public class_type: number = 0; //0 公告  1帮助  2资讯
  public region_code?: number;
  public label: string = ""; //资讯类型
}

/**
 * 活动列表请求参数
 */
export class ActivityRequestModel {
  public type: any = '1'; //活动类型 1专题活动 2公从号活动 3活动中奖名单 4手机APP活动 5seo问答  6seo新闻 7推荐注册活动   8推荐购买活动 10周五活动
  public size: number = 0; //页面显示条数
  public plat_type: number = 0; //平台类型  0,//所有类型   1,//pc官网   2,//移动端  3,//windows客户端
  public page: number = 1; //当前页
  public region_code?: number;
}
/**
 * 活动详情请求参数
 */
export class ActivityDetailRequestModel {
  public type: number = 0;
  public plat_type: number = 0;
  public account_token?: string = "";
  public id: number = 0;
  public region_code?: number;
}

/**
 * 活动列表返回数据
 */
export class ActivityModel {
  public id: string = "";
  public fee: number = 0;
  public title: string = "";
  public type: number = 0;
  public plat_type: number = 0;
  public label: string = "";
  public image: string = "";
  public summary: string = "";
  public content: string = "";
  public prize: string = "";
  public start_time: string = "";
  public end_time: string = "";
  public create_time: string = "";
  public hits: number = 0;
  public url: string = "";
  public seo_keywords: string = "";
  public seo_desc: string = "";
}

/**
 * 活动图片列表需要的参数
 */
export class ActivityRequestPictureModel {
  public activity_id: string = "";
  public region_code: number;
  public plat_type: number = 0;//平台类型
  public type: number = 0;//活动类型
}
/**
 * 活动图片列表返回参数
 */
export class ActivityPictureModel {
  public id: number = 0;
  public imgs: [{ key: number; img_url: string }]; //返回所有平台的图片 0 是官网登陆页面  1是移动端登录  2pc 客户端登录
  public title: string = ""; //
  public url: string = ""; //
  public url_type: number; //0 不是单独的专题  1是单独专题页面
}

/**
 * 公告详情请求参数
 */
export class NoticeDetailRequestModel {
  public id: number = 0;
  public class_type: number = 0;
  public support_type: number = 0;
}

/**
 * 公告详情返回数据
 */
export class NoticeDetailModel {
  public id: string = "";
  public image_url: string = "";
  public title: string = "";
  public class_type: number = 0;
  public support_type: number = 0;
  public next_id: number = 0;
  public next_title: string = "";
  public pre_id: number = 0;
  public pre_title: string = "";
  public summary: string = "";
  public content: string = "";
  public tag: string = "";
  public create_staff_id: number = 0;
  public change_time: string = "";
  public create_time: string = "";
  public hits: number = 0;
  public url: string = "";
  public seo_keywords: string = "";
  public seo_desc: string = "";
}

/**
 * 抽奖活动请求
 */
export class ActivityDrawModel {
  public activity_id: number = 0;
  public account_token: string = "";
}

/**
 * 中奖返回数据
 */
export class GetAwardRespondModel {
  public present_id: number = 0;
  public title: string = "";
}
/**
 * 获取礼品信息请求参数
 */
export class PresentRequestModel {
  public activity_id: number = 0;
}

/**
 * 获取礼品信息返回数据
 */
export class PresentRespondModel {
  public id: number = 0;
  public image: string = "";
  public money: number = 0;
  public number: number = 0;
  public price_type: number = 0;
  public title: string = "";
  public type: number = 0;
  public ref_id: number = 0;
}

/**
 *  获取中奖列表请求参数
 */
export class PresentListRequestModel {
  public activity_id: number = 0;
  public size: number = 0;
  public present_type: number = 0; //活动奖品类型，0：随机抽奖 1指定奖品抽奖
}

/**
 * 中奖列表返回数据
 */
export class PresentListResponseModel {
  public create_time: string = "";
  public mail: string = "";
  public moblie_num: string = "";
  public nickname: string = "";
  public title: string = "";
  public user_id: number = 0;
}
/*************************************旧 END*/

/**
 * 中奖列表返回数据
 */
export class GetRegincodeModel {
  public region_code: number = 0;
  public ip_address: string = "";
}
