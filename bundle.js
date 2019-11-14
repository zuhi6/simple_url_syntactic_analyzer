(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let { table, rules } = require('./table_and_rules');
const { transformTable } = require('./table_transform');


table = transformTable(table);

let url = '';

const startRule = ["A"];

let trace = [];
let previousRules = [];

showTable = (trace) => {
    let traceTable = document.getElementById("trace-table");
   
    trace = trace.replace(/\$/g,'$,').split(',').reduce((result, value, index, array) =>{
        if (index % 2 === 0)
          result.push(array.slice(index, index + 2));
        return result;
      }, []);

    trace = [...new Set(trace.map(trace => trace.toString()))].map(distinct => distinct.split(","));
    
    let rows = ''

    trace.forEach(([rule, url]) => {
        if(!url) return;
        rows += `<tr>
                    <td width='184' height='52'>
                    ${rule}
                    </td>
                    <td width='184' height='52'>
                    ${url}
                    </td>                    
                 <tr>`
    })
    traceTable.style.display = "block";
    document.getElementById("trace-tbody").innerHTML = rows;
}

checkUrls = () => {

    let urls = document.getElementById("urls").value.trim().split("|").filter(url => url.length);
    let table = document.getElementById("table")

    document.getElementById("trace-table").style.display = "none";



    const [firstUrl] = urls;

    if (!firstUrl) {
        table.style.display = "none";
        return;
    }

    urls = urls.map(urlItem => {
        trace = [];
        url = `${urlItem}$`;
        return { url: urlItem, result: iterateUrl(startRule), trace: trace}
    });

    let rows = ''
    
    urls.forEach(url => {
        const color = url.result ? 'lightgreen' : 'red';
        rows += `<tr>
                    <td width='184' height='52'>
                    <mark style="background-color: ${color}">${url.url}<mark>
                    </td>
                    <td width='184' height='52'>
                    ${url.result}
                    </td>
                    <td>
						<input type=button value="Show Trace" onclick="showTable('${url.trace.join('')}')" style="width:100%">
					</td>
                    
                 <tr>`
    })

    table.style.display = "block";
    document.getElementById("tbody").innerHTML = rows;

}

const iterateUrl = (ruleArr, previousFirstRule, regExpression) => {

    //Get first nonterminal or terminal symbol from rule array
    let [[firstNonTerm]] = ruleArr;

    //Get first character of the remaining url to by analyzed
    let [firstChar] = url;

    trace.push([ruleArr.join(''), url]);
    //Check if they are equal if yes we are removing them from url and rule array
    if (firstNonTerm == firstChar) {

        const tableObj = table[startRule][firstChar];
        const baseLength = (previousFirstRule == startRule) ? tableObj.base.length : 1;

        //If the firstNonTerm character doesn't matche regexExpression '[A-Z]' we are cutting
        !firstNonTerm.match(new RegExp('[A-Z]')) && (ruleArr = ruleArr.join('').substr(baseLength).split(''))
            && (url = url.substr(baseLength));

    } else if (regExpression) {
        // if there is regExpression present from last recursion we try to match the regex if true we are cutting 
        firstChar.match(regExpression) && ruleArr.shift() && (url = url.substr(1))

    } else if (!firstNonTerm && ruleArr.length != 1) {
        //epsilon rule -> just remove empty element at the start and run recursion again
        ruleArr.shift();
        return iterateUrl(ruleArr, previousFirstRule, regExpression);
    }

    /*need to run join.split everytime in case non of the above conditions are true,
     so if there is new rule non terminal symbols are seperated*/
    ruleArr = ruleArr.join('').split('');

    //updating firstChar and firstNonTerm with new characters after cutting
    [firstChar] = url;
    [firstNonTerm] = ruleArr;

    // if we hit the $ sign we check if there are no rules left if not we check for url length if there is only dollar sign left we return true
    if (firstChar == "$" && !ruleArr.length) {
        return url.length == 1 ? true : false;
    }

    // if there is no rule that gets us to terminal symbol in url we return false
    if (!(table[firstNonTerm] && table[firstNonTerm][firstChar])) {
        return false;
    }

    //applying new rule
    const newRule = table[firstNonTerm][firstChar].rule ? rules[table[firstNonTerm][firstChar].rule]
        : rules[table[firstNonTerm][firstChar]];

    //updating first element of rules array               
    ruleArr.splice(0, 1, newRule);

    //check if new rule is regular expression if so we send it in recursion else we send it as null
    regExpression = (newRule == '[A-Za-z]' || newRule == '[0-9]') ? new RegExp(newRule) : null

    return iterateUrl(ruleArr, firstNonTerm, regExpression)

}


},{"./table_and_rules":2,"./table_transform":3}],2:[function(require,module,exports){

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
        "pismeno_alebo_cislo" : 10 
    },
    "E" : {
        ":" : 11,
        "@" : 12
    },
    "F" : {
        "pismeno_alebo_cislo" : 13
    },
    "G" : {
        ":" : 14,
        "/" : 15,
        "?" : 15,
        "$" : 15
    },
    "H" : {
        "pismeno_alebo_cislo" : 16 
    },
    "I" : {
        "." : 17,
        "/" : 18,
        ":" : 18,
        "?" : 18,
        "$" : 18
    },
    "J" : {
        "pismeno_alebo_cislo" : 19,
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
},{}],3:[function(require,module,exports){

transformTable = (table) => {

    let lowerCase = new Array(26).fill(0).map((item, index) => String.fromCharCode(index + 97));
    let upperCase = new Array(26).fill(0).map((item, index) => String.fromCharCode(index + 65));
    let numbers = new Array(10).fill(0).map((item, index) => index);

    for (let key in table) {
        for (let subKey in table[key]) {
            (subKey == "pismeno_alebo_cislo" && addNewKeys([lowerCase, upperCase, numbers], table, key, subKey)) ||
            (subKey == "pismeno" && addNewKeys([lowerCase, upperCase], table, key, subKey)) ||
            (subKey == "cislo" && addNewKeys([numbers], table, key, subKey));
        }
    }
    return table;
}

addNewKeys = (arrays, table, key, subKey) => {
    arrays.forEach(arr => arr.forEach(item => {
        table[key][item.toString()] = table[key][subKey]
    }))
    delete table[key][subKey];
}

module.exports = { transformTable }


},{}]},{},[1]);
