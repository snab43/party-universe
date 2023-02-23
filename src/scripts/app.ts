// =============================================================
// app.ts
// -------------------------------------------------------------
// This is where the heart of the game lies.
// =============================================================
import { SaveFile } from './models/saveFile.js'

let gameSave = new SaveFile();


// =============================================================
// Data Management
// -------------------------------------------------------------
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
	console.log(`karma: ${gameSave.karma}\nluck: ${gameSave.luck}\ndigForChangeMod: ${gameSave.digForChangeMod}\ninviteMod: ${gameSave.inviteMod}\nClout: ${Utilities.calculateClout(gameSave.party, gameSave.money)}`
	)
}


// =============================================================
// Load UI
// -------------------------------------------------------------
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
	document.getElementById("partyGoerListExit")!.addEventListener("click", UI.togglePartyGoerList, false);

	// Phone
	document.getElementById("submitPostButton")!.addEventListener("click", submitPost, false);
	document.getElementById("phoneContainer")!.style.backgroundImage = `url('${gameSave.phoneBackgroundImage}')`;

	// Phone Apps
	Array.from(document.getElementsByClassName("appImg")).forEach(element => {
		element.addEventListener('click', event => {
			UI.openApp(<HTMLImageElement>event.target);
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
	
	// Copyright + Version
	document.getElementById("copyrightYear")!.innerText = <string><unknown>(new Date()).getFullYear();
	document.getElementById("version")!.innerText = GAME_VERSION;

	// Regular UI update
	updateUI();
	UI.updateStore(gameSave.totalMoney);
	UI.updateDoorFee(gameSave.doorFee);
}


// =============================================================
// Action functions
// -------------------------------------------------------------
function digForChange() {
	let minChange = 0.1;
	let maxChange = 0.25;

	minChange = minChange * (gameSave.luck);
	if (minChange > maxChange) minChange = maxChange;

	let change = (Math.random() * (maxChange - minChange) + minChange) * gameSave.digForChangeMod;
	gameSave.money += change;
	gameSave.totalMoney += change;

	Utilities.statChange("money", change);
	updateUI();
}

function sendAText() {
	// Party at capacity
	if (gameSave.party >= gameSave.partyCapacity) {
		Social.updateTextMessage(
			chance.name(),
			DIALOGUE_NO_ROOM[Math.floor(Math.random()*DIALOGUE_NO_ROOM.length)],
			MessageType.Reject,
			gameSave.militaryTime
		);
	// Money check
	} else if (gameSave.money >= TEXT_COST) {
		gameSave.money -= TEXT_COST;
		
		// Success calculation
		let chanceOfSuccess = (Utilities.calculateClout(gameSave.party, gameSave.money)*50 - gameSave.doorFee)/100;
		if (chanceOfSuccess < 0) chanceOfSuccess = 0;
		if (gameSave.doorFee <= 0) chanceOfSuccess = 0.5;
		
		// Successful invite
		if (chanceOfSuccess >= Math.random()) {
			let partyGoerName: string = chance.name();

			gameSave.party += 1;
			gameSave.totalParty += 1;
			gameSave.money += gameSave.doorFee;
			gameSave.totalMoney += gameSave.doorFee;
			gameSave.partyGoers.push(partyGoerName);

			Social.updateTextMessage(
				partyGoerName,
				DIALOGUE_ACCEPTANCE[Math.floor(Math.random()*DIALOGUE_ACCEPTANCE.length)],
				MessageType.Accept,
				gameSave.militaryTime
			);

			Utilities.statChange("party", 1);
		// Unsuccessful invite
		} else {
			Social.updateTextMessage(
				chance.name(),
				DIALOGUE_REJECTION[Math.floor(Math.random()*DIALOGUE_REJECTION.length)],
				MessageType.Reject,
				gameSave.militaryTime
			);
		}

		Utilities.statChange("money", -TEXT_COST);
	} else {
		console.log("ERROR: Tried to send a text with no money.");
	}
	
	updateUI();
}

function kickSomeoneOut() {
	if (gameSave.party > 0) {
		const random: number = Math.floor(Math.random() * (gameSave.partyGoers.length));
		let partyGoerName: string = gameSave.partyGoers[random];
		gameSave.partyGoers.splice(random, 1)[0];

		gameSave.party -= 1;
		gameSave.totalKicked += 1;

		Social.updateTextMessage(
			partyGoerName,
			DIALOGUE_KICKED_OUT[Math.floor(Math.random()*DIALOGUE_KICKED_OUT.length)],
			MessageType.Reject,
			gameSave.militaryTime
		);

		updateUI();
		Utilities.statChange("party", -1);
	} else {
		console.log("ERROR: Tried to kick someone out of an empty party.")
	}
}

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

function submitPost() {
	let statusUpdate = (<HTMLInputElement>document.getElementById("statusUpdate")!);
	
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
// -------------------------------------------------------------
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


function updateUI() {
	UI.updateStatDisplay(gameSave.party, gameSave.partyCapacity, gameSave.money, Utilities.calculateClout(gameSave.party, gameSave.money));
	UI.updatePartyList(gameSave.partyGoers);
	//UI.updateStore(gameSave.totalMoney);
}


// =============================================================
// Main Game Loop
// -------------------------------------------------------------
let mainGameLoop = window.setInterval(function() {
	updateUI();
	randomEvents.friendSpacePost(gameSave.militaryTime);
	randomEvents.textMessage(gameSave.partyGoers, gameSave.militaryTime);
}, 1000)