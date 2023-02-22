// =============================================================
// app.ts
// -------------------------------------------------------------
// This is where the heart of the game lies.
// =============================================================
import { SaveFile } from './models/saveFile.js';

let gameSave = new SaveFile();


// =============================================================
// Data Management
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
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


// =============================================================
// Load UI
// -------------------------------------------------------------
function loadUI() {
	// Add event listeners
	//document.getElementById("doorFeeUp")!.addEventListener("click", doorFee(1), false);
	//document.getElementById("doorFeeDown")!.addEventListener("click", doorFee(-1), false);

	document.getElementById("digForChange")!.addEventListener("click", digForChange, false);
	document.getElementById("sendAText")!.addEventListener("click", sendAText, false);
	document.getElementById("kickSomeoneOut")!.addEventListener("click", kickSomeoneOut, false);

	document.getElementById("submitPostButton")!.addEventListener("click", submitPost, false);

	document.getElementById("saveGameButton")!.addEventListener("click", saveGame, false);
	document.getElementById("loadGameButton")!.addEventListener("click", loadGame, false);
	document.getElementById("deleteSaveButton")!.addEventListener("click", deleteSave, false);
	document.getElementById("debugStatsButton")!.addEventListener("click", getHiddenStatsInConsole, false);
	
	// Party List
	updatePartyList();

	// Phone Navigation
	let phoneContainer = document.getElementById("phoneContainer")!;
	phoneContainer.style.backgroundImage = `url('${gameSave.phoneBackgroundImage}')`;

	let appIcons = document.getElementsByClassName("appImg");
	let appContainers = document.getElementsByClassName("appContainer");

	Array.from(appIcons).forEach(element => {
		element.addEventListener('click', event => {
			openApp(event.target as HTMLImageElement);
		});
	});

	function openApp(appIcon: HTMLImageElement) {
		Array.from(appContainers).forEach(appContainer => {
			if (appContainer.getAttribute("data-app") == appIcon.getAttribute("data-app")) {
				appContainer.classList.toggle("hidden");
				//appIcon.classList.toggle("activeApp");
			} else {
				appContainer.classList.add("hidden");
			}
		});
	}

	// Phone Wallpapers
	let wallpaperPickerIcons = document.getElementsByClassName("wallpaperPickerIcon");

	Array.from(wallpaperPickerIcons).forEach(element => {
		element.addEventListener('click', event => {
			changePhoneWallpaper(event.target as HTMLImageElement);
		});
	});

	function changePhoneWallpaper(wallpaperPickerIcon: HTMLImageElement) {
		gameSave.phoneBackgroundImage = wallpaperPickerIcon.src;
		let phoneContainer = document.getElementById("phoneContainer")!;
		phoneContainer.style.backgroundImage = `url('${wallpaperPickerIcon.src}')`;
	}

	// Copyright Year
	document.getElementById("copyrightYear")!.innerText = <string><unknown>(new Date()).getFullYear();
}


// =============================================================
// Utility functions
// -------------------------------------------------------------
function getTimestamp(militaryTime: boolean) {
	return new Date().toLocaleTimeString('en-US', {hour12: !militaryTime}); // 12:12:12 AM
}

function getHourMinuteTimeStamp(militaryTime: boolean) {
	let date = new Date();

	let hours: number | string = date.getHours();
	let minutes: number | string = date.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	
	let strTime: string;
	if (militaryTime) {
		strTime = hours + ':' + minutes;
	} else {
		let ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // The hour '0' should be '12'
		strTime  = hours + ':' + minutes + ' ' + ampm;
	}

	return strTime;
}

function getWeekday() {
	return new Date().toLocaleString('en-us', {weekday: 'long'});
}

function getHiddenStatsInConsole() {
	console.log(`
		Lit: ${gameSave.lit}
		Swag: ${gameSave.swag}
		Pull: ${gameSave.pull}
		Karma: ${gameSave.karma}
		Luck: ${gameSave.luck}
		Total Money: ${gameSave.totalMoney}
	`)
}


