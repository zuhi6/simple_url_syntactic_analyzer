
transformTable = (table) => {

    let lowerCase = new Array(26).fill(0).map((item, index) => String.fromCharCode(index + 97));
    let upperCase = new Array(26).fill(0).map((item, index) => String.fromCharCode(index + 65));
    let numbers = new Array(10).fill(0).map((item, index) => index);

    for (let key in table) {
        // check if the property/key is defined in the object itself, not in parent
        for (let sub_key in table[key]) {
            if (sub_key == "pismeno_alebo_cislo") {
                [lowerCase, upperCase, numbers].forEach(arr => arr.forEach(item => {
                    table[key][item.toString()] = table[key][sub_key]
                }))
                delete table[key][sub_key];
            }
            if (sub_key == "pismeno") {
                [lowerCase, upperCase].forEach(arr => arr.forEach(item => {
                    table[key][item.toString()] = table[key][sub_key]
                }))
                delete table[key][sub_key];
            }
            if (sub_key == "cislo") {
                numbers.forEach(item => {
                    table[key][item.toString()] = table[key][sub_key]
                })
                delete table[key][sub_key];
            }
        }

    }

    return table;
}
module.exports = { transformTable }

