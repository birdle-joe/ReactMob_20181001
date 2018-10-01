// 是否本地开发或者uac统一认证登陆
export const IBizEnvironment = {
    LocalDeve: false,   //  是否本地开发
    UacAuth: false,   // 是否启用UAC认证 
    BaseUrl: '..',   // 应用基础路径
    AppName: 'WeChat',
    RemoteLogin: '/api/login',    //  远程登录地址，本地开发调试使用
    LoginRedirect: '/wechat/ibizutil/login.html',  // session失效后后台登陆重定向
    AppLogin: '/wechat/ibizutil/login.do',  // 登陆地址，session、权限等管理
    Logout: '/wechat/ibizutil/logout',  // 退出登录，注销session
    InitSystemEnv: '/wechat/ibizutil/initsystemenv.do',  // 初始化系统，超级管理员账号等
    InstallRTData: '/wechat/ibizutil/installrtdata.do',  // 安装系统环境数据
    PDFPrint: '/wechat/ibizutil/print.pdf',  // PDF文件打印
    PDFReport: '/wechat/ibizutil/report.pdf',  // PDF报表文件
    ExportFile: '/wechat/ibizutil/exportfile',   // 文件导出 
    ExportFile2: '/wechat/ibizutil/exportfile2',   // 文件导出 
    ExportFile3: '/wechat/ibizutil/exportfile3',   // 文件导出 
    UploadFile: '/wechat/ibizutil/uploadfile.do',   // 文件上传 
    ExportExcel: '/wechat/ibizutil/exportexcel',   // 导出实体数据导入模板
    UploadDEData: '/wechat/ibizutil/uploaddedata.do',   // 文件上传
};