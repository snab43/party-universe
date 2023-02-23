// =============================================================
// gameInfo.ts
// -------------------------------------------------------------
// Baseline game info that is used for adding items and other
// information about the game. All this data shouldn't be
// changed.
// =============================================================

// =============================================================
// Variables
// -------------------------------------------------------------
const TEXT_COST = 0.25;
const GAME_VERSION = '0.0.4';


// =============================================================
// Enums
// -------------------------------------------------------------

const enum MessageType {
	Key = 'keyMessage',
	Accept = 'acceptanceMessage',
	Reject = 'rejectionMessage',
	Party = 'partyGoerMessage',
	Default = 'defaultMessage'
}

const enum Gender {
	None = -1,
	B5 = 0,
	B4 = 0.1,
	B3 = 0.2,
	B2 = 0.3,
	B1 = 0.4,
	NE = 0.5,
	P1 = 0.6,
	P2 = 0.7,
	P3 = 0.8,
	P4 = 0.9,
	P5 = 1
}

const enum Species {
	None = 'none',
	Human = 'human',
	Cat = 'cat',
	Dog = 'dog',
	Vampire = 'vampire',
	Ghost = 'ghost',
	Alien = 'alien'
}

const enum Age {
	None = 'none',
	Child = 'child',
	Adolescent = 'adolescent',
	Adult = 'adult',
	Senior = 'senior',
	Immortal = 'immortal'
}

const enum Tribe {
	None = 'none',
	Leader = 'leader',
	Rebel = 'rebel',
	Artist = 'artist',
	Builder = 'builder',
	Jester = 'jester',
	Caregiver = 'caregiver',
	Everyman = 'everyman'
}


// =============================================================
// Food Items
// -------------------------------------------------------------

interface FoodItem {
	id: string,
	name: string,
	cost: number,
	genderWeight: number[],
	speciesWeight: string[],
	ageWeight: string[],
	tribeWeight: string[]
}

const FOOD_STATS: FoodItem[] = [
	{
		id: "nachos",
		name: "Nachos",
		cost: 5,
		genderWeight: [Gender.None],
		speciesWeight: [Species.Human],
		ageWeight: [Age.Child, Age.Adolescent, Age.Adult],
		tribeWeight: [Tribe.Everyman]
	},
	{
		id: "hotdog",
		name: "Hotdog",
		cost: 7,
		genderWeight: [Gender.B5, Gender.B4, Gender.B3, Gender.B2],
		speciesWeight: [Species.Human],
		ageWeight: [Age.Child, Age.Adolescent],
		tribeWeight: [Tribe.Everyman, Tribe.Jester]
	},
	{
		id: "deviledEgg",
		name: "Deviled Egg",
		cost: 15,
		genderWeight: [Gender.P5, Gender.P4, Gender.P3],
		speciesWeight: [Species.Human],
		ageWeight: [Age.Senior],
		tribeWeight: [Tribe.Everyman, Tribe.Caregiver]
	},
	{
		id: "chickenNugget",
		name: "Chicken Nugget",
		cost: 25,
		genderWeight: [Gender.B5, Gender.B4, Gender.B3],
		speciesWeight: [Species.Human],
		ageWeight: [Age.Child],
		tribeWeight: [Tribe.Rebel]
	},
	{
		id: "hummus",
		name: "Hummus",
		cost: 40,
		genderWeight: [Gender.None],
		speciesWeight: [Species.Human],
		ageWeight: [Age.Adult],
		tribeWeight: [Tribe.Artist]
	}
]


// =============================================================
// Drink Items
// -------------------------------------------------------------

interface DrinkItem {
	id: string,
	name: string,
	cost: number,
	genderWeight: number[],
	speciesWeight: string[],
	ageWeight: string[],
	tribeWeight: string[]
}

