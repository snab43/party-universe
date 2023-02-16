// =============================================================
// main.js
// -------------------------------------------------------------
// This is where the heart of the game lies.
// =============================================================


// =============================================================
// Utility functions
// -------------------------------------------------------------
function getTimestamp(militaryTime) {
	return new Date().toLocaleTimeString('en-US', {hour12: !militaryTime}); // 12:12:12 AM
}

function getHourMinuteTimeStamp(militaryTime) {
	date = new Date();

	var hours = date.getHours();
	var minutes = date.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	
	if (militaryTime) {
		var strTime = hours + ':' + minutes;
	} else {
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // The hour '0' should be '12'
		var strTime = hours + ':' + minutes + ' ' + ampm;
	}

	return strTime;
}

function getWeekday() {
	return new Date().toLocaleString('en-us', {weekday: 'long'});
}

function getHiddenStatsInConsole() {
	console.log("Lit: " + gameData.lit + ", Swag: " + gameData.swag + ", Pull: " + gameData.pull + ", Karma: " + gameData.karma + ", Luck: " + gameData.luck + ", Rent Timer: " + gameData.rentTimer + ", Total Money: " + gameData.totalMoney);
}
// =============================================================


// =============================================================
// Action functions
// -------------------------------------------------------------
function sendAText() {
	var textCost = 0.25;

	// Party at capacity
	if (gameData.party >= gameData.partyCapacity) {
		updateTextMessage(chance.name(), noRoomList[Math.floor(Math.random()*noRoomList.length)], "reject");
	// Money check
	} else if (gameData.money >= textCost) {
		gameData.money -= textCost;
		
		// Success calculation
		var chanceOfSuccess = (gameData.clout*50 - gameData.doorFee)/100;
		if (chanceOfSuccess < 0) chanceOfSuccess = 0;
		if (gameData.doorFee <= 0) chanceOfSuccess = 0.5;
		
		// Debug
		console.log("Chance of success: " + chanceOfSuccess*100 + "%");
		
		if (chanceOfSuccess >= Math.random()) {
			gameData.party += 1;
			gameData.money += gameData.doorFee;
			gameData.totalMoney += gameData.doorFee;
			updateTextMessage(chance.name(), acceptanceList[Math.floor(Math.random()*acceptanceList.length)], "accept");
		// Unsuccessful invite
		} else {
			updateTextMessage(chance.name(), rejectionList[Math.floor(Math.random()*rejectionList.length)], "reject");
		}
	} else {
		console.log("Not enough money but button has been clicked somehow?");
	}
	
	updateStatDisplay();
}

function doorFee (amount) {
	gameData.doorFee += amount;
	if (gameData.doorFee <= 0) gameData.doorFee = 0;
	updateStatDisplay();
}

function digForChange() {
	var change = Math.random() * 0.20;
	gameData.money += change;
	gameData.totalMoney += change;
	updateStatDisplay();
}

function kickSomeoneOut() {
	if (gameData.party > 1) {
		gameData.party -= 1;
		updateTextMessage(chance.name(), kickedOutList[Math.floor(Math.random()*kickedOutList.length)], "reject");
		updateStatDisplay();
	}
}

function submitPost() {
	updateFriendSpaceFeed("You", "The Party", document.getElementById("statusUpdate").value);
	document.getElementById("statusUpdate").value = "";
}
// =============================================================


// =============================================================
// Buy functions
// -------------------------------------------------------------
function buySupplies(id) {
	var totalCost = gameInfo.supplies[id].cost * gameData.supplies[id].costMod;

	if (gameData.money >= totalCost) {
		gameData.money -= totalCost;
		gameData.supplies[id].amount += 1 * gameData.supplies[id].amountMod;
	} else {
		console.log("ERR: Attempted to purchase item with insufficient funds");
		updateTextMessage("Developer", "Are you hacking?!", "key");
	}
	
	updateStatDisplay();
}

function buyAlcohol(id) {
	var totalCost = gameData.alcohol[id].cost * gameInfo.alcohol[id].costMod;
	
	if (gameData.money >= totalCost) {
		gameData.money -= totalCost;
		gameData.alcohol[id].amount += 1 * gameData.alcohol[id].amountMod;
	} else {
		console.log("ERR: Attempted to purchase item with insufficient funds");
		updateTextMessage("Developer", "Are you hacking?!", "key");
	}
	
	updateStatDisplay();
}

