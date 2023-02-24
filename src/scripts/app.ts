// =============================================================
// app.ts
// -------------------------------------------------------------
// Where the game starts and where the core gameplay loop and
// save file exists.
// =============================================================

import { SaveFile } from './models/saveFile.js'

let gameSave = new SaveFile();


// =============================================================
// Data Management
// =============================================================
document.addEventListener("DOMContentLoaded", function() {
	console.log("DEBUG: DOM loaded.");
	loadUI();
});

function saveGame() {
	gameSave.writeSave();
}

function loadGame() {
	gameSave.loadSave();
	
	loadUI();
}

function deleteSave() {
	gameSave.deleteSave();
	location.reload();
}

// DEBUG
function getHiddenStatsInConsole() {
	console.log(gameSave.getSaveObject());
}


// =============================================================
// Load UI on initial game load. Assigns event listeners.
// =============================================================
function loadUI() {
	// Add event listeners
	document.getElementById("doorFeeUp")!.addEventListener("click", changeDoorFeeUp, false);
	document.getElementById("doorFeeDown")!.addEventListener("click", changeDoorFeeDown, false);

	// Actions
	document.getElementById("digForChange")!.addEventListener("click", digForChange, false);
	document.getElementById("sendAText")!.addEventListener("click", sendAText, false);
	document.getElementById("kickSomeoneOut")!.addEventListener("click", kickSomeoneOut, false);

	// Party
	document.getElementById("partyGoerListButton")!.addEventListener("click", UI.togglePartyGoerList, false);

	// Phone
	document.getElementById("submitPostButton")!.addEventListener("click", submitPost, false);
	document.getElementById("phoneContainer")!.style.backgroundImage = `url('${gameSave.phoneBackgroundImage}')`;

	// Phone Apps
	Array.from(document.getElementsByClassName("appImg")).forEach(element => {
		element.addEventListener('click', event => {
			UI.toggleApp(<HTMLImageElement>event.target);
		});
	});

	// Phone Wallpapers
	Array.from(document.getElementsByClassName("wallpaperPickerIcon")).forEach(element => {
		element.addEventListener('click', event => {
			UI.changeWallpaper(<HTMLImageElement>event.target);
			gameSave.phoneBackgroundImage = (<HTMLImageElement>event.target).src;
		});
	});

	// Game Data
	document.getElementById("saveGameButton")!.addEventListener("click", saveGame, false);
	document.getElementById("loadGameButton")!.addEventListener("click", loadGame, false);
	document.getElementById("deleteSaveButton")!.addEventListener("click", deleteSave, false);
	document.getElementById("debugStatsButton")!.addEventListener("click", getHiddenStatsInConsole, false);
	
	// Modals
	Array.from(document.getElementsByClassName("modal")).forEach(element => {
		element.addEventListener('click', event => {
			if (event.target == element) {
				element.classList.add("hidden");
			}
		});
	});
	Array.from(document.getElementsByClassName("modalExit")).forEach(element => {
		element.addEventListener('click', event => {
			element.parentElement!.parentElement!.classList.add("hidden");
		});
	})

	// Copyright + Version
	document.getElementById("copyrightYear")!.innerText = <string><unknown>(new Date()).getFullYear();
	document.getElementById("version")!.innerText = GAME_VERSION;

	// Regular UI update
	updateUI();
	UI.updateStore(gameSave.totalMoney);
	UI.updateDoorFee(gameSave.doorFee);
}


// =============================================================
// Dig for Change, generates a random amount of money
// =============================================================
function digForChange() {
	let minChange = MIN_CHANGE;
	let maxChange = MAX_CHANGE;

	// The possible low increases based on luck
	minChange = minChange * gameSave.luck;
	if (minChange > maxChange) minChange = maxChange;

	// Generate change, increased by digForChangeMod, update stats
	let change = (Math.random() * (maxChange - minChange) + minChange) * gameSave.digForChangeMod;
	gameSave.money += change;
	gameSave.totalMoney += change;

	// Generates +$change animation and updates UI
	Utilities.statChange("money", change);
	updateUI();
}

