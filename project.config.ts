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
	 public static server_type = 1;
	// public static server_type = 2;
	// public static server_type = 4;
	// public static server_type = 3;

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
	 * ###################################薄荷(bohe)项目打包命令
	 */
	//开发环境
	// cd dev/;npm run build;python3 py_bohe_meta.py;sh bohe.sh;cd ..;
	// cd dev/;npm run build;sh bohe_app.sh;cd ..;

	//测试环境
	// cd test/;npm run build;python3 py_bohe_meta.py;sh bohe.sh;cd ..;
	// cd test/;npm run build;sh bohe_app.sh;cd ..;

	//预发布
	// cd vfbuild/;npm run build;python3 py_bohe_meta.py;cd ..;
	// cd vfbuild/;npm run build;cd ..;

	//生产环境
	// cd tbuild/;npm run build;python3 py_bohe_meta.py;cd ..;
	// cd tbuild/;npm run build;cd ..;

	/**
	 * ###################################雷神(bohe)项目打包命令
	 */
	///////////开发环境
	//leishen
	// cd dev/;npm run build;python3 py_leishen_meta.py;sh leishen.sh;cd ..;
	//leishen_app
	// cd dev/;npm run build;sh leishen_app.sh;cd ..;
	//leishen_user
	// cd dev/;npm run build;sh leishen_user.sh;cd ..;
	//leishen_pc
	// cd dev/;npm run build;sh leishen_pc.sh;cd ..;

	//////////预发布
	//leishenta
	// cd vfbuild/;npm run build;python3 py_leishen_meta.py;cd ..;
	//leishen_app
	// cd vfbuild/;npm run build;cd ..;
	//leishen_user
	// cd vfbuild/;npm run build;cd..;
	//leishen_pc
	// cd vfbuild/;npm run build;cd ..;

    //////////生产
    //leishen
    // cd tbuild/;npm run build;python3 py_leishen_meta.py;cd ..;
    //leishen_app
    // cd tbuild/;npm run build;cd ..;
    //leishen_user
    // cd tbuild/;npm run build;cd ..;
    //leishen_pc
    // cd tbuild/;npm run build;cd ..;
}
