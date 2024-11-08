/*
 * @Author: Heath
 * @Date: 2022-10-18 09:44:44
 * @Last Modified by: xisen.he
 * @Last Modified time: 2024-11-08 15:41:30
 * @content what is the content of this file. */

const errorCode: { [index: string]: string } = {
	//1** token 相关
	"100": "token 不存在",
	"101": "登录状态已过期",
	"102": "token 不合法",
	"103": "请不要重复操作", // 重复操作接口，执行时间较长，拒绝再次请求
	"104": "用户名密码不匹配",
	"106": "您的操作过于频繁，请稍后再试",
};

export default errorCode;
