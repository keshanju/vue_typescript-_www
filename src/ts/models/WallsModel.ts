
/**
 * 壁纸分类列表返回参数
 */
export class WallTypeListModel {
    public id: number; //壁纸分类id
    public pid: string = ""; // 上级id
    public name: string = ""; //分类名称
    public name_en: string = ""; //分类英文名称
    public list = [];
}

/**
 * 壁纸列表请求参数
 */
export class WallListRequestModel {
    public cate_id?: number; //壁纸分类id
    public search?: string; // 搜索关键词
    public is_new?: string; //最新排序
    public is_hot?: string; //是否最热
    public region_code: string = ''; //地区code
    public pixel?: string;// 分辨率，格式aaa,bbb
    public size: number = 10000;//每页壁纸条目数
}

/**
 * 壁纸列表返回参数
 */
export class WallListModel {
    public id: number = 0; //壁纸id
    public title: string = ""; // 壁纸名称
    public size: string = ""; //壁纸大小
    public pixel_x: string = ""; //分辨率宽
    public pixel_y: string = ''; //分辨率高
    public img_url: string = '';// 壁纸缩略图
    public type: string = ''; //壁纸类型 1:动态壁纸;2:非动态
    public is_top: string = ''; //是否置顶
    public is_hot: string = ''; //是否热门
    public is_commerce: string = ''; //是否是商业壁纸 0:否，1:是，默认:否
    public is_free: string = ''; //是否限免（0：免费；1：收费）
    public create_time: string = ''; //新增时间
    public change_time: string = ''; //修改时间
}

/**
 * 用户下载壁纸请求参数
 */
export class WallDownloadRequestModel {
    public wall_id: number = 0; //壁纸id
    public account_token: string = ""; // 用户token
}