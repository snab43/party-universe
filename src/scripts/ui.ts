// =============================================================
// ui.ts
// -------------------------------------------------------------
// Functions that pertain to setting up and managing the UI
// =============================================================

// Phone Navigation
let appIcons = document.getElementsByClassName("appImg");
let appContainers = document.getElementsByClassName("appContainer");

Array.from(appIcons).forEach(element => {
	element.addEventListener('click', event => {
		openApp(event.target as HTMLImageElement);
	});
});

function openApp(appIcon: HTMLImageElement) {
	Array.from(appContainers).forEach(appContainer => {
		if (appContainer.getAttribute("data-app") == appIcon.getAttribute("data-app")) {
			appContainer.classList.toggle("hidden");
			//appIcon.classList.toggle("activeApp");
		} else {
			appContainer.classList.add("hidden");
		}
	});
}

// Copyright Year
document.getElementById("copyrightYear")!.innerText = <string><unknown>(new Date()).getFullYear();