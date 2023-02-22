// =============================================================
// randomEvents.ts
// -------------------------------------------------------------
// Here is a list of all the random events. This happens on
// every game tick in the mainGameLoop variable in main.js.
// =============================================================

function randomEvents() {
	// ---------------------------------------------------------
	// Random updates
	// ---------------------------------------------------------
	// FriendSpace update 1/100
	
	if (Math.random() <= 1/100) updateFriendSpaceFeed(chance.name(), chance.city() + ", " + chance.country(), DIALOGUE_FRIENDSPACE_POST[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_POST.length)]);
	
	// FriendSpace ad 1/500
	if (Math.random() <= 1/500) updateFriendSpaceFeed("Advertisement", "Sponsored", DIALOGUE_FRIENDSPACE_AD[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_AD.length)]);
	
	// Text Message 1/250
	if (Math.random() <= 1/250) updateTextMessage(chance.name(), DIALOGUE_TEXT_MESSAGE[Math.floor(Math.random()*DIALOGUE_TEXT_MESSAGE.length)], "default");
	
	// Wrong number message 1/800
	if (Math.random() <= 1/800) updateTextMessage(chance.phone(), DIALOGUE_WRONG_NUMBER[Math.floor(Math.random()*DIALOGUE_WRONG_NUMBER.length)], "default");
	
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