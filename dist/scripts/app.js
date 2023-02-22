import { SaveFile } from './models/saveFile.js';
let gameSave = new SaveFile();
document.addEventListener("DOMContentLoaded", function () {
    console.log("DEBUG: DOM loaded.");
    loadUI();
    updateStatDisplay();
});
function saveGame() {
    gameSave.writeSave();
}
function loadGame() {
    gameSave.loadSave();
    loadUI();
    updateStatDisplay();
}
function deleteSave() {
    gameSave.deleteSave();
    location.reload();
}
function loadUI() {
    document.getElementById("digForChange").addEventListener("click", digForChange, false);
    document.getElementById("sendAText").addEventListener("click", sendAText, false);
    document.getElementById("kickSomeoneOut").addEventListener("click", kickSomeoneOut, false);
    document.getElementById("submitPostButton").addEventListener("click", submitPost, false);
    document.getElementById("saveGameButton").addEventListener("click", saveGame, false);
    document.getElementById("loadGameButton").addEventListener("click", loadGame, false);
    document.getElementById("deleteSaveButton").addEventListener("click", deleteSave, false);
    document.getElementById("debugStatsButton").addEventListener("click", getHiddenStatsInConsole, false);
    updatePartyList();
    let phoneContainer = document.getElementById("phoneContainer");
    phoneContainer.style.backgroundImage = `url('${gameSave.phoneBackgroundImage}')`;
    let appIcons = document.getElementsByClassName("appImg");
    let appContainers = document.getElementsByClassName("appContainer");
    Array.from(appIcons).forEach(element => {
        element.addEventListener('click', event => {
            openApp(event.target);
        });
    });
    function openApp(appIcon) {
        Array.from(appContainers).forEach(appContainer => {
            if (appContainer.getAttribute("data-app") == appIcon.getAttribute("data-app")) {
                appContainer.classList.toggle("hidden");
            }
            else {
                appContainer.classList.add("hidden");
            }
        });
    }
    let wallpaperPickerIcons = document.getElementsByClassName("wallpaperPickerIcon");
    Array.from(wallpaperPickerIcons).forEach(element => {
        element.addEventListener('click', event => {
            changePhoneWallpaper(event.target);
        });
    });
    function changePhoneWallpaper(wallpaperPickerIcon) {
        gameSave.phoneBackgroundImage = wallpaperPickerIcon.src;
        let phoneContainer = document.getElementById("phoneContainer");
        phoneContainer.style.backgroundImage = `url('${wallpaperPickerIcon.src}')`;
    }
    document.getElementById("copyrightYear").innerText = (new Date()).getFullYear();
}
function getTimestamp(militaryTime) {
    return new Date().toLocaleTimeString('en-US', { hour12: !militaryTime });
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
        hours = hours ? hours : 12;
        strTime = hours + ':' + minutes + ' ' + ampm;
    }
    return strTime;
}
function getWeekday() {
    return new Date().toLocaleString('en-us', { weekday: 'long' });
}
function getHiddenStatsInConsole() {
    console.log(`
		Lit: ${gameSave.lit}
		Swag: ${gameSave.swag}
		Pull: ${gameSave.pull}
		Karma: ${gameSave.karma}
		Luck: ${gameSave.luck}
		Total Money: ${gameSave.totalMoney}
	`);
}
function sendAText() {
    let textCost = 0.25;
    if (gameSave.party >= gameSave.partyCapacity) {
        updateTextMessage(chance.name(), DIALOGUE_NO_ROOM[Math.floor(Math.random() * DIALOGUE_NO_ROOM.length)], "reject");
    }
    else if (gameSave.money >= textCost) {
        gameSave.money -= textCost;
        let chanceOfSuccess = (gameSave.clout * 50 - gameSave.doorFee) / 100;
        if (chanceOfSuccess < 0)
            chanceOfSuccess = 0;
        if (gameSave.doorFee <= 0)
            chanceOfSuccess = 0.5;
        console.log("Chance of success: " + chanceOfSuccess * 100 + "%");
        if (chanceOfSuccess >= Math.random()) {
            let partyGoerName = chance.name();
            gameSave.party += 1;
            gameSave.money += gameSave.doorFee;
            gameSave.totalMoney += gameSave.doorFee;
            gameSave.partyGoers.push(partyGoerName);
            updateTextMessage(partyGoerName, DIALOGUE_ACCEPTANCE[Math.floor(Math.random() * DIALOGUE_ACCEPTANCE.length)], "accept");
            updatePartyList();
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
    gameSave.doorFee += amount;
    if (gameSave.doorFee <= 0)
        gameSave.doorFee = 0;
    updateStatDisplay();
}
function digForChange() {
    let change = Math.random() * 0.20;
    gameSave.money += change;
    gameSave.totalMoney += change;
    updateStatDisplay();
}
function kickSomeoneOut() {
    if (gameSave.party > 1) {
        const random = Math.floor(Math.random() * (gameSave.partyGoers.length - 1) + 1);
        let partyGoerName = gameSave.partyGoers[random];
        gameSave.partyGoers.splice(random, 1)[0];
        gameSave.party -= 1;
        updateTextMessage(partyGoerName, DIALOGUE_KICKED_OUT[Math.floor(Math.random() * DIALOGUE_KICKED_OUT.length)], "reject");
        updateStatDisplay();
        updatePartyList();
    }
}
function submitPost() {
    let statusUpdate = document.getElementById("statusUpdate");
    if (statusUpdate.value) {
        updateFriendSpaceFeed("You", "The Party", statusUpdate.value);
        statusUpdate.value = "";
    }
}
function buySupplies(id) {
    let totalCost = ITEM_STATS.supplies[id].cost * gameSave.supplies[id].costMod;
    if (gameSave.money >= totalCost) {
        gameSave.money -= totalCost;
        gameSave.supplies[id].amount += 1 * gameSave.supplies[id].amountMod;
    }
    else {
        console.log("ERR: Attempted to purchase item with insufficient funds");
        updateTextMessage("Developer", "Are you hacking?!", "key");
    }
    updateStatDisplay();
}
function buyDrinks(id) {
    let totalCost = ITEM_STATS.drinks[id].cost * gameSave.drinks[id].costMod;
    if (gameSave.money >= totalCost) {
        gameSave.money -= totalCost;
        gameSave.drinks[id].amount += 1 * gameSave.drinks[id].amountMod;
    }
    else {
        console.log("ERR: Attempted to purchase item with insufficient funds");
        updateTextMessage("Developer", "Are you hacking?!", "key");
    }
    updateStatDisplay();
}
function buyPromotions(id) {
    let totalCost = ITEM_STATS.promotions[id].cost * gameSave.promotions[id].costMod;
    if (gameSave.money >= totalCost) {
        gameSave.money -= totalCost;
        gameSave.promotions[id].amount += 1 * gameSave.promotions[id].amountMod;
    }
    else {
        console.log("ERR: Attempted to purchase item with insufficient funds");
        updateTextMessage("Developer", "Are you hacking?!", "key");
    }
    updateStatDisplay();
}
function buyVenues(id) {
    let totalCost = ITEM_STATS.venues[id].cost * gameSave.venues[id].costMod;
    if (gameSave.money >= totalCost) {
        gameSave.money -= totalCost;
        gameSave.venues[id].amount += 1 * gameSave.venues[id].amountMod;
    }
    else {
        console.log("ERR: Attempted to purchase item with insufficient funds");
        updateTextMessage("Developer", "Are you hacking?!", "key");
    }
    updateStatDisplay();
}
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
		<small>${getTimestamp(gameSave.militaryTime)} &#8226; SMS
	`;
    let list = document.getElementById("textMessages");
    list.insertBefore(newItem, list.childNodes[0]);
}
function updateFriendSpaceFeed(name, locationFrom, message) {
    let newItem = document.createElement("LI");
    newItem.innerHTML = `
		<b>${name}</b></br>
		<small>${getTimestamp(gameSave.militaryTime)} &#8226; ${locationFrom}</small></br>
		<p>${message}</p>
		<small>Like &#8226; Comment &#8226; Share
	`;
    let list = document.getElementById("friendSpaceFeed");
    list.insertBefore(newItem, list.childNodes[0]);
}
function updateStatDisplay() {
    updateButtons();
    updateClout();
    document.getElementById("party").innerHTML = gameSave.party + "/" + gameSave.partyCapacity + " Attendees";
    document.getElementById("money").innerHTML = "Money: $" + gameSave.money.toFixed(2);
    document.getElementById("clout").innerHTML = "Clout: " + gameSave.clout.toFixed(2) + "%";
    document.getElementById("doorFee").innerHTML = "Door Fee: $" + gameSave.doorFee.toFixed(2);
    document.getElementById("notificationTime").innerHTML = getHourMinuteTimeStamp(gameSave.militaryTime);
}
function updatePartyList() {
    let partyGoerList = document.getElementById("partyGoerList");
    partyGoerList.innerHTML = '';
    Array.from(gameSave.partyGoers).forEach(element => {
        let partyGoer = document.createElement("LI");
        partyGoer.innerText = element;
        partyGoerList.appendChild(partyGoer);
    });
}
function updateButtons() {
    let percentToReveal = 0.5;
    let supplyList = document.getElementById("suppliesList");
    supplyList.innerHTML = "";
    for (let i = 100; i <= 107; i++) {
        let info = ITEM_STATS.supplies[i];
        let data = gameSave.supplies[i];
        if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
            let newItem = document.createElement("DIV");
            newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
            supplyList.appendChild(newItem);
            if (gameSave.money < info.cost)
                newItem.lastChild.previousSibling.disabled = true;
            else
                newItem.lastChild.previousSibling.disabled = false;
        }
    }
    let drinkList = document.getElementById("drinkList");
    drinkList.innerHTML = "";
    for (let i = 200; i <= 207; i++) {
        let info = ITEM_STATS.drinks[i];
        let data = gameSave.drinks[i];
        if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
            let newItem = document.createElement("DIV");
            newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
            drinkList.appendChild(newItem);
            if (gameSave.money < info.cost)
                newItem.lastChild.previousSibling.disabled = true;
            else
                newItem.lastChild.previousSibling.disabled = false;
        }
    }
    let promotionsList = document.getElementById("promotionsList");
    promotionsList.innerHTML = "";
    for (let i = 300; i <= 305; i++) {
        let info = ITEM_STATS.promotions[i];
        let data = gameSave.promotions[i];
        if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
            let newItem = document.createElement("DIV");
            newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
            promotionsList.appendChild(newItem);
            if (gameSave.money < info.cost)
                newItem.lastChild.previousSibling.disabled = true;
            else
                newItem.lastChild.previousSibling.disabled = false;
        }
    }
    let venuesList = document.getElementById("venuesList");
    venuesList.innerHTML = "";
    for (let i = 400; i <= 406; i++) {
        let info = ITEM_STATS.venues[i];
        let data = gameSave.venues[i];
        if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
            let newItem = document.createElement("DIV");
            newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
            venuesList.appendChild(newItem);
            if (gameSave.money < info.cost)
                newItem.lastChild.previousSibling.disabled = true;
            else
                newItem.lastChild.previousSibling.disabled = false;
        }
    }
    if (gameSave.doorFee <= 0)
        document.getElementById("doorFeeDown").disabled = true;
    else
        document.getElementById("doorFeeDown").disabled = false;
    if (gameSave.party <= 1)
        document.getElementById("kickSomeoneOut").disabled = true;
    else
        document.getElementById("kickSomeoneOut").disabled = false;
    if (gameSave.money < 0.25)
        document.getElementById("sendAText").disabled = true;
    else
        document.getElementById("sendAText").disabled = false;
}
function updateClout() {
    let partySizeCalc = (gameSave.party - 1) / 1000000 * 0.5;
    let moneySavedCalc = gameSave.money / 10000000 * 0.25;
    let litSwagBalanceCalc = Math.abs(gameSave.lit / 1000 - gameSave.swag / 1000) * 0.25;
    let total = partySizeCalc + moneySavedCalc + litSwagBalanceCalc;
    let bendFactor = 0.5;
    let calculation = -Math.pow((Math.pow(total, bendFactor) - 1), 2) + 1;
    gameSave.clout = calculation * 100;
}
function randomEvents() {
    if (Math.random() <= 1 / 100)
        updateFriendSpaceFeed(chance.name(), chance.city() + ", " + chance.country(), DIALOGUE_FRIENDSPACE_POST[Math.floor(Math.random() * DIALOGUE_FRIENDSPACE_POST.length)]);
    if (Math.random() <= 1 / 500)
        updateFriendSpaceFeed("Advertisement", "Sponsored", DIALOGUE_FRIENDSPACE_AD[Math.floor(Math.random() * DIALOGUE_FRIENDSPACE_AD.length)]);
    if (Math.random() <= 1 / 50)
        updateTextMessage(gameSave.partyGoers[Math.floor(Math.random() * (gameSave.partyGoers.length - 1) + 1)], DIALOGUE_PARTY_GOER_TEXT[Math.floor(Math.random() * DIALOGUE_PARTY_GOER_TEXT.length)], "default");
    if (Math.random() <= 1 / 250)
        updateTextMessage(chance.name(), DIALOGUE_TEXT_MESSAGE[Math.floor(Math.random() * DIALOGUE_TEXT_MESSAGE.length)], "default");
    if (Math.random() <= 1 / 800)
        updateTextMessage("Unknown", DIALOGUE_WRONG_NUMBER[Math.floor(Math.random() * DIALOGUE_WRONG_NUMBER.length)], "default");
}
let mainGameLoop = window.setInterval(function () {
    updateStatDisplay();
    randomEvents();
}, 1000);
