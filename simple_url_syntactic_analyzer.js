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