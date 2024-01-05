export function cookieExists(str){
	const value = `; ${document.cookie}`;
	const parts = value.split(`; `);
	let found = false;
	parts.forEach((element) => {
		if(element.split('=')[0] == str){	
			
			found = true;
		}
	});
	return found;
}
export function getCookieValue(str){
	const value = `; ${document.cookie}`;
	const parts = value.split(`; `);
	let res = "";
	parts.forEach((element) => {
		let elemval = element.split('=');
		if(elemval[0] == str){	
			res = elemval[1];
		}
	});
	return res;
}

export function getUTCTimeDur(dur_s)
{
    // later find better trick for that?
    let time = new Date();
    time.setTime(time.getTime()+dur_s*1000);
    time.toUTCString();
    return time;
}

export function setCookie(key, value, expiration_s){
	if(expiration_s == undefined){
		let string = key + "=" + value + ";SameSite=strict";
		document.cookie = string;
		return;
	}
	let string = key + "=" + value + ";expires=" + getUTCTimeDur(expiration_s).toUTCString() + ";SameSite=strict";
	document.cookie = string;
}