function buyPromotions(id) {
	var totalCost = gameData.promotions[id].cost * gameInfo.promotions[id].costMod;
	
	if (gameData.money >= totalCost) {
		gameData.money -= totalCost;
		gameData.promotions[id].amount += 1 * gameData.promotions[id].amountMod;
	} else {
		console.log("ERR: Attempted to purchase item with insufficient funds");
		updateTextMessage("Developer", "Are you hacking?!", "key");
	}
	
	updateStatDisplay();
}

function buyVenues(id) {
	var totalCost = gameData.venues[id].cost * gameInfo.venues[id].costMod;
	
	if (gameData.money >= totalCost) {
		gameData.money -= totalCost;
		gameData.venues[id].amount += 1 * gameData.venues[id].amountMod;
	} else {
		console.log("ERR: Attempted to purchase item with insufficient funds");
		updateTextMessage("Developer", "Are you hacking?!", "key");
	}
	
	updateStatDisplay();
}
// =============================================================


// =============================================================
// Messages/FriendSpace functions
// -------------------------------------------------------------
function updateTextMessage(name, message, type) {
	var newItem = document.createElement("LI");
	
	switch (type) {
		case "key": newItem.id = "keyMessage"; break;
		case "accept": newItem.id = "acceptanceMessage"; break;
		case "reject": newItem.id = "rejectionMessage"; break;
		default: newItem.id = "defaultMessage"; break;
	}
	
	newItem.innerHTML = "<b>" + name + "</b></br>" + message + "</br><small>" + getTimestamp(gameData.militaryTime) + " &#8226; SMS";
	var list = document.getElementById("textMessages");
	list.insertBefore(newItem, list.childNodes[0]);
}

function updateFriendSpaceFeed(name, locationFrom, message) {
	var newItem = document.createElement("LI");
	newItem.innerHTML = "<b>" + name + "</b></br><small>" + getTimestamp(gameData.militaryTime) + " &#8226; " + locationFrom + "</small></br>" + message + "</br><small>Like &#8226; Comment &#8226; Share";
	var list = document.getElementById("friendSpaceFeed");
	list.insertBefore(newItem, list.childNodes[0]);
}
// =============================================================


// =============================================================
// Main Game Loop
// -------------------------------------------------------------
var mainGameLoop = window.setInterval(function() {
	updateStatDisplay();
	randomEvents();
}, 1000)
// =============================================================


// =============================================================
// Update functions
// -------------------------------------------------------------
function updateStatDisplay() {
	updateButtons();
	updateClout();
	
	document.getElementById("party").innerHTML = gameData.party + "/" + gameData.partyCapacity + " Attendees";
	document.getElementById("money").innerHTML = "Money: $" + gameData.money.toFixed(2);
	document.getElementById("clout").innerHTML = "Clout: " + gameData.clout.toFixed(2) + "%";
	document.getElementById("doorFee").innerHTML = "Door Fee: $" + gameData.doorFee.toFixed(2);
	document.getElementById("clock").innerHTML = getHourMinuteTimeStamp(gameData.militaryTime);
}

