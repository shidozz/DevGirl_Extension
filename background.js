let userId = 510641053;
let url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
let token = "29u6bhty2ndrpcj29sfj4slddl4m4z";
let ClientId = "w6cp33v89t3d1en98ygrd8kx53krwn";
let headers = {
	'Authorization' : `Bearer ${token}`,
	'Client-Id' : ClientId
}




let liveIsOn = false;

let cb = function (json){
	if(json.data.length && !liveIsOn){
		chrome.notifications.create('LiveOn', {
			title: `${json.data[0]['game_name']}`,
			message: `${json.data[0]['user_name']}`,
			iconUrl: "img/icon_on_live.png",
			type: "basic"
		});
		setIcon("img/icon_on_live.png");
		
		liveIsOn = true;
	}else{
		setIcon("img/icon_off_live.png");
		liveIsOn = false;
	}
}

function fetchTwitchAPI(url, headers, cb){
	fetch(url, {
		headers: headers
	}).then((response) => {
		return response.json();
	}).then((json) => cb(json));
}

function setIcon(path){
	chrome.action.setIcon({path: path})
}

fetchTwitchAPI(url, headers, cb);

chrome.notifications.onClicked.addListener(() => {
	chrome.tabs.create({
		url: "https://www.twitch.tv/DevGirl_"
	})
})

chrome.alarms.create({
	periodInMinutes: 1
})
chrome.alarms.onAlarm.addListener(() => {
	fetchTwitchAPI(url, headers, cb);
})
delete(userId);
delete(url);
delete(token);
delete(liveIsOn);
delete(ClientId);
delete(headers);
delete(cb);