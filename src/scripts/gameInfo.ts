// =============================================================
// Const Variables
// =============================================================
const MIN_CHANGE = 0.1;
const MAX_CHANGE = 0.25;
const TEXT_COST = 0.25;
const GAME_VERSION = '0.0.5';


// =============================================================
// Enums
// =============================================================
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
// =============================================================
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
// =============================================================
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
// =============================================================
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
// =============================================================
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
// =============================================================
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
		id: "friendZoneAd",
		name: "FriendZone Ad",
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
// =============================================================
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