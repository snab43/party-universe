// =============================================================
// main.js
// -------------------------------------------------------------
// Here is a list of all the random events. This happens on
// every game tick in the mainGameLoop variable in main.js.
// =============================================================

function randomEvents() {
	// ---------------------------------------------------------
	// Random updates
	// ---------------------------------------------------------
	// FriendSpace update
	if (Math.random() <= 1/100) updateFriendSpaceFeed(chance.name(), chance.city() + ", " + chance.country(), genericFriendSpacePosts[Math.floor(Math.random()*genericFriendSpacePosts.length)]);
	
	// FriendSpace ad
	if (Math.random() <= 1/500) updateFriendSpaceFeed("Advertisement", "Sponsored", genericFriendSpaceAds[Math.floor(Math.random()*genericFriendSpaceAds.length)]);
	
	// Text Message
	if (Math.random() <= 1/250) updateTextMessage(chance.name(), genericTextMessages[Math.floor(Math.random()*genericTextMessages.length)], "default");
	
	// Wrong number message
	if (Math.random() <= 1/800) updateTextMessage(chance.phone(), genericWrongNumberMessages[Math.floor(Math.random()*genericWrongNumberMessages.length)], "default");
	
	
	// ---------------------------------------------------------
	// Random party events
	// ---------------------------------------------------------
	// Balloon popped
	if (gameData.supplies[gameInfo.BALLOON].amount >= 1 && gameData.party > 1 && Math.random() <= 1/1000) {
		updateTextMessage(chance.name(), "Sorry, I accidentally popped a balloon", "");
		gameData.supplies[gameInfo.BALLOON].amount -= 1;
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
}