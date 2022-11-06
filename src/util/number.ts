export function humanNumber(number?: number) {
	if (!number) return '';
	if (number > 1000 * 1000) {
		return (number / 1000 / 1000).toFixed(2) + ' M';
	}

	if (number > 1000) {
		return (number / 1000).toFixed(2) + ' K';
	}

	return number;
}

function pad(number: number) {
	return ('0' + number).slice(-2);
}

/*
* 格式化时间  毫秒 => 秒
* */
export function formatDuration(duration: number){
	let minutes = Math.floor(duration / 1000 / 60);
	let second = Math.floor(duration / 1000 - minutes * 60);
	return `${pad(minutes)}:${pad(second)}`;
}


export function getAge(birthday: number) {
	//出生时间 毫秒
	const birthDayTime = new Date(birthday).getTime();
	//当前时间 毫秒
	const nowTime = new Date().getTime();
	//一年毫秒数(365 * 86400000 = 31536000000)
	return Math.ceil((nowTime-birthDayTime)/31536000000);
}
