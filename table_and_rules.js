
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
        "letter_or_number" : 10 
    },
    "E" : {
        ":" : 11,
        "@" : 12
    },
    "F" : {
        "letter_or_number" : 13
    },
    "G" : {
        ":" : 14,
        "/" : 15,
        "?" : 15,
        "$" : 15
    },
    "H" : {
        "letter_or_number" : 16 
    },
    "I" : {
        "." : 17,
        "/" : 18,
        ":" : 18,
        "?" : 18,
        "$" : 18
    },
    "J" : {
        "letter_or_number" : 19,
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
        "letter_or_number" : 22
    },
    "M" : {
        "+" : 23,
        "$" : 24
    },
    "N" : {
        "letter_or_number" : 25,
        "/" : 26,
        "?" : 26,
        "$" : 26
    },
    "O" : {
        "letter_or_number" : 27
    },
    "P" : {
        "letter_or_number" : 28,
        "+" : 29,
        "/" : 29,
        "." : 29,
        ":" : 29,
        "@" : 29,
        "?" : 29,
        "$" : 29
    },
    "Q" : {
        "letter" : 30,
        "number" : 31
    },
    "R" : {
        "number" : 32
    },
    "S" : {
        "number" : 33,
        "/" : 34,
        "?" : 34,
        "$" : 34
    },
    "T" : {
        "number" : 35
    },
    "U" : {
        "letter" : 36
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