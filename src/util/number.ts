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