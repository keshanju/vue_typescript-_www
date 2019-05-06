/**
 *
 */
export default class ProjectConfig {
    /**
     * debug模式
     */
    public static isDebug = false;
    /**
     * 1开发环境 2测试 3生产 4预发布
     */
    public static server_type = parseInt(process.env.VUE_APP_SERVER_TYPE);

    /**
     * 输出
     */
    public static log(...args: any[]) {
        if (ProjectConfig.server_type != 3) {
            for (let i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
        }
    }

    /**
     * 命令列表
     */
    ////////////////////////////【bohe】////////////////////////
    // 薄荷调试 npm run bohe-debug
    // 薄荷开发打包 npm run bohe-dev
    // 薄荷测试打包 npm run bohe-test
    // 薄荷验证打包 npm run bohe-vfbuild
    // 薄荷生产打包 npm run bohe-tbuild

    // 薄荷app调试 npm run bohe_app-debug
    // 薄荷app开发打包 npm run bohe_app-dev
    // 薄荷app测试打包 npm run bohe_app-test
    // 薄荷app验证打包 npm run bohe_app-vfbuild
    // 薄荷app生产打包 npm run bohe_app-tbuild

    ////////////////////////////【leishen】////////////////////////
    // 雷神调试 npm run leishen-debug
    // 雷神开发打包 npm run leishen-dev
    // 雷神验证打包 npm run leishen-vfbuild
    // 雷神生产打包 npm run leishen-tbuild

    // 雷神user调试 npm run leishen_user-debug
    // 雷神user开发打包 npm run leishen_user-dev
    // 雷神user验证打包 npm run leishen_user-vfbuild
    // 雷神user生产打包 npm run leishen_user-tbuild

    // 雷神app调试 npm run leishen_app-debug
    // 雷神app开发打包 npm run leishen_app-dev
    // 雷神app验证打包 npm run leishen_app-vfbuild
    // 雷神app生产打包 npm run leishen_app-tbuild

    // 雷神pc调试 npm run leishen_pc-debug
    // 雷神pc开发打包 npm run leishen_pc-dev
    // 雷神pc验证打包 npm run leishen_pc-vfbuild
    // 雷神pc生产打包 npm run leishen_pc-tbuild

    // 雷神wangba调试 npm run leishen_wangba-debug
    // 雷神wangba开发打包 npm run leishen_wangba-dev
    // 雷神wangba验证打包 npm run leishen_wangba-vfbuild
    // 雷神wangba生产打包 npm run leishen_wangba-tbuild
}
ProjectConfig.log('当前环境:' + ProjectConfig.server_type + "【1开发环境 2测试 3生产 4预发布】");