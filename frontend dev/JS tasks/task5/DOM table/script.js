var no = prompt("No. of persons?");

var names = [];
var ages = [];
var name_regex = /^[a-zA-Z\s]+$/;

for (let i = 0; i < no; i++) {
    let user_name;
    do {    
        user_name = prompt("Name of person no. " + (i + 1));
    } while(!name_regex.test(user_name)); 
    names.push(user_name);
    let user_age;
    do {
        user_age = prompt("Age of person no. " + (i + 1));
    } while(isNaN(user_age) || user_age === "" || user_age === null); 
    ages.push(user_age);
}

let table = document.createElement("table");

let headerRow = document.createElement("tr");

let th1 = document.createElement("th");
th1.textContent = "Name";

let th2 = document.createElement("th");
th2.textContent = "Age";

headerRow.appendChild(th1);
headerRow.appendChild(th2);
table.appendChild(headerRow);

for (let i = 0; i < names.length; i++) {
    let row = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.textContent = names[i];

    let tdAge = document.createElement("td");
    tdAge.textContent = ages[i];

    row.appendChild(tdName);
    row.appendChild(tdAge);

    table.appendChild(row);
}

document.getElementById("table-container").appendChild(table);