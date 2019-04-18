import $ from "jquery";
export class Luck {
    public index: number = -1;//当前转动到哪个位置，起点位置
    public count: number = 0;//总共有多少个位置
    public timer = null;//setTimeout的ID，用clearTimeout清除
    public speed: number = 20;	//初始转动速度
    public times: number = 0;	//转动次数
    public cycle: number = 50;	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    public prize: number = -1;	//中奖位置
    public obj = null;

    public init(id,prize) {
        if ($("#" + id).find(prize).length > 0) {
            let $luck = $("#" + id);
            let $units = $luck.find(prize);
            this.obj = $luck;
            this.count = $units.length;
            $luck.find(".activity_prize_" + this.index).addClass("active");
        };
    };

    public roll() {
        let index = this.index;
        let count = this.count;
        let luck = this.obj
        $(luck).find(".activity_prize_" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        };
        $(luck).find(".activity_prize_" + index).addClass("active");
        this.index = index;
        return false;
    };

    public top (index) {
        this.prize = index;
        return false;
    }
}