const DRINK_STATS: DrinkItem[] = [
	{
		id: "water",
		name: "Water",
		cost: 1,
		genderWeight: [Gender.None],
		speciesWeight: [Species.None],
		ageWeight: [Age.None],
		tribeWeight: [Tribe.None]
	},
	{
		id: "soda",
		name: "Soda",
		cost: 5,
		genderWeight: [Gender.B5, Gender.B4, Gender.B3],
		speciesWeight: [Species.Human],
		ageWeight: [Age.Child, Age.Adolescent],
		tribeWeight: [Tribe.Everyman, Tribe.Jester]
	},
	{
		id: "milk",
		name: "Milk",
		cost: 15,
		genderWeight: [Gender.None],
		speciesWeight: [Species.Human, Species.Cat],
		ageWeight: [Age.Child],
		tribeWeight: [Tribe.Everyman, Tribe.Leader, Tribe.Caregiver]
	},
	{
		id: "blood",
		name: "Blood",
		cost: 1000,
		genderWeight: [Gender.None],
		speciesWeight: [Species.Vampire],
		ageWeight: [Age.None],
		tribeWeight: [Tribe.Rebel]
	}
]


// =============================================================
// Decoration Items
// -------------------------------------------------------------

interface DecorationItem {
	id: string,
	name: string,
	cost: number,
	genderWeight: number[],
	speciesWeight: string[],
	ageWeight: string[],
	tribeWeight: string[]
}

const DECORATION_STATS: DecorationItem[] = [
	{
		id: "balloon",
		name: "Balloon",
		cost: 0.25,
		genderWeight: [Gender.None],
		speciesWeight: [Species.None],
		ageWeight: [Age.None],
		tribeWeight: [Tribe.None]
	}
]


// =============================================================
// Activity Items
// -------------------------------------------------------------

interface ActivityItem {
	id: string,
	name: string,
	cost: number,
	genderWeight: number[],
	speciesWeight: string[],
	ageWeight: string[],
	tribeWeight: string[]
}

const ACTIVITY_STATS: ActivityItem[] = [
	{
		id: "cards",
		name: "Cards",
		cost: 3,
		genderWeight: [Gender.None],
		speciesWeight: [Species.None],
		ageWeight: [Age.None],
		tribeWeight: [Tribe.None]
	}
]


// =============================================================
// Promotions
// -------------------------------------------------------------

interface Promotion {
	id: string,
	name: string,
	cost: number,
	costPerTick: number,
	genderWeight: number[],
	speciesWeight: string[],
	ageWeight: string[],
	tribeWeight: string[]
}

const PROMOTION_STATS: Promotion[] = [
	{
		id: "friendSpaceAd",
		name: "FriendSpace Ad",
		cost: 100,
		costPerTick: 2,
		genderWeight: [Gender.None],
		speciesWeight: [Species.None],
		ageWeight: [Age.None],
		tribeWeight: [Tribe.None]
	}
]


// =============================================================
// Venues
// -------------------------------------------------------------

interface Venue {
	id: string,
	name: string,
	capacity: number,
	cost: number,
	rent: number,
	genderWeight: number[],
	speciesWeight: string[],
	ageWeight: string[],
	tribeWeight: string[]
}

const VENUE_STATS: Venue[] = [
	{
		id: "basement",
		name: "Basement",
		capacity: 50,
		cost: 2000,
		rent: 5,
		genderWeight: [Gender.None],
		speciesWeight: [Species.None],
		ageWeight: [Age.None],
		tribeWeight: [Tribe.None]
	}
]

