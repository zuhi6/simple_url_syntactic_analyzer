(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const { iterateUrl } = require('./simple_url_syntactic_analyzer');

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

    urls = urls.map(url=> {
        const {trace, result, recover} = iterateUrl(url);
        return { url , result, trace, recover};
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
                    <td width='184' height='52'>
                    ${url.recover}
                    </td>
                    
                 <tr>`
    })

    table.style.display = "block";
    document.getElementById("tbody").innerHTML = rows;

}
},{"./simple_url_syntactic_analyzer":3}],2:[function(require,module,exports){
'use strict';
module.exports = (function()
{
  function _min(d0, d1, d2, bx, ay)
  {
    return d0 < d1 || d2 < d1
        ? d0 > d2
            ? d2 + 1
            : d0 + 1
        : bx === ay
            ? d1
            : d1 + 1;
  }

  return function(a, b)
  {
    if (a === b) {
      return 0;
    }

    if (a.length > b.length) {
      var tmp = a;
      a = b;
      b = tmp;
    }

    var la = a.length;
    var lb = b.length;

    while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
      la--;
      lb--;
    }

    var offset = 0;

    while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
      offset++;
    }

    la -= offset;
    lb -= offset;

    if (la === 0 || lb < 3) {
      return lb;
    }

    var x = 0;
    var y;
    var d0;
    var d1;
    var d2;
    var d3;
    var dd;
    var dy;
    var ay;
    var bx0;
    var bx1;
    var bx2;
    var bx3;

    var vector = [];

    for (y = 0; y < la; y++) {
      vector.push(y + 1);
      vector.push(a.charCodeAt(offset + y));
    }

    var len = vector.length - 1;

    for (; x < lb - 3;) {
      bx0 = b.charCodeAt(offset + (d0 = x));
      bx1 = b.charCodeAt(offset + (d1 = x + 1));
      bx2 = b.charCodeAt(offset + (d2 = x + 2));
      bx3 = b.charCodeAt(offset + (d3 = x + 3));
      dd = (x += 4);
      for (y = 0; y < len; y += 2) {
        dy = vector[y];
        ay = vector[y + 1];
        d0 = _min(dy, d0, d1, bx0, ay);
        d1 = _min(d0, d1, d2, bx1, ay);
        d2 = _min(d1, d2, d3, bx2, ay);
        dd = _min(d2, d3, dd, bx3, ay);
        vector[y] = dd;
        d3 = d2;
        d2 = d1;
        d1 = d0;
        d0 = dy;
      }
    }

    for (; x < lb;) {
      bx0 = b.charCodeAt(offset + (d0 = x));
      dd = ++x;
      for (y = 0; y < len; y += 2) {
        dy = vector[y];
        vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
        d0 = dy;
      }
    }

    return dd;
  };
})();


},{}],3:[function(require,module,exports){
let { table, rules } = require('./table_and_rules');
const { transformTable } = require('./table_transform');
const levenshtein = require('js-levenshtein');


table = transformTable(table);

let url = '';

const startRule = ["A"];

let trace = [];

let recover = false;


const iterateUrl = (urlToAnalyze) => {

    url = `${urlToAnalyze}$`;
    trace = [];

    const result = _iterateUrl(startRule);

    return {
        trace,
        result,
        recover
    }

}
const _iterateUrl = (ruleArr, previousFirstRule, regExpression) => {

    // get first nonterminal or terminal symbol from rule array
    let [[firstNonTerm]] = ruleArr;

    // get first character of the remaining url to by analyzed
    let [firstChar] = url;

    trace.push([ruleArr.join(''), url]);
    // check if they are equal if yes we are removing them from url and rule array
    if (firstNonTerm == firstChar) {

        let baseLength = 1;

        if (previousFirstRule == startRule) {
           
            const tableObj = table[startRule][firstChar];
            baseLength = tableObj.base.length;
            if (tableObj && !url.startsWith(tableObj.base)) return false;

        }

        // if the firstNonTerm character doesn't matche regexExpression '[A-Z]' we are cutting
        !firstNonTerm.match(new RegExp('[A-Z]')) && (ruleArr = ruleArr.join('').substr(baseLength).split(''))
            && (url = url.substr(baseLength));

    } else if (regExpression) {
        // if there is regExpression present from last recursion we try to match the regex if true we are cutting 
        firstChar.match(regExpression) && ruleArr.shift() && (url = url.substr(1))

    } else if (!firstNonTerm && ruleArr.length != 1) {
        //epsilon rule -> just remove empty element at the start and run recursion again
        ruleArr.shift();
        return _iterateUrl(ruleArr, previousFirstRule, regExpression);
    }

    /* need to run join.split everytime in case non of the above conditions are true,
     so if there is new rule non terminal symbols are seperated */
    ruleArr = ruleArr.join('').split('');

    // updating firstChar and firstNonTerm with new characters after cutting
    [firstChar] = url;
    [firstNonTerm] = ruleArr;

    // if we hit the $ sign we check if there are no rules left if not we check for url length if there is only dollar sign left we return true
    if (firstChar == "$" && !ruleArr.length) {
        return (url.length == 1) ? true : false;
    }

    // if there is no rule that gets us to terminal symbol in url we return false
    if (!(table[firstNonTerm] && table[firstNonTerm][firstChar])) {
        return false;
    }

    // recover for the StartRule
    if(!previousFirstRule) {
        let min = Infinity;

        for (let key in table[startRule]) {
            const base = table[startRule][key].base;
            const editDist = levenshtein(base, url.slice(0, base.length));
            if(editDist < min) {
                min = editDist;
                firstChar =  key;
                recover = min == 0 ? false : true; 
                
            }
        }

        const base = table[startRule][firstChar].base;
        const regex = new RegExp(`^.{${base.length}}`,"g");
        url = url.replace(regex, base);
    }

    // applying new rule
    const ruleNumber = table[firstNonTerm][firstChar].rule ? table[firstNonTerm][firstChar].rule : table[firstNonTerm][firstChar];
    const newRule = rules[ruleNumber];

    // additionally added rules for recover
    if (ruleNumber > 90){
        recover = true;
    }

    // updating first element of rules array               
    ruleArr.splice(0, 1, newRule);

    // check if new rule is regular expression if so we send it in recursion else we send it as null
    regExpression = (newRule == '[A-Za-z]' || newRule == '[0-9]') ? new RegExp(newRule) : null

    return _iterateUrl(ruleArr, firstNonTerm, regExpression)
}

module.exports = { iterateUrl }
},{"./table_and_rules":4,"./table_transform":5,"js-levenshtein":2}],4:[function(require,module,exports){

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
        "number" : 32,
        "letter" : 98 // recover
    },
    "S" : {
        "number" : 33,
        "letter" : 99, // recover
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
    36: "[A-Za-z]",

    // additionally added rules for recover
    98: "US",
    99: "US"
}

module.exports = {table, rules}
},{}],5:[function(require,module,exports){

transformTable = (table) => {

    let lowerCase = new Array(26).fill(0).map((item, index) => String.fromCharCode(index + 97));
    let upperCase = new Array(26).fill(0).map((item, index) => String.fromCharCode(index + 65));
    let numbers = new Array(10).fill(0).map((item, index) => index);

    for (let key in table) {
        for (let subKey in table[key]) {
            (subKey == "letter_or_number" && addNewKeys([lowerCase, upperCase, numbers], table, key, subKey)) ||
            (subKey == "letter" && addNewKeys([lowerCase, upperCase], table, key, subKey)) ||
            (subKey == "number" && addNewKeys([numbers], table, key, subKey));
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
