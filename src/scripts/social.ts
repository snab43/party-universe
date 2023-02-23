namespace Social {
	export function updateTextMessage(name: string, message: string, type: string, militaryTime: boolean) {
		let newItem = document.createElement("LI");
		newItem.classList.add(type);
		newItem.innerHTML = `
			<b>${name}</b></br>
			<p>${message}</p>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; SMS
		`;
	
		let list = document.getElementById("textMessages")!;

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
	}
	
	export function updateFriendSpaceFeed(name: string, locationFrom: string, message: string, militaryTime: boolean) {
		let newItem = document.createElement("LI");
	
		newItem.innerHTML = `
			<b>${name}</b></br>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; ${locationFrom}</small></br>
			<p>${message}</p>
			<small>Like &#8226; Comment &#8226; Share
		`;
	
		let list = document.getElementById("friendSpaceFeed")!;

		if (document.querySelector(`.appContainer[data-app="friendSpaceApp"]`)!.classList.contains('hidden')) {
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