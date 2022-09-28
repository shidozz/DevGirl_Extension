let userids = 510641053;
let urls = `https://api.twitch.tv/helix/streams?user_id=${userids}`;
let tokens = "29u6bhty2ndrpcj29sfj4slddl4m4z";
let ClientIds = "w6cp33v89t3d1en98ygrd8kx53krwn";
let headerss = {
	'Authorization' : `Bearer ${tokens}`,
	'Client-Id' : ClientIds
}

let info = document.getElementById('info');
let bodys = document.getElementById('body');

let cbs = function (json){
	info.innerHTML = json.data.length ? `${json.data[0]['user_name']} est en live sur ${json.data[0]['game_name']} avec ${json.data[0]['viewer_count']} viewers !` : "DevGirl_ est hors ligne !"
	bodys.style.backgroundColor = json.data.length ? "green" : "red";
}

function fetchTwitchAPI(urls, headerss, cbs){
	return fetch(urls, {
		headers: headerss
	}).then((response) => {
		return response.json();
	}).then((json) => cbs(json));
}

fetchTwitchAPI(urls, headerss, cbs);

delete(userids);
delete(urls);
delete(tokens);
delete(ClientIds);
delete(headerss);
delete(cbs);
delete(bodys);
delete(info);