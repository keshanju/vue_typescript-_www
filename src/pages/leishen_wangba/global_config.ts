/**
 * 全局的config
 */
import ProjectConfig from "../../../project.config";
import LocalStorageUtil from "./LocalStorageUtil";
import Util from "@/ts/utils/Util";

export default class GlobalConfig {
  /**
   * interface url
   */
  public static getBaseUrl() {
    if (ProjectConfig.server_type === 1) {
      // 开发环境
      return "http://sandboxie-user.leigod.com/";
    } else if (ProjectConfig.server_type === 2) {
      // 测试环境
      return "http://sandboxie-user.leigod.com/";
    } else if (ProjectConfig.server_type === 3) {
      // 生产环境
      return "//netbar-api.leigod.com/";
    } else if (ProjectConfig.server_type === 4) {
      // 验证环境
      return "https://vfapi.bohe.com";
    } else {
      return "";
    }
  }

  /**
   * www服务器url
   */
  public static getWWWBaseUrl() {
    if (ProjectConfig.server_type === 1) {
      // 开发环境
      return "http://dev-api1.leigod.com";
    } else if (ProjectConfig.server_type === 2) {
      // 测试环境
      return "http://test-api2.leigod.com";
    } else if (ProjectConfig.server_type === 3) {
      // 生产环境
      if (LocalStorageUtil.getRegionCodes() == Util.REGION_CODE_0) {
        return "https://webhkapi.leigod.com";
      } else {
        return "https://webapi.leigod.com";
      }
    } else if (ProjectConfig.server_type === 4) {
      // 验证环境
      return "https://vf-webapi.leigod.com";
    } else {
      return "";
    }
  }

  /**
   * wwww config地址
   */
  public static getStafUrl() {
    if (ProjectConfig.server_type === 1) {
      // 开发环境
      return "http://sandboxie-user.leigod.com/";
    } else if (ProjectConfig.server_type === 2) {
      // 测试环境
      return "http://test-api2.leigod.com";
    } else if (ProjectConfig.server_type === 3) {
      // 生产环境
      return "https://staffapi.leigod.com";
    } else if (ProjectConfig.server_type === 4) {
      // 验证环境
      return "https://vf-staffapi.leigod.com";
    } else {
      return "";
    }
  }

  /**
   * 取环境地址
   */
  public static getLinkUrl() {
    if (ProjectConfig.server_type === 1) {
      // 开发环境
      return "http://sandboxie-netbar.leigod.com/";
    } else if (ProjectConfig.server_type === 2) {
      // 测试环境
      return "http://user2.leigod.com/";
    } else if (ProjectConfig.server_type === 3) {
      // 生产环境
      return "https://netbar-api.leigod.com/";
    } else if (ProjectConfig.server_type === 4) {
      // 验证环境
      return "https://vf-staffapi.leigod.com";
    } else {
      return "";
    }
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
