"use strict";
var Social;
(function (Social) {
    function updateTextMessage(name, message, type, militaryTime) {
        UI.appNotification("messagesApp");
        let newItem = document.createElement("LI");
        newItem.classList.add(type);
        newItem.innerHTML = `
			<b>${name}</b></br>
			<p>${message}</p>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; SMS
		`;
        let list = document.getElementById("textMessages");
        list.insertBefore(newItem, list.childNodes[0]);
    }
    Social.updateTextMessage = updateTextMessage;
    function updateFriendZoneFeed(name, locationFrom, message, militaryTime) {
        UI.appNotification("friendZoneApp");
        let newItem = document.createElement("LI");
        newItem.classList.add('friendZonePost');
        newItem.innerHTML = `
			<b>${name}</b></br>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; ${locationFrom}</small></br>
			<p>${message}</p>
			<div class="likeBox hidden"><i class="fa-solid fa-thumbs-up"></i><span class="likePrefix"></span><span class="likeCount hidden">0</span><span class="likeSuffix"></span></div>
			<small>Like &#8226; Comment &#8226; Share
		`;
        let list = document.getElementById("friendZoneFeed");
        if (document.querySelector(`.appContainer[data-app="friendZoneApp"]`).classList.contains('hidden')) {
            if (document.getElementById("oldPostsHeader")) {
                list.insertBefore(newItem, list.childNodes[0]);
            }
            else {
                let oldPostHeader = document.createElement("LI");
                oldPostHeader.id = "oldPostsHeader";
                oldPostHeader.innerHTML = `<h3>Older Posts</h3>`;
                list.insertBefore(oldPostHeader, list.childNodes[0]);
                list.insertBefore(newItem, list.childNodes[0]);
            }
        }
        else {
            list.insertBefore(newItem, list.childNodes[0]);
        }
    }
    Social.updateFriendZoneFeed = updateFriendZoneFeed;
})(Social || (Social = {}));
