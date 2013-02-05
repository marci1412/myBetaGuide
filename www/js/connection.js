//add Listener for checking internet connectivity
document.addEventListener("deviceready", onDeviceReady, false);

document.addEventListener("online", onOnline, false);
document.addEventListener("offline", onOffline, false);

var online = false;//True if internet connectivity, else false

//call if internet is available again
function onOnline() {
	setOnlineStatus(true);
}

//call if disconnected
function onOffline() {
	setOnlineStatus(false);
}

//call on system start
function onDeviceReady() {
	checkConnection();
}

//call when system is ready
function checkConnection() {
	var networkState = navigator.network.connection.type;
	
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	
	if(states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection') {//if no or unknown connection
		setOnlineStatus(false);//set connectivity to false
	} else {
		setOnlineStatus(true);//set connectivity to true
	}
}

//return status of internet connectivity
function getOnlineStatus() {
	return online;
}

//set status of internet connectivity
function setOnlineStatus(bool) {
	online = bool;
}