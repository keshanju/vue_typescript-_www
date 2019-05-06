import ProjectConfig from "../../../project.config";
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

/**
 * 全局的config
 */
export default class GlobalConfig {
	public static UC_IM_Number = "6712";

	/**
	 * 服务器url
	 */
	public static getBaseUrl() {
		if (ProjectConfig.server_type === 1) {
			// 开发环境
			return "http://kfapi.bohe.com";
		} else if (ProjectConfig.server_type === 2) {
			// 测试环境
			return "http://testapi.bohe.com:8013";
		} else if (ProjectConfig.server_type === 3) {
			// 生产环境
			if (LocalStorageUtil.getRegionCodes() == Util.REGION_CODE_0) {
				return "https://hkwebapi.bohe.com";
			} else {
				return "https://webapi.bohe.com";
			}
		} else if (ProjectConfig.server_type === 4) {
			// 验证环境
			if (LocalStorageUtil.getRegionCodes() == Util.REGION_CODE_0) {
				return "https://vfhkapi.bohe.com";
			} else {
				return "https://vfapi.bohe.com";
			}
		} else {
			return "";
		}
	}

	/**
	 *  图片服务器路径imgurl
	 */
	public static getImgBaseUrl() {
		if (ProjectConfig.server_type === 1) {
			// 开发环境
			return "http://kfpicture.bohe.com";
		} else if (ProjectConfig.server_type === 2) {
			// 测试环境
			return "http://picture-test.bohe.com:8014";
		} else if (ProjectConfig.server_type === 3) {
			// 生产环境
			return "https://hkpicture.bohe.com";
		} else if (ProjectConfig.server_type === 4) {
			// 验证环境
			return "http://vfpicture.bohe.com";
		} else {
			return "";
		}
	}

	/**
	 *  官网路径
	 */
	public static getWebBaseUrl() {
		if (ProjectConfig.server_type === 1) {
			// 开发环境
			return "http://dev-www.bohe.com";
			// return 'http://localhost:8080';
		} else if (ProjectConfig.server_type === 2) {
			// 测试环境
			return "http://test-www.bohe.com:8013";
		} else if (ProjectConfig.server_type === 3) {
			// 生产环境
			return "https://www.bohe.com";
		} else if (ProjectConfig.server_type === 4) {
			// 验证环境
			return "https://vfwww.bohe.com";
		} else {
			return "";
		}
	}

	/**
	 * 用户中心路径
	 */
	public static getUserBaseUrl() {
		//生产环境的user地址会变
		if (ProjectConfig.server_type === 3) {
			return "https://user.bohe.com";
		} else {
			const origin = window.location.origin;
			return origin;
		}
	}

	/**
	 * m路径
	 */
	public static getMobWebBaseUrl() {
		return "https://m.bohe.com";
	}

	/**
	 * 输出
	 */
	public static log(...args: any[]) {
		if (ProjectConfig.isDebug) {
			for (let i = 0; i < args.length; i++) {
				console.log(args[i]);
			}
		}
	}
}
