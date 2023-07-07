"use strict";
var randomEvents;
(function (randomEvents) {
    function friendSpacePost(militaryTime) {
        if (Math.random() <= 1 / 200) {
            let post = DIALOGUE_FRIENDSPACE_POST[Math.floor(Math.random() * DIALOGUE_FRIENDSPACE_POST.length)];
            for (let i = 1; i < 4; i++) {
                if (Math.random() <= 1 / (i * 5)) {
                    post += ` #${DIALOGUE_FRIENDSPACE_HASHTAG[Math.floor(Math.random() * DIALOGUE_FRIENDSPACE_HASHTAG.length)]}`;
                }
            }
            Social.updateFriendSpaceFeed(chance.name(), chance.city() + ", " + chance.country(), post, militaryTime);
        }
        if (Math.random() <= 1 / 500) {
            Social.updateFriendSpaceFeed("Advertisement", "Sponsored", DIALOGUE_FRIENDSPACE_AD[Math.floor(Math.random() * DIALOGUE_FRIENDSPACE_AD.length)], militaryTime);
        }
    }
    randomEvents.friendSpacePost = friendSpacePost;
    function friendSpacePostLiked() {
        var _a;
        let posts = document.getElementsByClassName("friendSpacePost");
        if (posts.length > 0) {
            let frequency = Math.min(Math.max(0.5 * Math.sqrt(posts.length), 1.05), 98);
            if (Math.random() >= 1 / frequency) {
                let post = posts[Math.floor(Math.random() * posts.length)];
                (_a = post.querySelector('.likeBox')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
                let likeCount = post.querySelector('.likeCount');
                let likes = parseInt(likeCount.innerHTML);
                let likePrefix = post.querySelector('.likePrefix');
                let likeSuffix = post.querySelector('.likeSuffix');
                likes += 1;
                if (likes == 1) {
                    likePrefix.textContent = `${chance.name()}`;
                    likeCount.textContent = `${likes}`;
                    likeSuffix.textContent = ' liked this';
                }
                else if (likes == 2) {
                    likePrefix.textContent += ` and ${chance.name()}`;
                    likeCount.textContent = `${likes}`;
                    likeSuffix.textContent = ' liked this';
                }
                else if (likes == 3) {
                    likePrefix.textContent = likePrefix.textContent.replace(' and', ',');
                    likePrefix.textContent += ` and `;
                    likeCount.textContent = `${likes}`;
                    likeSuffix.textContent = ' other liked this';
                    likeCount.classList.remove('hidden');
                }
                else if (likes == 4) {
                    likeCount.textContent = `${likes}`;
                    likeSuffix.textContent = likeSuffix.textContent.replace('other', 'others');
                }
                else {
                    likeCount.textContent = `${likes}`;
                }
            }
        }
    }
    randomEvents.friendSpacePostLiked = friendSpacePostLiked;
    function textMessage(partyGoers, militaryTime) {
        if (Math.random() <= 1 / 100 && partyGoers.length > 0) {
            Social.updateTextMessage(partyGoers[Math.floor(Math.random() * (partyGoers.length))], DIALOGUE_PARTY_GOER_TEXT[Math.floor(Math.random() * DIALOGUE_PARTY_GOER_TEXT.length)], "partyGoerMessage", militaryTime);
        }
        if (Math.random() <= 1 / 300) {
            Social.updateTextMessage(chance.name(), DIALOGUE_TEXT_MESSAGE[Math.floor(Math.random() * DIALOGUE_TEXT_MESSAGE.length)], "defaultMessage", militaryTime);
        }
        if (Math.random() <= 1 / 1000) {
            Social.updateTextMessage("Unknown", DIALOGUE_WRONG_NUMBER[Math.floor(Math.random() * DIALOGUE_WRONG_NUMBER.length)], "defaultMessage", militaryTime);
        }
    }
    randomEvents.textMessage = textMessage;
})(randomEvents || (randomEvents = {}));
