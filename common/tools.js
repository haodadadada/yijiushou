import http from "./http.js"
// 判断数据是否为空
const isEmpty = (obj, desc) => {
	if (typeof obj == "undefined" || obj == null || obj == "") {
		if (desc) {
			toast(desc)
		}
		return false;
	} else {
		return true;
	}
}

// 判断数据是否为空 并弹窗提示
const isEmptyToast = (array) => {
	array.some(item => {
		if (typeof item.data == "undefined" || item.data == null || item.data == "") {
			toast(item.title)
			return false;
		} else {
			return true;
		}
	})
}

// 验证手机号
const verifyTelPhone = (param) => {
	if (param == '') {
		toast('请输入手机号码')
		return false
	} else if (!(/^1[3456789]\d{9}$/.test(param))) {
		toast('请输入正确的手机号码')
		console.log(param)
		return false
	} else {
		return true
	}
}

// 验证验证码号	code 判断是否为6位
const verifyCode = (param) => {
	if (param == '' || param.length != 6) {
		toast('请输入正确的验证码')
		return false
	} else {
		return true
	}
}

// 验证密码
const verifyPassword = (param) => {
	if (param.length < 6 || param.length > 12) {
		toast('请输入6-12位密码')
		return false
	} else {
		return true
	}
}

// 验证姓名 2-5个字符
const verifyName = (param) => {
	if (param.length < 1) {
		toast('姓名不能少于1个字')
		return false
	} else {
		return true
	}
}

// 验证地址
const verifyAddress = (param) => {
	if (param.length < 5) {
		toast('详细地址不能少于5个字')
		return false
	} else {
		return true
	}
}

/* 
 弹窗提示	
 title 弹出信息
 icon	 图标样式	默认为空
 */
const toast = (title, icon) => {
	uni.showToast({
		title,
		icon: icon || 'none'
	})
}

/* 
 身份证验证
 */
const verifyIDcard = code => {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var tip = "";
	var pass = true;
	if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		tip = "身份证号格式错误";
		pass = false;
	} else if (!city[code.substr(0, 2)]) {
		tip = "地址编码错误";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if (code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if (parity[sum % 11] != code[17]) {
				tip = "校验位错误";
				pass = false;
			}
		}
	}
	return pass;
}

/* 
 数组去重
 */ 
const unique = data =>{
	return Array.from(new Set(data))
}

/* 
 baseUrl
 */ 
const baseUrl = http.BASE_URL
export default{
	baseUrl,
	isEmpty, // 判断是否为空
	isEmptyToast, // 判断数据是否为空 并弹窗提示
	verifyTelPhone, // 验证手机号
	verifyCode, // 验证验证码
	verifyPassword, // 验证密码
	verifyName, // 验证姓名
	verifyAddress, // 验证地址
	toast, // 弹窗
	verifyIDcard,	//验证身份证
	unique,	//数组去重
}
