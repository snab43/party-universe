"use strict";
// =============================================================
// app.ts
// -------------------------------------------------------------
// This is where the heart of the game lies.
// =============================================================
// =============================================================
// Utility functions
// -------------------------------------------------------------
function getTimestamp(militaryTime) {
    return new Date().toLocaleTimeString('en-US', { hour12: !militaryTime }); // 12:12:12 AM
}
function getHourMinuteTimeStamp(militaryTime) {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime;
    if (militaryTime) {
        strTime = hours + ':' + minutes;
    }
    else {
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        strTime = hours + ':' + minutes + ' ' + ampm;
    }
    return strTime;
}
function getWeekday() {
    return new Date().toLocaleString('en-us', { weekday: 'long' });
}
function getHiddenStatsInConsole() {
    console.log(`
		Lit: ${gameDataStats.lit}
		Swag: ${gameDataStats.swag}
		Pull: ${gameDataStats.pull}
		Karma: ${gameDataStats.karma}
		Luck: ${gameDataStats.luck}
		Rent Timer: ${gameDataStats.rentTimer}
		Total Money: ${gameDataStats.totalMoney}
	`);
}
// =============================================================
// =============================================================
// Action functions
// -------------------------------------------------------------
function sendAText() {
    let textCost = 0.25;
    // Party at capacity
    if (gameDataStats.party >= gameDataStats.partyCapacity) {
        updateTextMessage(chance.name(), DIALOGUE_NO_ROOM[Math.floor(Math.random() * DIALOGUE_NO_ROOM.length)], "reject");
        // Money check
    }
    else if (gameDataStats.money >= textCost) {
        gameDataStats.money -= textCost;
        // Success calculation
        let chanceOfSuccess = (gameDataStats.clout * 50 - gameDataStats.doorFee) / 100;
        if (chanceOfSuccess < 0)
            chanceOfSuccess = 0;
        if (gameDataStats.doorFee <= 0)
            chanceOfSuccess = 0.5;
        // Debug
        console.log("Chance of success: " + chanceOfSuccess * 100 + "%");
        if (chanceOfSuccess >= Math.random()) {
            gameDataStats.party += 1;
            gameDataStats.money += gameDataStats.doorFee;
            gameDataStats.totalMoney += gameDataStats.doorFee;
            updateTextMessage(chance.name(), DIALOGUE_ACCEPTANCE[Math.floor(Math.random() * DIALOGUE_ACCEPTANCE.length)], "accept");
            // Unsuccessful invite
        }
        else {
            updateTextMessage(chance.name(), DIALOGUE_REJECTION[Math.floor(Math.random() * DIALOGUE_REJECTION.length)], "reject");
        }
    }
    else {
        console.log("Not enough money but button has been clicked somehow?");
    }
    updateStatDisplay();
}
function doorFee(amount) {
    gameDataStats.doorFee += amount;
    if (gameDataStats.doorFee <= 0)
        gameDataStats.doorFee = 0;
    updateStatDisplay();
}
function digForChange() {
    let change = Math.random() * 0.20;
    gameDataStats.money += change;
    gameDataStats.totalMoney += change;
    updateStatDisplay();
}
function kickSomeoneOut() {
    if (gameDataStats.party > 1) {
        gameDataStats.party -= 1;
        updateTextMessage(chance.name(), DIALOGUE_KICKED_OUT[Math.floor(Math.random() * DIALOGUE_KICKED_OUT.length)], "reject");
        updateStatDisplay();
    }
}
function submitPost() {
    let statusUpdate = document.getElementById("statusUpdate");
    if (statusUpdate.value) {
        updateFriendSpaceFeed("You", "The Party", statusUpdate.value);
        statusUpdate.value = "";
    }
}
// =============================================================
// =============================================================
// Buy functions
// -------------------------------------------------------------
function buySupplies(id) {
    let totalCost = ITEM_STATS.supplies[id].cost * gameDataInventory.supplies[id].costMod;
    if (gameDataStats.money >= totalCost) {
        gameDataStats.money -= totalCost;
        gameDataInventory.supplies[id].amount += 1 * gameDataInventory.supplies[id].amountMod;
    }
    else {
        console.log("ERR: Attempted to purchase item with insufficient funds");
        updateTextMessage("Developer", "Are you hacking?!", "key");
    }
    updateStatDisplay();
}
function buyAlcohol(id) {
    let totalCost = ITEM_STATS.alcohol[id].cost * gameDataInventory.alcohol[id].costMod;
    if (gameDataStats.money >= totalCost) {
        gameDataStats.money -= totalCost;
        gameDataInventory.alcohol[id].amount += 1 * gameDataInventory.alcohol[id].amountMod;
    }
    else {
        console.log("ERR: Attempted to purchase item with insufficient funds");
        updateTextMessage("Developer", "Are you hacking?!", "key");
    }
    updateStatDisplay();
}
function buyPromotions(id) {
    let totalCost = ITEM_STATS.promotions[id].cost * gameDataInventory.promotions[id].costMod;
    if (gameDataStats.money >= totalCost) {
        gameDataStats.money -= totalCost;
        gameDataInventory.promotions[id].amount += 1 * gameDataInventory.promotions[id].amountMod;
    }
    else {
        console.log("ERR: Attempted to purchase item with insufficient funds");
        updateTextMessage("Developer", "Are you hacking?!", "key");
    }
    updateStatDisplay();
}
function buyVenues(id) {
    let totalCost = ITEM_STATS.venues[id].cost * gameDataInventory.venues[id].costMod;
    if (gameDataStats.money >= totalCost) {
        gameDataStats.money -= totalCost;
        gameDataInventory.venues[id].amount += 1 * gameDataInventory.venues[id].amountMod;
    }
    else {
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
    let newItem = document.createElement("LI");
    switch (type) {
        case "key":
            newItem.classList.add("keyMessage");
            break;
        case "accept":
            newItem.classList.add("acceptanceMessage");
            break;
        case "reject":
            newItem.classList.add("rejectionMessage");
            break;
        default:
            newItem.classList.add("defaultMessage");
            break;
    }
    newItem.innerHTML = `
		<b>${name}</b></br>
		<p>${message}</p>
		<small>${getTimestamp(gameDataSettings.militaryTime)} &#8226; SMS
	`;
    let list = document.getElementById("textMessages");
    list.insertBefore(newItem, list.childNodes[0]);
}
function updateFriendSpaceFeed(name, locationFrom, message) {
    let newItem = document.createElement("LI");
    newItem.innerHTML = `
		<b>${name}</b></br>
		<small>${getTimestamp(gameDataSettings.militaryTime)} &#8226; ${locationFrom}</small></br>
		<p>${message}</p>
		<small>Like &#8226; Comment &#8226; Share
	`;
    let list = document.getElementById("friendSpaceFeed");
    list.insertBefore(newItem, list.childNodes[0]);
}
// =============================================================
// =============================================================
// Main Game Loop
// -------------------------------------------------------------
let mainGameLoop = window.setInterval(function () {
    updateStatDisplay();
    randomEvents();
}, 1000);
// =============================================================
// =============================================================
// Update functions
// -------------------------------------------------------------
function updateStatDisplay() {
    updateButtons();
    updateClout();
    // Stats
    document.getElementById("party").innerHTML = gameDataStats.party + "/" + gameDataStats.partyCapacity + " Attendees";
    document.getElementById("money").innerHTML = "Money: $" + gameDataStats.money.toFixed(2);
    document.getElementById("clout").innerHTML = "Clout: " + gameDataStats.clout.toFixed(2) + "%";
    document.getElementById("doorFee").innerHTML = "Door Fee: $" + gameDataStats.doorFee.toFixed(2);
    // Time
    document.getElementById("notificationTime").innerHTML = getHourMinuteTimeStamp(gameDataSettings.militaryTime);
}
function updateButtons() {
    // -------------------------------------------------------------
    // List generators
    // -------------------------------------------------------------
    let percentToReveal = 0.5; // What percentage of totalMoney to reveal an item.
    // Generate Supply List
    let supplyList = document.getElementById("suppliesList");
    supplyList.innerHTML = "";
    for (let i = 100 /* ITEM_INFO.FSUPPLY */; i <= 107 /* ITEM_INFO.LSUPPLY */; i++) {
        let info = ITEM_STATS.supplies[i];
        let data = gameDataInventory.supplies[i];
        if (i == 100 || gameDataStats.totalMoney > info.cost * percentToReveal) {
            let newItem = document.createElement("DIV");
            newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
            supplyList.appendChild(newItem);
            if (gameDataStats.money < info.cost)
                newItem.lastChild.previousSibling.disabled = true;
            else
                newItem.lastChild.previousSibling.disabled = false;
        }
    }
    // Generate Alcohol List
    let alcoholList = document.getElementById("alcoholList");
    alcoholList.innerHTML = "";
    for (let i = 200 /* ITEM_INFO.FALCOHOL */; i <= 207 /* ITEM_INFO.LALCOHOL */; i++) {
        let info = ITEM_STATS.alcohol[i];
        let data = gameDataInventory.alcohol[i];
        if (i == 100 || gameDataStats.totalMoney > info.cost * percentToReveal) {
            let newItem = document.createElement("DIV");
            newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
            alcoholList.appendChild(newItem);
            if (gameDataStats.money < info.cost)
                newItem.lastChild.previousSibling.disabled = true;
            else
                newItem.lastChild.previousSibling.disabled = false;
        }
    }
    // Generate Promotions List
    let promotionsList = document.getElementById("promotionsList");
    promotionsList.innerHTML = "";
    for (let i = 300 /* ITEM_INFO.FPROMO */; i <= 305 /* ITEM_INFO.LPROMO */; i++) {
        let info = ITEM_STATS.promotions[i];
        let data = gameDataInventory.promotions[i];
        if (i == 100 || gameDataStats.totalMoney > info.cost * percentToReveal) {
            let newItem = document.createElement("DIV");
            newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
            promotionsList.appendChild(newItem);
            if (gameDataStats.money < info.cost)
                newItem.lastChild.previousSibling.disabled = true;
            else
                newItem.lastChild.previousSibling.disabled = false;
        }
    }
    // Generate Venues List
    let venuesList = document.getElementById("venuesList");
    venuesList.innerHTML = "";
    for (let i = 400 /* ITEM_INFO.FVENUE */; i <= 406 /* ITEM_INFO.LVENUE */; i++) {
        let info = ITEM_STATS.venues[i];
        let data = gameDataInventory.venues[i];
        if (i == 100 || gameDataStats.totalMoney > info.cost * percentToReveal) {
            let newItem = document.createElement("DIV");
            newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
            venuesList.appendChild(newItem);
            if (gameDataStats.money < info.cost)
                newItem.lastChild.previousSibling.disabled = true;
            else
                newItem.lastChild.previousSibling.disabled = false;
        }
    }
    // -------------------------------------------------------------
    // Button disables
    // -------------------------------------------------------------
    if (gameDataStats.doorFee <= 0)
        document.getElementById("doorFeeDown").disabled = true;
    else
        document.getElementById("doorFeeDown").disabled = false;
    if (gameDataStats.party <= 1)
        document.getElementById("kickSomeoneOut").disabled = true;
    else
        document.getElementById("kickSomeoneOut").disabled = false;
    if (gameDataStats.money < 0.25)
        document.getElementById("sendAText").disabled = true;
    else
        document.getElementById("sendAText").disabled = false;
}
function updateClout() {
    // Clout is: 50% party size (max 1,000,000), 25% money saved (max $10,000,000), 25% lit/swag balance,
    // There's also a slight bend to it so it's not so linear.
    let partySizeCalc = (gameDataStats.party - 1) / 1000000 * 0.5; // Result: 0 - 0.5
    let moneySavedCalc = gameDataStats.money / 10000000 * 0.25; // Result: 0 - 0.25
    let litSwagBalanceCalc = Math.abs(gameDataStats.lit / 1000 - gameDataStats.swag / 1000) * 0.25; // Result: 0 - 0.25
    let total = partySizeCalc + moneySavedCalc + litSwagBalanceCalc; // Result: 0 - 1
    // Bend the results
    let bendFactor = 0.5; // Between 0 - 1. The smaller the number, the stricter the bend (faster start, slow end)
    let calculation = -Math.pow((Math.pow(total, bendFactor) - 1), 2) + 1; // Result 0 -1
    gameDataStats.clout = calculation * 100;
}
// =============================================================
// =============================================================
// Data Management
// -------------------------------------------------------------
let gameSaveStats, gameSaveInventory, gameSaveSettings;
// Load Stats
if (localStorage.getItem("partyUniverseSaveStats") != null) {
    gameSaveStats = JSON.parse(localStorage.getItem("partyUniverseSaveStats"));
}
// Load Inventory
if (localStorage.getItem("partyUniverseSaveInventory") != null) {
    gameSaveInventory = JSON.parse(localStorage.getItem("partyUniverseSaveInventory"));
}
// Load Settings
if (localStorage.getItem("partyUniverseSaveSettings") != null) {
    gameSaveSettings = JSON.parse(localStorage.getItem("partyUniverseSaveSettings"));
}
updateStatDisplay();
function loadGame() {
    location.reload();
}
function saveGame() {
    localStorage.setItem("partyUniverseSaveStats", JSON.stringify(gameDataStats));
    localStorage.setItem("partyUniverseSaveInventory", JSON.stringify(gameDataInventory));
    localStorage.setItem("partyUniverseSaveSettings", JSON.stringify(gameDataSettings));
}
// Autosave every 15 seconds
let saveGameLoop = window.setInterval(function () {
    saveGame();
}, 15000);
// Delete save
function deleteSave() {
    localStorage.removeItem("partyUniverseSave");
    loadGame();
}
// =============================================================