// =============================================================
// Action functions
// -------------------------------------------------------------
function sendAText() {
	let textCost = 0.25;

	// Party at capacity
	if (gameSave.party >= gameSave.partyCapacity) {
		updateTextMessage(chance.name(), DIALOGUE_NO_ROOM[Math.floor(Math.random()*DIALOGUE_NO_ROOM.length)], "reject");
	// Money check
	} else if (gameSave.money >= textCost) {
		gameSave.money -= textCost;
		
		// Success calculation
		let chanceOfSuccess = (gameSave.clout*50 - gameSave.doorFee)/100;
		if (chanceOfSuccess < 0) chanceOfSuccess = 0;
		if (gameSave.doorFee <= 0) chanceOfSuccess = 0.5;
		
		// Debug
		console.log("Chance of success: " + chanceOfSuccess*100 + "%");
		
		if (chanceOfSuccess >= Math.random()) {
			let partyGoerName: string = chance.name();

			gameSave.party += 1;
			gameSave.money += gameSave.doorFee;
			gameSave.totalMoney += gameSave.doorFee;
			gameSave.partyGoers.push(partyGoerName);
			updateTextMessage(partyGoerName, DIALOGUE_ACCEPTANCE[Math.floor(Math.random()*DIALOGUE_ACCEPTANCE.length)], "accept");
			updatePartyList();
		// Unsuccessful invite
		} else {
			updateTextMessage(chance.name(), DIALOGUE_REJECTION[Math.floor(Math.random()*DIALOGUE_REJECTION.length)], "reject");
		}
	} else {
		console.log("Not enough money but button has been clicked somehow?");
	}
	
	updateStatDisplay();
}

function doorFee (amount: number) {
	gameSave.doorFee += amount;
	if (gameSave.doorFee <= 0) gameSave.doorFee = 0;
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
		const random: number = Math.floor(Math.random() * (gameSave.partyGoers.length - 1) + 1);
		let partyGoerName: string = gameSave.partyGoers[random];
		gameSave.partyGoers.splice(random, 1)[0];

		gameSave.party -= 1;
		updateTextMessage(partyGoerName, DIALOGUE_KICKED_OUT[Math.floor(Math.random()*DIALOGUE_KICKED_OUT.length)], "reject");
		updateStatDisplay();
		updatePartyList();
	}
}

function submitPost() {
	let statusUpdate = (<HTMLInputElement>document.getElementById("statusUpdate")!);
	
	if (statusUpdate.value) {
		updateFriendSpaceFeed("You", "The Party", statusUpdate.value);
		statusUpdate.value = "";
	}
}


// =============================================================
// Buy functions
// -------------------------------------------------------------
function buySupplies(id: number) {
	let totalCost: number = ITEM_STATS.supplies[id as keyof any].cost * gameSave.supplies[id as keyof any].costMod;

	if (gameSave.money >= totalCost) {
		gameSave.money -= totalCost;
		gameSave.supplies[id].amount += 1 * gameSave.supplies[id].amountMod;
	} else {
		console.log("ERR: Attempted to purchase item with insufficient funds");
		updateTextMessage("Developer", "Are you hacking?!", "key");
	}
	
	updateStatDisplay();
}

function buyDrinks(id: number) {
	let totalCost: number = ITEM_STATS.drinks[id].cost * gameSave.drinks[id].costMod;
	
	if (gameSave.money >= totalCost) {
		gameSave.money -= totalCost;
		gameSave.drinks[id].amount += 1 * gameSave.drinks[id].amountMod;
	} else {
		console.log("ERR: Attempted to purchase item with insufficient funds");
		updateTextMessage("Developer", "Are you hacking?!", "key");
	}
	
	updateStatDisplay();
}

function buyPromotions(id: number) {
	let totalCost: number = ITEM_STATS.promotions[id].cost * gameSave.promotions[id].costMod;
	
	if (gameSave.money >= totalCost) {
		gameSave.money -= totalCost;
		gameSave.promotions[id].amount += 1 * gameSave.promotions[id].amountMod;
	} else {
		console.log("ERR: Attempted to purchase item with insufficient funds");
		updateTextMessage("Developer", "Are you hacking?!", "key");
	}
	
	updateStatDisplay();
}

function buyVenues(id: number) {
	let totalCost: number = ITEM_STATS.venues[id].cost * gameSave.venues[id].costMod;
	
	if (gameSave.money >= totalCost) {
		gameSave.money -= totalCost;
		gameSave.venues[id].amount += 1 * gameSave.venues[id].amountMod;
	} else {
		console.log("ERR: Attempted to purchase item with insufficient funds");
		updateTextMessage("Developer", "Are you hacking?!", "key");
	}
	
	updateStatDisplay();
}


// =============================================================
// Messages/FriendSpace functions
// -------------------------------------------------------------
function updateTextMessage(name: string, message: string, type: string) {
	let newItem = document.createElement("LI");
	
	switch (type) {
		case "key": newItem.classList.add("keyMessage") ; break;
		case "accept": newItem.classList.add("acceptanceMessage"); break;
		case "reject": newItem.classList.add("rejectionMessage"); break;
		default: newItem.classList.add("defaultMessage"); break;
	}
	
	newItem.innerHTML = `
		<b>${name}</b></br>
		<p>${message}</p>
		<small>${getTimestamp(gameSave.militaryTime)} &#8226; SMS
	`;

	let list = document.getElementById("textMessages")!;
	list.insertBefore(newItem, list.childNodes[0]);
}