function updateButtons() {
	// -------------------------------------------------------------
	// List generators
	// -------------------------------------------------------------
	var percentToReveal = 0.5; // What percentage of totalMoney to reveal an item.
	
	// Generate Supply List
	var supplyList = document.getElementById("suppliesList");
	supplyList.innerHTML = "";
	for (i = gameInfo.FSUPPLY; i <= gameInfo.LSUPPLY; i++) {
		var info = gameInfo.supplies[i];
		var data = gameData.supplies[i];
		
		if (i == 100 || gameData.totalMoney > info.cost * percentToReveal) {
			var newItem = document.createElement("DIV");
			newItem.innerHTML = '<span id="' + info.id + '">' + data.amount + ' ' + info.name +
				'</span> <button onclick="buySupplies(' + i + ')">Buy ($' + info.cost * data.costMod + ')</button></br>';
			
			supplyList.appendChild(newItem);
			
			if (gameData.money < info.cost) newItem.lastChild.previousSibling.disabled = true;
			else newItem.lastChild.previousSibling.disabled = false;
		}
	}
	
	// Generate Alcohol List
	var alcoholList = document.getElementById("alcoholList");
	alcoholList.innerHTML = "";
	for (i = gameInfo.FALCOHOL; i <= gameInfo.LALCOHOL; i++) {
		var info = gameInfo.alcohol[i];
		var data = gameData.alcohol[i];
		
		if (i == 200 || gameData.totalMoney > info.cost * percentToReveal) {
			var newItem = document.createElement("DIV");
			newItem.innerHTML = '<span id="' + info.id + '">' + data.amount + ' ' + info.name +
				'</span> <button onclick="buyAlcohol(' + i + ')">Buy ($' + info.cost * data.costMod + ')</button></br>';
			
			alcoholList.appendChild(newItem);
			
			if (gameData.money < info.cost) newItem.lastChild.previousSibling.disabled = true;
			else newItem.lastChild.previousSibling.disabled = false;
		}
	}
	
	// Generate Promotions List
	var promotionsList = document.getElementById("promotionsList");
	promotionsList.innerHTML = "";
	for (i = gameInfo.FPROMO; i <= gameInfo.LPROMO; i++) {
		var info = gameInfo.promotions[i];
		var data = gameData.promotions[i];
		
		if (i == 300 || gameData.totalMoney > info.cost * percentToReveal) {
			var newItem = document.createElement("DIV");
			newItem.innerHTML = '<span id="' + info.id + '">' + data.amount + ' ' + info.name +
				'</span> <button onclick="buyPromotions(' + i + ')">Buy ($' + info.cost * data.costMod + ')</button></br>';
			
			promotionsList.appendChild(newItem);
			
			if (gameData.money < info.cost) newItem.lastChild.previousSibling.disabled = true;
			else newItem.lastChild.previousSibling.disabled = false;
		}
	}
	
	// Generate Venues List
	var venuesList = document.getElementById("venuesList");
	venuesList.innerHTML = "";
	for (i = gameInfo.FVENUE; i <= gameInfo.LVENUE; i++) {
		var info = gameInfo.venues[i];
		var data = gameData.venues[i];
		
		if (i == 400 || gameData.totalMoney > info.cost * percentToReveal) {
			var newItem = document.createElement("DIV");
			newItem.innerHTML = '<span id="' + info.id + '">' + data.amount + ' ' + info.name +
				'</span> <button onclick="buyVenues(' + i + ')">Buy ($' + info.cost * data.costMod + ')</button></br>';
			
			venuesList.appendChild(newItem);
			
			if (gameData.money < info.cost) newItem.lastChild.previousSibling.disabled = true;
			else newItem.lastChild.previousSibling.disabled = false;
		}
	}
	
	
	// -------------------------------------------------------------
	// Button disables
	// -------------------------------------------------------------
	if (gameData.doorFee <= 0) document.getElementById("doorFeeDown").disabled = true;
	else document.getElementById("doorFeeDown").disabled = false;
		
	if (gameData.party <= 1) document.getElementById("kickSomeoneOut").disabled = true;
	else document.getElementById("kickSomeoneOut").disabled = false;
	
	if (gameData.money < 0.25) document.getElementById("sendAText").disabled = true;
	else document.getElementById("sendAText").disabled = false;
}

function updateClout() {
	// Clout is: 50% party size (max 1,000,000), 25% money saved (max $10,000,000), 25% lit/swag balance,
	// There's also a slight bend to it so it's not so linear.
	var partySizeCalc = (gameData.party - 1)/1000000*0.5; // Result: 0 - 0.5
	var moneySavedCalc = gameData.money/10000000*0.25; // Result: 0 - 0.25
	var litSwagBalanceCalc = Math.abs(gameData.lit/1000 - gameData.swag/1000) * 0.25; // Result: 0 - 0.25
	
	var total = partySizeCalc + moneySavedCalc + litSwagBalanceCalc; // Result: 0 - 1
	
	// Bend the results
	var bendFactor = 0.5; // Between 0 - 1. The smaller the number, the stricter the bend (faster start, slow end)
	var calculation = -Math.pow((Math.pow(total, bendFactor) - 1), 2) + 1;	// Result 0 -1
	gameData.clout = calculation*100;
}
// =============================================================


// =============================================================
// Data Management
// -------------------------------------------------------------
// Load game on page load
var gameSave = JSON.parse(localStorage.getItem("partyUniverseSave"));
if (gameSave !== null) {
	gameData = gameSave
	updateTextMessage(chance.phone(), keyList[1], "key");
} else {
	// New game
	updateTextMessage(chance.phone(), keyList[0], "key");
}
updateStatDisplay();


function loadGame() {
	location.reload();
}

function saveGame() {
	localStorage.setItem("partyUniverseSave", JSON.stringify(gameData))
}

// Autosave every 15 seconds
var saveGameLoop = window.setInterval(function() {
	saveGame();
}, 15000)

// Delete save
function deleteSave() {
	localStorage.removeItem("partyUniverseSave");
	loadGame();
}
// =============================================================