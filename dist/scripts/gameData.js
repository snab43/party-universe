"use strict";
// =============================================================
// gameData.ts
// -------------------------------------------------------------
// All the games data that's variable and can be changed. Also
// seen as the save data.
// =============================================================
let gameDataStats = {
    party: 1,
    partyCapacity: 100,
    money: 0.0,
    totalMoney: 0.0,
    doorFee: 0.0,
    clout: 0.0,
    lit: 0,
    swag: 0,
    pull: 0,
    karma: 0,
    luck: 0,
    rentTimer: 0,
    rentDuration: 300,
    digForChangeMod: 1,
    inviteMod: 1,
    music: "none",
};
let gameDataInventory = {
    supplies: {
        100: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        101: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        102: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        103: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        104: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        105: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        106: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        107: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        }
    },
    alcohol: {
        200: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        201: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        202: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        203: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        204: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        205: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        206: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        },
        207: {
            amount: 0,
            amountMod: 1,
            costMod: 1
        }
    },
    promotions: {
        300: {
            amount: 0,
            currentDuration: 0,
            amountMod: 1,
            costMod: 1,
            durationMod: 1,
            pullMod: 1
        },
        301: {
            amount: 0,
            currentDuration: 0,
            amountMod: 1,
            costMod: 1,
            durationMod: 1,
            pullMod: 1
        },
        302: {
            amount: 0,
            currentDuration: 0,
            amountMod: 1,
            costMod: 1,
            durationMod: 1,
            pullMod: 1
        },
        303: {
            amount: 0,
            currentDuration: 0,
            amountMod: 1,
            costMod: 1,
            durationMod: 1,
            pullMod: 1
        },
        304: {
            amount: 0,
            currentDuration: 0,
            amountMod: 1,
            costMod: 1,
            durationMod: 1,
            pullMod: 1
        },
        305: {
            amount: 0,
            currentDuration: 0,
            amountMod: 1,
            costMod: 1,
            durationMod: 1,
            pullMod: 1
        }
    },
    venues: {
        400: {
            amount: 0,
            amountMod: 1,
            costMod: 1,
            capacityMod: 1,
            rentMod: 1
        },
        401: {
            amount: 0,
            amountMod: 1,
            costMod: 1,
            capacityMod: 1,
            rentMod: 1
        },
        402: {
            amount: 0,
            amountMod: 1,
            costMod: 1,
            capacityMod: 1,
            rentMod: 1
        },
        403: {
            amount: 0,
            amountMod: 1,
            costMod: 1,
            capacityMod: 1,
            rentMod: 1
        },
        404: {
            amount: 0,
            amountMod: 1,
            costMod: 1,
            capacityMod: 1,
            rentMod: 1
        },
        405: {
            amount: 0,
            amountMod: 1,
            costMod: 1,
            capacityMod: 1,
            rentMod: 1
        },
        406: {
            amount: 0,
            amountMod: 1,
            costMod: 1,
            capacityMod: 1,
            rentMod: 1
        }
    }
};
let gameDataSettings = {
    militaryTime: false
};
