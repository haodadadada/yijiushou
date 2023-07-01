const dateFormat = (date, format) => {
	var time = new Date(date * 1000);
	var y = time.getFullYear();
	var month = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	month = month < 10 ? ('0' + month) : month;
	m = m < 10 ? ('0' + m) : m;
	d = d < 10 ? ('0' + d) : d;
	s = s < 10 ? ('0' + s) : s;
	if (format == 'y-m') {
		return `${y}年${month}月`
	} else if (format == 'y-m-d') {
		return `${y}-${month}-${d}`
	} else {
		return `${y}-${month}-${d} ${h}:${m}:${s}`
	}
}

export {
	dateFormat
}
