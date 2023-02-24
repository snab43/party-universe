// =============================================================
// utilities.ts
// -------------------------------------------------------------
// Various utilitiy functions used across the game.
// Clout calculation, getting time, getting weekday, stat change
// animations.
// =============================================================

namespace Utilities {
	// =============================================================
	// Calculates the Clout value (100% cloud is "end game" and when
	// aliens start to notice your party).
	// =============================================================
	export function calculateClout(party: number, money: number): number {
		// Clout is: 75% party size (max 100,000,000), 25% money saved (max $10,000,000)
		// There's also a slight bend to it so it's not so linear.
		let partySizeCalc: number = (party)/100000000*0.75; // Result: 0 - 0.75
		let moneySavedCalc: number = money/10000000*0.25; // Result: 0 - 0.25
		
		let total: number = partySizeCalc + moneySavedCalc; // Result: 0 - 1
		
		// Bend the results
		let bendFactor: number = 0.1; // Between 0 - 1. The smaller the number, the stricter the bend (fast start, slow end)
		let calculation: number = -Math.pow((Math.pow(total, bendFactor) - 1), 2) + 1;	// Result 0 - 1

		return calculation;
	}

	// =============================================================
	// Get the current timestamp, returns either:
	// 8:20 PM or 20:20 depending on if militaryTime is true
	// =============================================================
	export function getHourMinuteTimeStamp(militaryTime: boolean): string {
		let date = new Date();
	
		let hours: number | string = date.getHours();
		let minutes: number | string = date.getMinutes();
		minutes = minutes < 10 ? '0' + minutes : minutes;
		
		let strTime: string;
		if (militaryTime) {
			strTime = hours + ':' + minutes;
		} else {
			let ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // The hour '0' should be '12'
			strTime  = hours + ':' + minutes + ' ' + ampm;
		}
	
		return strTime;
	}

	// =============================================================
	// Creates a stat change animation
	// =============================================================
	export function statChange(statID: string, amount: number): void {
		let stat = document.getElementById(statID)!;
		let statChange = document.createElement("DIV");

		switch (statID) {
			case "money": statChange.innerText = `$${Math.abs(amount).toFixed(2)}`; break;
			default: statChange.innerText = `${amount}`; break;
		}
		
		stat.parentNode!.appendChild(statChange);

		if (amount > 0) {
			statChange.classList.add('statChangeUp');
		} else if (amount < 0) {
			statChange.classList.add('statChangeDown');
		} else {
			console.log("ERROR: Somehow calculated $0.");
		}

		setTimeout(() => statChange.remove(), 490);
	}

	// Returns back the given number with decimal places removed
	export function cleanNumber(number: number, decimals: number): number {
		return (Math.trunc(number * (10 * decimals)) / (10 * decimals))
	}
}