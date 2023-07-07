namespace Social {
	// =============================================================
	// Generates a text message and appends to the top of the list
	// =============================================================
	export function updateTextMessage(name: string, message: string, type: string, militaryTime: boolean) {
		// +1 Notification
		UI.appNotification("messagesApp");

		// Create the object
		let newItem = document.createElement("LI");
		newItem.classList.add(type);
		newItem.innerHTML = `
			<b>${name}</b></br>
			<p>${message}</p>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; SMS
		`;
	
		// Get the <ul> list
		let list = document.getElementById("textMessages")!;
		list.insertBefore(newItem, list.childNodes[0]);

		/*
		// If the messages app is hidden, create an "Older Messages" header and push that first.
		// If an "Older Messages" header exists, just push on top.
		// If the app is open, just push on top.
		// NOTE: The logic here is weird, possibly wrong?		
		if (document.querySelector(`.appContainer[data-app="messagesApp"]`)!.classList.contains('hidden')) {
			if (document.getElementById("oldMessagesHeader")) {
				list.insertBefore(newItem, list.childNodes[0]);
			} else {
				let oldMessageHeader = document.createElement("LI");
				oldMessageHeader.id = "oldMessagesHeader";
				oldMessageHeader.innerHTML = `<h3>Older Messages</h3>`;

				list.insertBefore(oldMessageHeader, list.childNodes[0]);
				list.insertBefore(newItem, list.childNodes[0]);
			}
		} else {
			list.insertBefore(newItem, list.childNodes[0]);
		}
		*/
	}
	
	// =============================================================
	// Generates a FriendZone post
	// =============================================================
	export function updateFriendZoneFeed(name: string, locationFrom: string, message: string, militaryTime: boolean) {
		// +1 Notification
		UI.appNotification("friendZoneApp");

		// Create the post object
		let newItem = document.createElement("LI");
		newItem.classList.add('friendZonePost');
		newItem.innerHTML = `
			<b>${name}</b></br>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; ${locationFrom}</small></br>
			<p>${message}</p>
			<div class="likeBox hidden"><i class="fa-solid fa-thumbs-up"></i><span class="likePrefix"></span><span class="likeCount hidden">0</span><span class="likeSuffix"></span></div>
			<small>Like &#8226; Comment &#8226; Share
		`;
	
		// Get the <ul> list
		let list = document.getElementById("friendZoneFeed")!;

		// If the FriendZone app is hidden, create an "Older Posts" header and push that first.
		// If an "Older Posts" header exists, just push on top.
		// If the app is open, just push on top.
		// NOTE: The logic here is weird, possibly wrong?
		if (document.querySelector(`.appContainer[data-app="friendZoneApp"]`)!.classList.contains('hidden')) {
			if (document.getElementById("oldPostsHeader")) {
				list.insertBefore(newItem, list.childNodes[0]);
			} else {
				let oldPostHeader = document.createElement("LI");
				oldPostHeader.id = "oldPostsHeader";
				oldPostHeader.innerHTML = `<h3>Older Posts</h3>`;

				list.insertBefore(oldPostHeader, list.childNodes[0]);
				list.insertBefore(newItem, list.childNodes[0]);
			}
		} else {
			list.insertBefore(newItem, list.childNodes[0]);
		}
	}
}