namespace randomEvents {
	// =============================================================
	// FriendZone Post
	// =============================================================
	export function friendZonePost(militaryTime: boolean) {
		// FriendZone update
		if (Math.random() <= 1/200) {
			let post:string = DIALOGUE_FRIENDSPACE_POST[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_POST.length)];

			// There is a 20% chance, then 10% chance, then 6.66% chance a hashtag gets added.
			for (let i = 1; i < 4; i++) {
				if (Math.random() <= 1 / (i * 5)) {
					post += ` #${DIALOGUE_FRIENDSPACE_HASHTAG[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_HASHTAG.length)]}`
				}
			}

			Social.updateFriendZoneFeed(
				chance.name(),
				chance.city() + ", " + chance.country(),
				post,
				militaryTime
			);
		}
		
		// FriendZone ad
		if (Math.random() <= 1/500) {
			Social.updateFriendZoneFeed(
				"Advertisement",
				"Sponsored",
				DIALOGUE_FRIENDSPACE_AD[Math.floor(Math.random()*DIALOGUE_FRIENDSPACE_AD.length)],
				militaryTime
			);
		}
	}

	// FriendZone likes
	export function friendZonePostLiked() {
		let posts = document.getElementsByClassName("friendZonePost")!;

		if (posts.length > 0) {
			// Has a 5% chance of ever happening, maxing out at 98% chance at around 100 posts.
			let frequency: number = Math.min(Math.max(0.5 * Math.sqrt(posts.length), 1.05), 98);

			if (Math.random() >= 1 / frequency) {
				let post = posts[Math.floor(Math.random() * posts.length)];
				post.querySelector('.likeBox')?.classList.remove('hidden');
				
				let likeCount = post.querySelector('.likeCount')!;
				let likes = parseInt(likeCount.innerHTML);
				let likePrefix = post.querySelector('.likePrefix')!;
				let likeSuffix = post.querySelector('.likeSuffix')!;
				
				likes += 1;

				// Build out "Blank, Blank and 50 others liked this"
				if (likes == 1) {
					likePrefix.textContent = `${chance.name()}`;
					likeCount.textContent = `${likes}`;
					likeSuffix.textContent = ' liked this';
				} else if (likes == 2) {
					likePrefix.textContent += ` and ${chance.name()}`;
					likeCount.textContent = `${likes}`;
					likeSuffix.textContent = ' liked this';
				} else if (likes == 3) {
					likePrefix.textContent = likePrefix.textContent!.replace(' and', ',');
					likePrefix.textContent += ` and `;
					likeCount.textContent = `${likes}`;
					likeSuffix.textContent = ' other liked this';
					likeCount.classList.remove('hidden');
				} else if (likes == 4) {
					likeCount.textContent = `${likes}`;
					likeSuffix.textContent = likeSuffix.textContent!.replace('other', 'others');
				} else {
					likeCount.textContent = `${likes}`;
				}
			}
		}
	}

	// =============================================================
	// Receive Text Message
	// =============================================================
	export function textMessage(partyGoers: string[], militaryTime: boolean) {
		// Text from party goer
		if (Math.random() <= 1/100 && partyGoers.length > 0) {
			Social.updateTextMessage(
				partyGoers[Math.floor(Math.random() * (partyGoers.length))],
				DIALOGUE_PARTY_GOER_TEXT[Math.floor(Math.random()*DIALOGUE_PARTY_GOER_TEXT.length)],
				MessageType.Party,
				militaryTime
			);
		}

		// Generic text message
		if (Math.random() <= 1/300) {
			Social.updateTextMessage(
				chance.name(),
				DIALOGUE_TEXT_MESSAGE[Math.floor(Math.random()*DIALOGUE_TEXT_MESSAGE.length)],
				MessageType.Default,
				militaryTime
			);
		}
		
		// Wrong number message
		if (Math.random() <= 1/1000) {
			Social.updateTextMessage(
				"Unknown",
				DIALOGUE_WRONG_NUMBER[Math.floor(Math.random()*DIALOGUE_WRONG_NUMBER.length)],
				MessageType.Default,
				militaryTime
			);
		}
	}

	// =============================================================
	// Party Events
	// =============================================================
	/*
	export function partyEvents(gameSave: any) {
		// Someone stole money from you
		if (gameSave.party > 2 && gameSave.karma < 0 && Math.random() <= 1/(1000 - (gameSave.karma * 10))) {
			let maxStolenCash = Math.min(gameSave.money, Math.random() * (gameSave.money / (10 * gameSave.karma)));
			let minStolenCash = Math.min(maxStolenCash, Math.random() * (gameSave.money / (15 * gameSave.luck)));

			let stolenMoney = (Math.random() * (maxStolenCash - minStolenCash) + minStolenCash);
			stolenMoney = Utilities.cleanNumber(stolenMoney, 2);
			stolenMoney = Math.max(stolenMoney, 0.01);
			gameSave.money -= stolenMoney;
			
			Utilities.statChange("money", -stolenMoney);
			UI.updateStatDisplay(gameSave.party, gameSave.partyCapacity, gameSave.money);
			Social.updateTextMessage(
				gameSave.partyGoers[Math.floor(Math.random() * (gameSave.partyGoers.length))],
				`I think I just saw ${gameSave.partyGoers[Math.floor(Math.random() * (gameSave.partyGoers.length))]} steal money from you...`,
				MessageType.Party,
				gameSave.militaryTime
			)

			// DEBUG
			console.log(`Stolen Money: $${stolenMoney} (Min: $${minStolenCash.toFixed(2)}, Max: $${maxStolenCash.toFixed(2)})`);
		}

		// Someone is contributing to the pizza fund
		if (gameSave.party > 1 && Math.random() <= 1/800) {
			let maxPizzaMoney = Math.min(gameSave.money, Math.random() * (gameSave.money / (10 * gameSave.karma)));
			let minPizzaMoney = Math.min(maxPizzaMoney, Math.random() * (gameSave.money / (15 * gameSave.luck)));

			let pizzaMoney = (Math.random() * (maxPizzaMoney - minPizzaMoney) + minPizzaMoney);
			pizzaMoney = Utilities.cleanNumber(pizzaMoney, 2);
			pizzaMoney = Math.max(pizzaMoney, 0.01);
			gameSave.money -= pizzaMoney;

			Utilities.statChange("money", pizzaMoney);
			UI.updateStatDisplay(gameSave.party, gameSave.partyCapacity, gameSave.money);
			Social.updateTextMessage(
				gameSave.partyGoers[Math.floor(Math.random() * (gameSave.partyGoers.length))],
				`Yo I hear there was a pizza fund going around? Here's my contribution. I love pizza.`,
				MessageType.Party,
				gameSave.militaryTime
			)

			// DEBUG
			console.log(`Pizza Money: $${pizzaMoney} (Min: $${minPizzaMoney.toFixed(2)}, Max: $${maxPizzaMoney.toFixed(2)})`);
		}

		return gameSave;
	}
	*/
}