namespace randomEvents {
	// =============================================================
	// FriendSpace Post
	// -------------------------------------------------------------
	export function friendSpacePost(militaryTime: boolean) {
		// FriendSpace update
		if (Math.random() <= 1/100) {
			Social.updateFriendSpaceFeed(
				chance.name(),
				chance.city() + ", " + chance.country(),
				DIALOGUE_FRIENDSPACE_POST[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_POST.length)],
				militaryTime
			);
			UI.appNotification("friendSpaceApp");
		}
		
		// FriendSpace ad
		if (Math.random() <= 1/500) {
			Social.updateFriendSpaceFeed(
				"Advertisement",
				"Sponsored",
				DIALOGUE_FRIENDSPACE_AD[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_AD.length)],
				militaryTime
			);
			UI.appNotification("friendSpaceApp");
		}
	}

	// =============================================================
	// Receive Text Message
	// -------------------------------------------------------------
	export function textMessage(partyGoers: string[], militaryTime: boolean) {
		// Text from party goer
		if (Math.random() <= 1/75) {
			Social.updateTextMessage(
				partyGoers[Math.floor(Math.random() * (partyGoers.length))],
				DIALOGUE_PARTY_GOER_TEXT[Math.floor(Math.random()*DIALOGUE_PARTY_GOER_TEXT.length)],
				MessageType.Party,
				militaryTime
			);
			UI.appNotification("messagesApp");
		}

		// Text message
		if (Math.random() <= 1/250) {
			Social.updateTextMessage(
				chance.name(),
				DIALOGUE_TEXT_MESSAGE[Math.floor(Math.random()*DIALOGUE_TEXT_MESSAGE.length)],
				MessageType.Default,
				militaryTime
			);
			UI.appNotification("messagesApp");
		}
		
		// Wrong number message
		if (Math.random() <= 1/800) {
			Social.updateTextMessage(
				"Unknown",
				DIALOGUE_WRONG_NUMBER[Math.floor(Math.random()*DIALOGUE_WRONG_NUMBER.length)],
				MessageType.Default,
				militaryTime
			);
			UI.appNotification("messagesApp");
		}
	}
		
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