const userid = 510641053;
const url = `https://api.twitch.tv/helix/streams?user_id=${userid}`;
const token = "29u6bhty2ndrpcj29sfj4slddl4m4z";
const ClientId = "w6cp33v89t3d1en98ygrd8kx53krwn";
const headers = {
	'Authorization' : `Bearer ${token}`,
	'Client-Id' : ClientId
}

const info = document.getElementById('info');
const bodys = document.getElementById('body');

const cb = function (json){
	info.innerHTML = json.data.length ? `${json.data[0]['user_name']} est en live sur ${json.data[0]['game_name']} avec ${json.data[0]['viewer_count']} viewers !` : "DevGirl_ est hors ligne !"
	bodys.style.backgroundColor = json.data.length ? "green" : "red";
}

function fetchTwitchAPI(url, headers, cb){
	return fetch(url, {
		headers: headers
	}).then((response) => {
		return response.json();
	}).then((json) => cb(json));
}

fetchTwitchAPI(url, headers, cb);