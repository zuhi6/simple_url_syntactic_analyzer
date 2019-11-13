
const table = {
    "A": {
        "h": {
            rule: 1,
            base : "http://"
        },
        "f": {
            rule: 2,
            base : "ftp://"
        },
        "t": {
            rule : 3,
            base : "telnet://"
        },
        "m":{
            rule : 4,
            base : "mailto::"
        }
    },
    "B": {
        "/" : 5,
        "?" : 6,
        "$" : 7
    },
    "C": {
        "?" : 8,
        "$" : 9
    },
    "D" : {
        "pismeno_alebo_cislo" : 10 // regex budeme riest ze to je aj cislo aj znak
    },
    "E" : {
        ":" : 11,
        "@" : 12
    },
    "F" : {
        "pismeno_alebo_cislo" : 13 // regex budeme riest ze to je aj cislo aj znak
    },
    "G" : {
        ":" : 14,
        "/" : 15,
        "?" : 15,
        "$" : 15
    },
    "H" : {
        "pismeno_alebo_cislo" : 16 // regex budeme riest ze to je aj cislo aj znak
    },
    "I" : {
        "." : 17,
        "/" : 18,
        ":" : 18,
        "?" : 18,
        "$" : 18
    },
    "J" : {
        "pismeno_alebo_cislo" : 19, // regex budeme riest ze to je aj cislo aj znak
        "/" : 19,
        "?" : 19,
        "$" : 19
    },
    "K" : {
        "/" : 20,
        "?" : 21,
        "$" : 21
    },
    "L" : {
        "pismeno_alebo_cislo" : 22
    },
    "M" : {
        "+" : 23,
        "$" : 24
    },
    "N" : {
        "pismeno_alebo_cislo" : 25,
        "/" : 26,
        "?" : 26,
        "$" : 26
    },
    "O" : {
        "pismeno_alebo_cislo" : 27
    },
    "P" : {
        "pismeno_alebo_cislo" : 28,
        "+" : 29,
        "/" : 29,
        "." : 29,
        ":" : 29,
        "@" : 29,
        "?" : 29,
        "$" : 29
    },
    "Q" : {
        "pismeno" : 30,
        "cislo" : 31
    },
    "R" : {
        "cislo" : 32
    },
    "S" : {
        "cislo" : 33,
        "/" : 34,
        "?" : 34,
        "$" : 34
    },
    "T" : {
        "cislo" : 35
    },
    "U" : {
        "pismeno" : 36
    }

    
}

const rules = {
    1: "http://FB",
    2: "ftp://D/J",
    3: "telnet://D",
    4: "mailto::O@H",
    5: "/JC",
    6: "?L",
    7: '',
    8: "?L",
    9: '',
    10: "OE@F",
    11: ":O",
    12: "",
    13: "HG",
    14: ":R",
    15: "",
    16: "OI",
    17: ".OI",
    18: "",
    19: "NK",
    20: "/NK",
    21: "",
    22: "OM",
    23: "+OM",
    24: "",
    25: "QN",
    26: "",
    27: "QP",
    28: "QP",
    29: "",
    30: "U",
    31: "T",
    32: "TS",
    33: "TS",
    34: "",
    35: "[0-9]",
    36: "[A-Za-z]"
}

module.exports = {table, rules}