function updateFriendSpaceFeed(name: string, locationFrom: string, message: string) {
	let newItem = document.createElement("LI");

	newItem.innerHTML = `
		<b>${name}</b></br>
		<small>${getTimestamp(gameSave.militaryTime)} &#8226; ${locationFrom}</small></br>
		<p>${message}</p>
		<small>Like &#8226; Comment &#8226; Share
	`;

	let list = document.getElementById("friendSpaceFeed")!;
	list.insertBefore(newItem, list.childNodes[0]);
}


// =============================================================
// Update functions
// -------------------------------------------------------------
function updateStatDisplay() {
	updateButtons();
	updateClout();
	
	// Stats
	document.getElementById("party")!.innerHTML = gameSave.party + "/" + gameSave.partyCapacity + " Attendees";
	document.getElementById("money")!.innerHTML = "Money: $" + gameSave.money.toFixed(2);
	document.getElementById("clout")!.innerHTML = "Clout: " + gameSave.clout.toFixed(2) + "%";
	document.getElementById("doorFee")!.innerHTML = "Door Fee: $" + gameSave.doorFee.toFixed(2);

	// Time
	document.getElementById("notificationTime")!.innerHTML = getHourMinuteTimeStamp(gameSave.militaryTime);
}

function updatePartyList() {
	let partyGoerList = document.getElementById("partyGoerList")!;
	partyGoerList.innerHTML = '';
	Array.from(gameSave.partyGoers).forEach(element => {
		let partyGoer = document.createElement("LI");
		partyGoer.innerText = element;
		partyGoerList.appendChild(partyGoer);
	});
}

