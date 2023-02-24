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
    function partyEvents(gameSave) {
        if (gameSave.party > 2 && Math.random() <= 1 / (1000 + gameSave.karma * 100)) {
            let maxStolenCash = Math.min(gameSave.money, Math.random() * (gameSave.money / (10 * gameSave.karma)));
            let minStolenCash = Math.min(maxStolenCash, Math.random() * (gameSave.money / (15 * gameSave.luck)));
            let stolenMoney = (Math.random() * (maxStolenCash - minStolenCash) + minStolenCash);
            stolenMoney = Utilities.cleanNumber(stolenMoney, 2);
            stolenMoney = Math.max(stolenMoney, 0.01);
            gameSave.money -= stolenMoney;
            Utilities.statChange("money", -stolenMoney);
            UI.updateStatDisplay(gameSave.party, gameSave.partyCapacity, gameSave.money);
            Social.updateTextMessage(gameSave.partyGoers[Math.floor(Math.random() * (gameSave.partyGoers.length))], `I think I just saw ${gameSave.partyGoers[Math.floor(Math.random() * (gameSave.partyGoers.length))]} steal money from you...`, "partyGoerMessage", gameSave.militaryTime);
            console.log(`Stolen Money: $${stolenMoney} (Min: $${minStolenCash.toFixed(2)}, Max: $${maxStolenCash.toFixed(2)})`);
        }
        if (gameSave.party > 1 && Math.random() <= 1 / 800) {
            let maxPizzaMoney = Math.min(gameSave.money, Math.random() * (gameSave.money / (10 * gameSave.karma)));
            let minPizzaMoney = Math.min(maxPizzaMoney, Math.random() * (gameSave.money / (15 * gameSave.luck)));
            let pizzaMoney = (Math.random() * (maxPizzaMoney - minPizzaMoney) + minPizzaMoney);
            pizzaMoney = Utilities.cleanNumber(pizzaMoney, 2);
            pizzaMoney = Math.max(pizzaMoney, 0.01);
            gameSave.money -= pizzaMoney;
            Utilities.statChange("money", pizzaMoney);
            UI.updateStatDisplay(gameSave.party, gameSave.partyCapacity, gameSave.money);
            Social.updateTextMessage(gameSave.partyGoers[Math.floor(Math.random() * (gameSave.partyGoers.length))], `Yo I hear there was a pizza fund going around? Here's my contribution. I love pizza.`, "partyGoerMessage", gameSave.militaryTime);
            console.log(`Pizza Money: $${pizzaMoney} (Min: $${minPizzaMoney.toFixed(2)}, Max: $${maxPizzaMoney.toFixed(2)})`);
        }
        return gameSave;
    }
    randomEvents.partyEvents = partyEvents;
})(randomEvents || (randomEvents = {}));
