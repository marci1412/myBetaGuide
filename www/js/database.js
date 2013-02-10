//wait until Cordova is ready
document.addEventListener("deviceready", onDeviceReady, false);

//Now Corcova is ready
function onDeviceReady() {
	//var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	//db.transaction(populateDB, errorCB, successCB);
}

// Populate the database
function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS CONTENTS');
	tx.executeSql('CREATE TABLE IF NOT EXISTS CONTENTS (title unique, subtitle, language, content)');
	//tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
	//tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

//Call if new row for Content Database
function insertRowToContent(title, subtitle, language, content) {
	db.transaction(insertDBContent(title, subtitle, language, content),errorCB, successCB);
}

//Called, when insertion
function insertDBContent(tx, title, subtitle, language, content) {
	tx.executeSql('INSERT INTO CONTENT (title, subtitle, language, content) VALUES ('+title+', '+subtitle+', '+language+', '+content+')');
}

// Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
function successCB() {
	alert("success!");
}