/*
const ITEM_STATS: any = {	
	// Food

	// Supplies
	decorations: {
		100: {
			id: "balloon",
			name: "Balloon",
			description: "Every party has to have balloons, right?",
			cost: 0.25,
			lit: 0,
			swag: -2
		},
		101: {
			id: "snack",
			name: "Snack",
			description: "Just your generic looking snack.",
			cost: 10,
			lit: -2,
			swag: 0
		},
		102: {
			id: "sodaPongTable",
			name: "Soda Pong Table",
			description: "Try playing doubles!",
			cost: 50,
			lit: 5,
			swag: 2
		},
		103: {
			id: "strobeLight",
			name: "Strobe Light",
			description: "I think I'm gonna be sick...",
			cost: 150,
			lit: 25,
			swag: 10
		},
		104: {
			id: "djEquipment",
			name: "DJ Equipment",
			description: "Play freebird (dubstep remix)!",
			cost: 600,
			lit: 30,
			swag: 20
		},
		105: {
			id: "televisionSet",
			name: "Television Set",
			description: "What channel's the game?",
			cost: 1500,
			lit: 10,
			swag: 10
		},
		106: {
			id: "bounceHouse",
			name: "Bounce House",
			description: "Pairs really well with some booze.",
			cost: 4000,
			lit: 50,
			swag: 0
		},
		107: {
			id: "tiger",
			name: "Tiger",
			description: "Be careful, he bites.",
			cost: 20000,
			lit: 100,
			swag: 200
		}
	},
	drinks: {
		200: {
			id: "tapWater",
			name: "Tap Water",
			description: "It's an essential part of life, and a party (also it's basically free).",
			cost: 0.01,
			lit: 1,
			swag: 1
		},
		201: {
			id: "bottledWater",
			name: "Bottled Water",
			description: "Straight from the mountains.",
			cost: 4,
			lit: 2,
			swag: 1
		},
		202: {
			id: "soda",
			name: "Soda",
			description: "Don't drink your calories.",
			cost: 12,
			lit: 1,
			swag: 5
		},
		203: {
			id: "dietSoda",
			name: "Diet Soda",
			description: "Now we can drink all the soda we want!",
			cost: 30,
			lit: 20,
			swag: 3
		},
		204: {
			id: "rootBeer",
			name: "Root Beer",
			description: "Let's not get too crazy here.",
			cost: 100,
			lit: 5,
			swag: 1
		},
		205: {
			id: "milk",
			name: "Milk",
			description: "You wouldn't think it, but milk is an essential part of all parties.",
			cost: 250,
			lit: 100,
			swag: 1
		},
		206: {
			id: "sparklingWater",
			name: "Sparkling Water",
			description: "All class.",
			cost: 1000,
			lit: 15,
			swag: 50
		},
		207: {
			id: "liquidMeteroite",
			name: "Liquid Meteorite",
			description: "Who in this world would drink this stuff?",
			cost: 50000,
			lit: 100,
			swag: 100
		}
	},
	promotions: {
		300: {
			id: "friendSpaceAd",
			name: "FriendSpace Ad",
			description: "Guaranteed to get you clicks.",
			cost: 100,
			duration: 7200, // 2 hours
			pull: 5
		},
		301: {
			id: "sponsoredPost",
			name: "Sponsored Post",
			description: "Influencers love to promote parties.",
			cost: 500,
			duration: 3600, // 1 hour
			pull: 10
		},
		302: {
			id: "hireADJ",
			name: "Hire a DJ",
			description: "You need someone spinning the best hits for a party.",
			cost: 2000,
			duration: 1800, // 30 minutes
			pull: 50
		},
		303: {
			id: "hireABand",
			name: "Hire a Band",
			description: "Hope you don't mind them selling merch at the front door.",
			cost: 8000,
			duration: 1200, // 20 minutes
			pull: 80
		},
		304: {
			id: "celebrityGuestAppearance",
			name: "Celebrity Guest Appearance",
			description: "They don't stay long, but the pull is insane.",
			cost: 50000,
			duration: 300, // 5 minutes
			pull: 300
		},
		305: {
			id: "satelliteSignal",
			name: "Satellite Signal",
			description: "I want to believe",
			cost: 10000000,
			duration: 60, // 1 minute
			pull: 1
		}
	},
	venues: {
		400: {
			id: "house",
			name: "House",
			description: "Two stories for more party room!",
			cost: 5000,
			capacity: 100,
			rent: 5,
			swag: 1
		},
		401: {
			id: "mansion",
			name: "Mansion",
			description: "Now we're getting classy.",
			cost: 10000,
			capacity: 300,
			rent: 50,
			swag: 30
		},
		402: {
			id: "yacht",
			name: "Yacht",
			description: "All about the S.S. Party!",
			cost: 25000,
			capacity: 800,
			rent: 300,
			swag: 50
		},
		403: {
			id: "warehouse",
			name: "Warehouse",
			description: "It's kinda sketch, but you can fit a lot of people in.",
			cost: 40000,
			capacity: 2000,
			rent: 200,
			swag: -30
		},
		404: {
			id: "airplaneHangar",
			name: "Airplane Hangar",
			description: "Now we really have space to party!",
			cost: 100000,
			capacity: 10000,
			rent: 500,
			swag: 5
		},
		405: {
			id: "country",
			name: "Country",
			description: "I didn't know you could buy a country, just like that.",
			cost: 1000000,
			capacity: 500000,
			rent: 4000,
			swag: 100
		},
		406: {
			id: "planet",
			name: "Planet",
			description: "Party universe!",
			cost: 500000000,
			capacity: 8000000000,
			rent: 0,
			swag: 50000
		}
	}
};
*/