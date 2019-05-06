<template>
	<div style="margin-bottom:50px;" v-loading="isLoading">
		<div style="color: #000;padding:15px;" class="components_cell">
			<p class="web_news_title web_safty_font">{{$t("user.z46")}}</p>
			<el-table :data="ActiveRecordList" border style="width: 100%" stripe :highlight-current-row="true">
				<el-table-column show-overflow-tooltip prop="activity_title" :label="$t('userprize.up1')" min-width="180"></el-table-column>
				<el-table-column prop="create_time" :label="$t('userprize.up2')" width="160"></el-table-column>
				<el-table-column prop="present_title" :label="$t('userprize.up3')" min-width="120"></el-table-column>
				<el-table-column prop="status_title" :label="$t('userprize.up4')" width="80"></el-table-column>
				<el-table-column :label="$t('userprize.up5')" width="100" header-align="center" align="center">
					<template slot-scope="scope">
						<a @click="onChooseOrderPayType(scope.row)" style="padding: 2px 8px" v-show="scope.row.status == 0" class="public_btn">{{$t("userprize.up6")}}</a>
						<a @click="onChooseOrderPayType(scope.row)" style="padding: 2px 8px" v-show="scope.row.status != 0" class="public_btn">{{$t("userprize.up7")}}</a>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div style="text-align:center;">
			<el-pagination class="user_pag" ref="elPagination" background @prev-click="pervOrderList" @next-click="nextOrderList" @current-change="currentChange" :page-size="rowsPerPage" layout="prev, pager, next" :total="total"></el-pagination>
		</div>
		<el-dialog width="500px" :visible.sync="payTypeDialogVisible" :title="dialogTitle">
			<div v-show="dialogType=='1'">
				<ul class="login_box">
					<li>
						<label class="inputLabel">{{$t('userprize.up8')}}</label>
						<input v-model="username" class="inputName">
					</li>
					<li style="width:100%;">
						<label class="inputLabel">{{$t('login.l4')}}</label>
						<!-- <select v-model="country_code" class="inputSel">
							<option v-for="item in areaCodeListArr" :value="item" :key="item">{{item}}</option>
						</select>-->
						<el-select v-model="country_code" size="mini" class="inputSel">
							<el-option v-for="item in country_code" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<input v-model="phone" class="inputName" type="text" style="width:120px;">
					</li>
					<li>
						<label class="inputLabel">{{$t('login.l9')}}</label>
						<input v-model="email" class="inputName">
					</li>
					<li>
						<label class="inputLabel">{{$t('userprize.up14')}}</label>
						<input style="width: 80%;" v-model="address" class="inputName">
					</li>
					<li style="text-align:center;">
						<el-button style="background-color:#ffd33e;padding: 6px 24px;" @click="sendUserInfo">{{$t('userprize.up9')}}</el-button>
					</li>
				</ul>
			</div>
			<div v-show="dialogType=='2'" style="text-align:center;">
				<!-- 客服尽快为你发出奖品，请注意查收 -->
				<img src="../images/huowu.png">
				<p class="chongzhi">{{$t('userprize.up12')}}</p>
			</div>
			<div v-show="dialogType=='3'">
				<!-- 第三方充值卡 -->
				<p class="chongzhi">{{otherCard}}</p>
				<p class="chongzhi">{{$t('userprize.up10')}}：{{cardInfo.card_no}}</p>
				<p class="chongzhi">{{$t('userprize.up11')}}：{{cardInfo.card_password}}</p>
			</div>
			<div v-show="dialogType=='4'">
				<!-- 卡密充值 -->
				<p class="chongzhi">{{$t('userprize.up13')}}</p>
				<p class="chongzhi">
					<span v-show="cardInfo.card_no.indexOf('：')===-1">{{$t('userprize.up10')}}：</span>
					{{cardInfo.card_no}}
				</p>
				<p class="chongzhi">
					<span v-show="cardInfo.card_no.indexOf('：')===-1">{{$t('userprize.up11')}}：</span>
					{{cardInfo.card_password}}
				</p>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
	Table,
	TableColumn,
	Button,
	Pagination,
	Select,
	Option
} from "element-ui";
import ActiveRecordProxy from "@/ts/proxy/ActiveRecordProxy";
import GlobalConfig from "@/pages/bohe/global.config";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
@Component({
	components: {
		"el-table": Table,
		"el-table-column": TableColumn,
		"el-button": Button,
		"el-pagination": Pagination,
		"el-select": Select,
		"el-option": Option
	}
})
export default class ActiveRecord extends ActiveRecordProxy {
	public dialogTitle: string = ""; //弹出框的title
	public dialogType: string = "1"; //弹出框的类型

	/**
	 * token过期的处理
	 */
	public tokenExpired() {
		LocalStorageUtil.loginOut();
		let param = window.location.search;
		JumpWebUtil.wapJump(
			GlobalConfig.getUserBaseUrl(),
			JumpWebUtil.HTML_NAME_LOGIN,
			param
		);
	}
	created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
	}
	// 当提交用户信息领取实物的时候
	sendUserInfo() {
		this.confirmUserInfo();
	}
	// 点击待兑奖或者查看详情的时候
	onChooseOrderPayType(row) {
		this.payTypeDialogVisible = true;
		//@ts-ignore
		switch (row.award_type) {
			case 0:
				// 是充值卡
				this.dialogType = "4";
				this.dialogTitle = this.$t("user.b120").toString();
				if (row.status == 0) {
					// 如果是待领取状态
					this.chargeCard(row);
				} else {
					// 用processMsg处理row.message里面的卡号和密码
					this.processMsg(row.message);
				}
				break;
			case 1:
				// 现金红包
				break;
			case 2:
				// 实物
				//@ts-ignore
				if (row.status === 0) {
					// 如果是待兑换状态填写信息，否则提示
					this.dialogType = "1";
					this.dialogTitle = this.$t("user.b123").toString();
					this.currentActiveRecordModel = row;
				} else {
					this.dialogType = "2";
					this.dialogTitle = this.$t("user.b120").toString();
				}
				break;
			case 3:
				// 第三方充值卡
				this.dialogTitle = this.$t("user.b120").toString();
				this.otherCard = row.present_title;
				this.dialogType = "3";
				if (row.status == 0) {
					// 如果是待领取状态
					this.chargeCard(row);
				} else {
					// 用processMsg处理row.message里面的卡号和密码
					this.processMsg(row.message);
				}
				break;
		}
	}
	// 上一页
	pervOrderList(val: number) {
		//@ts-ignore
	}
	// 下一页
	nextOrderList(val: number) {}
	currentChange(val: number) {
		//@ts-ignore
		this.getActiveRecordList(val, this.rowsPerPage);
	}
	//页面初始化调用的方法
	public initA() {
		//获取表内的数据
		this.getActiveRecordList(1, this.rowsPerPage);
		//获取地区的区域编码
		this.getAreaCodeList();
	}
}
</script>
