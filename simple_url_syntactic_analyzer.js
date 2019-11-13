let { table, rules } = require('./table_and_rules');
let { transformTable } = require('./table_transform');

table = transformTable(table);

let url = `ftp://Q@Q/$`;

console.log(table);
const startRule = "A";

let startRuleArr = startRule.split('')

const iterateUrl = (ruleArr, previousFirstRule, regExpression) => {

    if (ruleArr[0][0] == url[0]) {
        ruleArr = ruleArr.join('');
        let baseLength = 1;
        if (previousFirstRule == startRule) {
            const tableObj = table[startRule][url[0]]
            baseLength = tableObj.base.length;

        }
        if (!ruleArr[0].match(new RegExp('[A-Z]'))) {
            ruleArr = ruleArr.substr(baseLength)
            url = url.substr(baseLength);
        }

    } else if (regExpression) {
        if (url[0].match(regExpression)) {
            ruleArr.shift();

            ruleArr = ruleArr.join('');
            url = url.substr(1);
            regExpression = undefined;
        }
    }
    else if (!ruleArr[0].length && ruleArr.length != 1) {
        ruleArr = ruleArr.join('').split('');
        return iterateUrl(ruleArr, previousFirstRule, regExpression)
    }
    else {
        ruleArr = ruleArr.join('');
    }

    ruleArr = ruleArr.split('')

    const firstChar = url[0].toString();


    if (firstChar == "$" && !ruleArr.length && url.length == 1) {
        return true;
    }

    if (firstChar == "$" && !ruleArr.length && url.length > 1) {
        return false;
    }


    const firstNeterm = ruleArr[0];

    console.log(ruleArr, url, "2");
    if (!(table[firstNeterm] && table[firstNeterm][firstChar])) {
        console.log(firstNeterm, firstChar)
        return false;
    }

    if (table[firstNeterm][firstChar].rule) {
        ruleArr[0] = rules[table[firstNeterm][firstChar].rule];
    }
    else {
        ruleArr[0] = rules[table[firstNeterm][firstChar]];
    }

    console.log(ruleArr, url, "3");

    regExpression = (ruleArr[0] == '[A-Za-z]' || ruleArr[0] == '[0-9]') ? new RegExp(ruleArr[0]) : undefined

    return iterateUrl(ruleArr, firstNeterm, regExpression)


}

console.log(iterateUrl(startRuleArr, undefined, undefined))



