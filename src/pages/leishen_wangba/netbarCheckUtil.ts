export default class netbarCheckUtil {
  /**
   * 验证IP
   */
  public static checkIP(IP: string) {
    let IpReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (IpReg.test(IP)) {
      //ip格式正确
      return true;
    } else {
      //ip格式不正确
      return false;
    }
  }
}
