"use strict";

let createButton = document.querySelector("#createButton");
let deleteButton = document.querySelector("#deleteButton");
let updateButton = document.querySelector("updateButton");

let resultsDiv = document.querySelector("#results-div");

let fNameInput = document.querySelector("#firstNameInput");
let lNameInput = document.querySelector("#lastNameInput");
let tNameInput = document.querySelector("#teamInput");
let winsInput = document.querySelector("#winsInput");
let pFinishInput = document.querySelector("#pFinishInput");
let idInput = document.querySelector("#idInput");
let updateInput = document.querySelector("#updateInput");

let printResults = (result) => {
    let entryDiv = document.createElement("div");
    entryDiv.setAttribute("class", "entry-div");
    entryDiv.textContent = `${result.id} ${result.firstName} ${result.lastName} | ${result.team} | ${result.wins} Wins | ${result.podiumFinishes} Podium Finishes`
    resultsDiv.appendChild(entryDiv);
}

let getAll = () => {
    axios.get("http://localhost:8080/driver/getAll")
    .then((response) => {

        resultsDiv.innerHTML="";

        let results = response.data;
        for (let result of results){
            printResults(result);
        }
    })
    .catch((error) => { console.log(error); });
}

let create = () => {
    let obj = {
        "firstName": fNameInput.value,
        "lastName": lNameInput.value,
        "team": tNameInput.value,
        "wins": winsInput.value,
        "podiumFinishes": pFinishInput.value
    }

    axios.post("http://localhost:8080/driver/create", obj)
    .then(() => {
        getAll();
    })
    .catch((error) => { console.log(error); })
}

let update = () => {
    let obj = {
        "firstName": fNameInput.value,
        "lastName": lNameInput.value,
        "team": tNameInput.value,
        "wins": winsInput.value,
        "podiumFinishes": pFinishInput.value
    }

    axios.put(`http://localhost:8080/driver/update/${updateInput.value}`, obj)
    .then(() => {
        getAll();
    })
    .catch((error) => { console.log(error); })
}

let delByID = () => {
    axios.delete(`http://localhost:8080/driver/delete/${idInput.value}`)
    .then(() => {
        
        getAll();
    })
    .catch((error) => { console.log(error); })
}

createButton.addEventListener("click", create);
deleteButton.addEventListener("click", delByID);
updateButton.addEventListener("click", update);