function updateButtons() {
	// -------------------------------------------------------------
	// List generators
	// -------------------------------------------------------------
	let percentToReveal = 0.5; // What percentage of totalMoney to reveal an item.
	
	// Generate Supply List
	let supplyList = document.getElementById("suppliesList")!;
	supplyList.innerHTML = "";
	for (let i = ITEM_INFO.FSUPPLY; i <= ITEM_INFO.LSUPPLY; i++) {
		let info = ITEM_STATS.supplies[i];
		let data = gameSave.supplies[i];
		
		if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
			let newItem = document.createElement("DIV");
			newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
			
			supplyList.appendChild(newItem);
			
			if (gameSave.money < info.cost) (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = true;
			else (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = false;
		}
	}

	// Generate Drink List
	let drinkList = document.getElementById("drinkList")!;
	drinkList.innerHTML = "";
	for (let i = ITEM_INFO.FDRINKS; i <= ITEM_INFO.LDRINKS; i++) {
		let info = ITEM_STATS.drinks[i];
		let data = gameSave.drinks[i];
		
		if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
			let newItem = document.createElement("DIV");
			newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
			
			drinkList.appendChild(newItem);
			
			if (gameSave.money < info.cost) (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = true;
			else (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = false;
		}
	}
	
	// Generate Promotions List
	let promotionsList = document.getElementById("promotionsList")!;
	promotionsList.innerHTML = "";
	for (let i = ITEM_INFO.FPROMO; i <= ITEM_INFO.LPROMO; i++) {
		let info = ITEM_STATS.promotions[i];
		let data = gameSave.promotions[i];
		
		if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
			let newItem = document.createElement("DIV");
			newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
			
			promotionsList.appendChild(newItem);
			
			if (gameSave.money < info.cost) (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = true;
			else (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = false;
		}
	}

	// Generate Venues List
	let venuesList = document.getElementById("venuesList")!;
	venuesList.innerHTML = "";
	for (let i = ITEM_INFO.FVENUE; i <= ITEM_INFO.LVENUE; i++) {
		let info = ITEM_STATS.venues[i];
		let data = gameSave.venues[i];
		
		if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
			let newItem = document.createElement("DIV");
			newItem.innerHTML = `
				<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
			`;
			
			venuesList.appendChild(newItem);
			
			if (gameSave.money < info.cost) (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = true;
			else (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = false;
		}
	}
	
	// -------------------------------------------------------------
	// Button disables
	// -------------------------------------------------------------
	if (gameSave.doorFee <= 0) (<HTMLButtonElement>document.getElementById("doorFeeDown")).disabled = true;
	else (<HTMLButtonElement>document.getElementById("doorFeeDown")).disabled = false;
		
	if (gameSave.party <= 1) (<HTMLButtonElement>document.getElementById("kickSomeoneOut")).disabled = true;
	else (<HTMLButtonElement>document.getElementById("kickSomeoneOut")).disabled = false;
	
	if (gameSave.money < 0.25) (<HTMLButtonElement>document.getElementById("sendAText")).disabled = true;
	else (<HTMLButtonElement>document.getElementById("sendAText")).disabled = false;
}

function updateClout() {
	// Clout is: 50% party size (max 1,000,000), 25% money saved (max $10,000,000), 25% lit/swag balance,
	// There's also a slight bend to it so it's not so linear.
	let partySizeCalc: number = (gameSave.party - 1)/1000000*0.5; // Result: 0 - 0.5
	let moneySavedCalc: number = gameSave.money/10000000*0.25; // Result: 0 - 0.25
	let litSwagBalanceCalc: number = Math.abs(gameSave.lit/1000 - gameSave.swag/1000) * 0.25; // Result: 0 - 0.25
	
	let total: number = partySizeCalc + moneySavedCalc + litSwagBalanceCalc; // Result: 0 - 1
	
	// Bend the results
	let bendFactor: number = 0.5; // Between 0 - 1. The smaller the number, the stricter the bend (faster start, slow end)
	let calculation: number = -Math.pow((Math.pow(total, bendFactor) - 1), 2) + 1;	// Result 0 -1
	gameSave.clout = calculation * 100;
}


// =============================================================
// Random Events
// -------------------------------------------------------------
function randomEvents() {
	// FriendSpace update
	if (Math.random() <= 1/100) updateFriendSpaceFeed(chance.name(), chance.city() + ", " + chance.country(), DIALOGUE_FRIENDSPACE_POST[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_POST.length)]);
	
	// FriendSpace ad
	if (Math.random() <= 1/500) updateFriendSpaceFeed("Advertisement", "Sponsored", DIALOGUE_FRIENDSPACE_AD[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_AD.length)]);
	
	// Text from party goer
	if (Math.random() <= 1/50) updateTextMessage(gameSave.partyGoers[Math.floor(Math.random() * (gameSave.partyGoers.length - 1) + 1)], DIALOGUE_PARTY_GOER_TEXT[Math.floor(Math.random()*DIALOGUE_PARTY_GOER_TEXT.length)], "default");

	// Text message
	if (Math.random() <= 1/250) updateTextMessage(chance.name(), DIALOGUE_TEXT_MESSAGE[Math.floor(Math.random()*DIALOGUE_TEXT_MESSAGE.length)], "default");
	
	// Wrong number message
	if (Math.random() <= 1/800) updateTextMessage("Unknown", DIALOGUE_WRONG_NUMBER[Math.floor(Math.random()*DIALOGUE_WRONG_NUMBER.length)], "default");
	
	/*
	// ---------------------------------------------------------
	// Random party events
	// ---------------------------------------------------------
	// Balloon popped
	if (gameData.supplies[GAME_INFO.BALLOON].amount >= 1 && gameData.party > 1 && Math.random() <= 1/1000) {
		updateTextMessage(chance.name(), "Sorry, I accidentally popped a balloon", "");
		gameData.supplies[GAME_INFO.BALLOON].amount -= 1;
		updateStatDisplay();
	}
	
	// Someone broke a vase and sends you some cash
	if (gameData.party > 1 && Math.random() <= 1/1000) {
		var cash = Math.floor(Math.random() * 1500 + 500)/100;
		updateTextMessage(chance.name(), "My bad, I broke a vase. Just sent you $" + cash.toFixed(2) + " to make up for it", "");
		gameData.money += cash;
		gameData.totalMoney += cash;
		updateStatDisplay();
	}
	
	// Someone is contributing money to a pizza fund
	if (gameData.party > 1 && Math.random() <= 1/1000) {
		var cash = Math.floor(Math.random() * 500 + 200)/100;
		updateTextMessage(chance.name(), "Yo I heard there was a pizza fund going around? Just sent you $" + cash.toFixed(2) + " as my contribution.", "");
		gameData.money += cash;
		gameData.totalMoney += cash;
		updateStatDisplay();
	}
	
	// Someone stole money from you
	if (gameData.party > 2 && gameData.money >= 100 && Math.random() <= 1/3000) {
		var cash = Math.floor(Math.random() * 500 + 200)/100;
		updateTextMessage(chance.name(), "I think I just saw " + chance.first() + "steal like $" + cash.toFixed(2) + " from your wallet. Keep an eye out.", "");
		gameData.money -= cash;
		updateStatDisplay();
	}
	*/
}


// =============================================================
// Main Game Loop
// -------------------------------------------------------------
let mainGameLoop = window.setInterval(function() {
	updateStatDisplay();
	randomEvents();
}, 1000)