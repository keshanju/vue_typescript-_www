import ProjectConfig from "../../../project.config";
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

/**
 * 全局的config
 */
export default class GlobalConfig {

    public static UC_IM_Number: string = "2FAepT";

    /**
     * 服务器url
     */
    public static getBaseUrl() {
        if (ProjectConfig.server_type === 1) {
            // 开发环境
            return "http://dev-api1.leigod.com";
        } else if (ProjectConfig.server_type === 2) {
            // 测试环境
            return "http://test-api2.leigod.com";
        } else if (ProjectConfig.server_type === 3) {
            // 生产环境
            if(LocalStorageUtil.getRegionCodes() == Util.REGION_CODE_0) {
                return "https://webhkapi.leigod.com";
            }else {
                return "https://webapi.leigod.com";
            }
        }else if (ProjectConfig.server_type === 4) {
            // 验证环境
            if(LocalStorageUtil.getRegionCodes() == Util.REGION_CODE_0) {
                return "https://vf-hkapi1.leigod.com";
            }else {
                return "https://vf-webapi.leigod.com";
            }
        } else {
            return '';
        }
    }

    /**
     *  图片服务器路径imgurl
     */
    public static getImgBaseUrl() {
        if (ProjectConfig.server_type === 1) {
            // 开发环境
            return "http://dev-picture.leigod.com";
        } else if (ProjectConfig.server_type === 2) {
            // 测试环境
            return "http://test-picture.leigod.com";
        } else if (ProjectConfig.server_type === 3) {
            // 生产环境
            return "https://picture.leigod.com";
        }else if (ProjectConfig.server_type === 4) {
            // 验证环境
            return "http://vf-picture.leigod.com";
        } else {
            return '';
        }
    }

    /**
     *  官网路径
     */
    public static getWebBaseUrl() {
        if (ProjectConfig.server_type === 1) {
            // 开发环境
            return "http://dev-www.leigod.com";
            // return 'http://localhost:8080';
        } else if (ProjectConfig.server_type === 2) {
            // 测试环境
            return "http://test-www.leigod.com";
        } else if (ProjectConfig.server_type === 3) {
            // 生产环境
            return "https://www.leigod.com";
        }else if (ProjectConfig.server_type === 4) {
            // 验证环境
            return "https://vf-www.leigod.com";
        } else {
            return '';
        }
    }

    /**
     *  跳转去下载站
     */
    public static goTodownUrl() {
        if (ProjectConfig.server_type === 1) {
            // 开发环境
            return "http://dev-xiazai.leigod.com/";
            // return 'http://localhost:8080';
        } else if (ProjectConfig.server_type === 2) {
            // 测试环境
            return "http://test-xiazai.leigod.com";
        } else if (ProjectConfig.server_type === 3) {
            // 生产环境
            return "https://xiazai.leigod.com/";
        }else if (ProjectConfig.server_type === 4) {
            // 验证环境
            return "https://vf-xiazai.leigod.com/";
        } else {
            return '';
        }
    }

    /**
     * 用户中心路径
     */
    public static getUserBaseUrl() {
        if (ProjectConfig.server_type === 1) {
            // 开发环境
            return "http://dev-user.leigod.com";
        } else if (ProjectConfig.server_type === 2) {
            // 测试环境
            return "http://test-user.leigod.com";
        } else if (ProjectConfig.server_type === 3) {
            // 生产环境
            return "https://user.leigod.com";
        }else if (ProjectConfig.server_type === 4) {
            // 验证环境
            return "https://vf-user.leigod.com";
        } else {
            const origin = window.location.origin;
            return origin;
        }
    }

    /**
     * config地址
     */
    public static getStafUrl() {
        if (ProjectConfig.server_type === 1) {
            // 开发环境
            return "http://dev-api1.leigod.com";
        } else if (ProjectConfig.server_type === 2) {
            // 测试环境
            return "http://test-api2.leigod.com";
        } else if (ProjectConfig.server_type === 3) {
            // 生产环境
            return "https://staffapi.leigod.com";
        }else if (ProjectConfig.server_type === 4) {
            // 验证环境
            return "https://vf-staffapi.leigod.com";
        } else {
            return '';
        }
    }

    /**
     * m路径
     */
    public static getMobWebBaseUrl() {
        if (ProjectConfig.server_type === 1) {
            // 开发环境
            return 'https://dev-m.leigod.com';
        } else if (ProjectConfig.server_type === 2) {
            // 测试环境
            return 'https://test-m.leigod.com';
        } else if (ProjectConfig.server_type === 3) {
            // 生产环境
            return 'https://m.leigod.com';
        } else if (ProjectConfig.server_type === 4) {
            // 验证环境
            return 'https://vf-m.leigod.com';
        } else {
            return '';
        }
    }

    /**
     * 输出
     */
    public static log(...args:any[]) {
        if(ProjectConfig.isDebug) {
            for(let i= 0;i < args.length;i++) {
                console.log(args[i]);
            }
        }
    }
}