// =============================================================
// Send a text message inviting someone to your party
// =============================================================
function sendAText() {
	// Party at capacity
	if (gameSave.party >= gameSave.partyCapacity) {
		// Send "no room" text message
		Social.updateTextMessage(
			chance.name(),
			DIALOGUE_NO_ROOM[Math.floor(Math.random()*DIALOGUE_NO_ROOM.length)],
			MessageType.Reject,
			gameSave.militaryTime
		);
	// If you can afford it
	} else if (gameSave.money >= TEXT_COST) {
		gameSave.money -= TEXT_COST;
		
		// Success calculation based on Clout and Door Fee.
		// More Clout means you can get away with a higher Door Fee.
		let chanceOfSuccess = (Utilities.calculateClout(gameSave.party, gameSave.money)*50 - gameSave.doorFee)/100;
		if (chanceOfSuccess < 0) chanceOfSuccess = 0;
		if (gameSave.doorFee <= 0) chanceOfSuccess = 0.5;
		
		// Successful invite
		if (chanceOfSuccess >= Math.random()) {
			let partyGoerName: string = chance.name();

			// Stat update
			gameSave.party += 1;
			gameSave.totalParty += 1;
			gameSave.money += gameSave.doorFee;
			gameSave.totalMoney += gameSave.doorFee;
			gameSave.partyGoers.push(partyGoerName);

			// Send an acceptance message
			Social.updateTextMessage(
				partyGoerName,
				DIALOGUE_ACCEPTANCE[Math.floor(Math.random()*DIALOGUE_ACCEPTANCE.length)],
				MessageType.Accept,
				gameSave.militaryTime
			);

			Utilities.statChange("party", 1);
		// Unsuccessful invite
		} else {
			// Send a rejection message
			Social.updateTextMessage(
				chance.name(),
				DIALOGUE_REJECTION[Math.floor(Math.random()*DIALOGUE_REJECTION.length)],
				MessageType.Reject,
				gameSave.militaryTime
			);
		}

		// Generates a -$0.25 animation
		Utilities.statChange("money", -TEXT_COST);
	} else {
		console.log("ERROR: Tried to send a text with no money.");
	}
	
	updateUI();
}

// =============================================================
// Kicks a random person out of the party
// =============================================================
function kickSomeoneOut() {
	// If the party actually has people
	if (gameSave.party > 0) {
		// Grabs a random person from the partyGoer array and removes them
		const random: number = Math.floor(Math.random() * (gameSave.partyGoers.length));
		let partyGoerName: string = gameSave.partyGoers[random];
		gameSave.partyGoers.splice(random, 1)[0];

		// Updates variables
		gameSave.party -= 1;
		gameSave.totalKicked += 1;
		gameSave.karma -= 1;

		// Sends a text message from the upset person who you kicked
		Social.updateTextMessage(
			partyGoerName,
			DIALOGUE_KICKED_OUT[Math.floor(Math.random()*DIALOGUE_KICKED_OUT.length)],
			MessageType.Reject,
			gameSave.militaryTime
		);

		// Updates UI and makes a "-1" animation
		updateUI();
		Utilities.statChange("party", -1);
	} else {
		console.log("ERROR: Tried to kick someone out of an empty party.")
	}
}

// =============================================================
// Updates the door fee.
// These should be 1 function but I'm not sure how to do that with
// event listeners...
// =============================================================
function changeDoorFeeUp () {
	gameSave.doorFee += 1;
	if (gameSave.doorFee <= 0) gameSave.doorFee = 0;
	UI.updateDoorFee(gameSave.doorFee);
}

function changeDoorFeeDown () {
	gameSave.doorFee -= 1;
	if (gameSave.doorFee <= 0) gameSave.doorFee = 0;
	UI.updateDoorFee(gameSave.doorFee);
}

// =============================================================
// Adds a FriendSpace post when you hit "submit"
// =============================================================
function submitPost() {
	// Gets the status update
	let statusUpdate = (<HTMLInputElement>document.getElementById("statusUpdate")!);
	
	// If it's not blank, push a post and clear the text box
	if (statusUpdate.value) {
		Social.updateFriendSpaceFeed(
			gameSave.name,
			gameSave.partyName,
			statusUpdate.value,
			gameSave.militaryTime
		);
		statusUpdate.value = "";
	} else {
		console.log("ERROR: Tried post an empty FriendSpace status update.")
	}
}


// =============================================================
// Buy functions
// =============================================================
// VERY OLD CODE THAT NEEDS TO BE RE-WRITTEN TO WORK.
/*
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
*/

// =============================================================
// Update the UI (ran every tick)
// =============================================================
function updateUI() {
	UI.updateStatDisplay(gameSave.party, gameSave.partyCapacity, gameSave.money);
	UI.updatePartyList(gameSave.partyGoers);
	UI.updateStore(gameSave.totalMoney);
	UI.updateTime(gameSave.militaryTime);
}

// =============================================================
// Run various random events
// =============================================================
function runRandomEvents() {
	randomEvents.friendSpacePost(gameSave.militaryTime);
	randomEvents.textMessage(gameSave.partyGoers, gameSave.militaryTime);
	randomEvents.friendSpacePostLiked();

	gameSave = randomEvents.partyEvents(gameSave);
}

// =============================================================
// Main Game Loop, every 1 second 
// =============================================================
let mainGameLoop = window.setInterval(function() {
	updateUI();
	runRandomEvents();
}, 1000)