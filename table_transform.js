
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

