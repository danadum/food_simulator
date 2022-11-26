let proxy = "https://sheltered-everglades-24913.herokuapp.com/";
let text_version;
let text_database;
let item_version;
let item_database;

document.addEventListener("DOMContentLoaded", () => {
    addListeners();
    getItemsVersion();
});

function addListeners() {
    let form_simulator = document.getElementById("form_simulator");
    form_simulator.addEventListener("input", event => {if (event instanceof InputEvent) {updateProduction();}});
    form_simulator.addEventListener("change", updateProduction);
    document.getElementById("select_language").addEventListener("change", () => {
        showLoadingPage(true);
        getFullText(select_language.value);
    });
    document.getElementById("select_castle").addEventListener("change", changeCastle);
    document.getElementById("input_po").addEventListener("input", function(event) {inputNumberOnly(event, this)});
    let inputs_positive = document.getElementsByClassName("input_positive");
    for (let i = 0; i < inputs_positive.length; i++) {
        inputs_positive[i].addEventListener("input", function(event) {inputPositiveNumberOnly(event, this)});
        inputs_positive[i].addEventListener("paste", () => false);
        inputs_positive[i].addEventListener("drop", () => false);
    }
    document.getElementById("button_add_row").addEventListener("click", addRow);
}

function inputNumberOnly(event, input) {
    if (event.inputType == "insertText") {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-"].includes(event.data)) {
            if (event.data == "-" && isNaN(input.value) && input.value != "-") {
                deleteLastInput(event, input);
            }
            let max = +input.dataset.max;
            if (!isNaN(max) && +input.value > max) {
                input.value = max;
            }
            let min = +input.dataset.min;
            if (!isNaN(min) && +input.value < min) {
                input.value = min;
            }
        }
        else {
            deleteLastInput(event, input);
        }
    }
    else if (event.inputType == "insertCompositionText") {
        deleteLastInput(event, input);
    }
}

function inputPositiveNumberOnly(event, input) {
    if (event.inputType == "insertText") {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.data)) {
            let max = +input.dataset.max;
            if (!isNaN(max) && +input.value > max) {
                input.value = max;
            }
        }
        else {
            deleteLastInput(event, input);
        }
    }
    else if (event.inputType == "insertCompositionText") {
        deleteLastInput(event, input);
    }
}

function deleteLastInput(event, input) {
    let index = input.selectionStart - event.data.length;
    input.value = input.value.slice(0, index) + input.value.slice(input.selectionStart);
    input.selectionStart = index;
    input.selectionEnd = index;
    event.stopImmediatePropagation();
}

function toggleInputHunt() {
    let input_hunt = document.getElementById("input_hunt");
    if (input_hunt.dataset.max != "") {
        input_hunt.disabled = false;
        if (+input_hunt.value > +input_hunt.dataset.max) {
            input_hunt.value = input_hunt.dataset.max;
        }
    }
    else {
        input_hunt.disabled = true;
        input_hunt.value = "";
    }
}

function toggleInputVillages() {
    let input_villages = document.getElementById("input_villages");
    if (input_villages.dataset.max != "") {
        input_villages.disabled = false;
        if (+input_villages.value > +input_villages.dataset.max) {
            input_villages.value = input_villages.dataset.max;
        }
    }
    else {
        input_villages.disabled = true;
        input_villages.value = "";
    }

}

function toggleSelectCore() {
    let select_core = document.getElementById("select_core");
    if (document.getElementById("select_castle").selectedOptions[0].dataset.areaType == "1") {
        select_core.disabled = false;
    }
    else {
        select_core.disabled = true;
        select_core.value = "";
    }
}

function toggleInputMetropolis() {
    let input_metropolis = document.getElementById("input_metropolis");
    if (document.getElementById("select_castle").selectedOptions[0].dataset.kid == "0") {
        input_metropolis.disabled = false;
    }
    else {
        input_metropolis.disabled = true;
        input_metropolis.value = "";
    }
}

function checkBuildingNumber() {
    let rows = document.getElementById("tbody_buildings").rows;
    let options = rows[1].getElementsByClassName("select_building")[0].options;
    let checked_values = [];
    let selected_values = [""];
    for (let i = 1; i < rows.length; i++) {
        selected_values.push(rows[i].getElementsByClassName("select_building")[0].selectedOptions[0].value);
    }
    for (let i = 1; i < options.length; i++) {
        if (options[i].value != "" && !checked_values.includes(options[i].value)) {
            checked_values.push(options[i].value);
            let nb_selected = 0;
            for (let j = 1; j < rows.length; j++) {
                if (selected_values[j] == options[i].value) {
                    nb_selected++;
                }   
            }
            for (let j = 1; j < rows.length; j++) {
                let row_options = rows[j].getElementsByClassName("select_building")[0].options;
                for (let k = 0; k < row_options.length; k++) {
                    if (row_options[k].value == options[i].value) {
                        if (nb_selected >= +options[i].dataset.maxNumber && row_options[k].value != selected_values[j]) {
                            row_options[k].classList.add("hidden");
                        }
                        else {
                            row_options[k].classList.remove("hidden");
                        }
                    }
                }
            }
        }
    }
}

function checkPrimaryNumber() {
    let rows = document.getElementById("tbody_buildings").rows;
    let options = rows[1].getElementsByClassName("select_primary")[0].options;
    let checked_types = [];
    let selected_types = [""];
    for (let i = 1; i < rows.length; i++) {
        selected_types.push(rows[i].getElementsByClassName("select_primary")[0].selectedOptions[0].dataset.type);
    }
    for (let i = 1; i < options.length; i++) {
        if (options[i].dataset.type != undefined && !checked_types.includes(options[i].dataset.type)) {
            checked_types.push(options[i].dataset.type);
            let nb_selected = 0;
            for (let j = 1; j < rows.length; j++) {
                if (selected_types[j] == options[i].dataset.type) {
                    nb_selected++;
                }   
            }
            for (let j = 1; j < rows.length; j++) {
                let row_options = rows[j].getElementsByClassName("select_primary")[0].options;
                for (let k = 0; k < row_options.length; k++) {
                    if (row_options[k].dataset.type == options[i].dataset.type) {
                        if (nb_selected >= +options[i].dataset.maxNumber && row_options[k].dataset.type != selected_types[j]) {
                            row_options[k].classList.add("hidden");
                        }
                        else {
                            row_options[k].classList.remove("hidden");
                        }
                    }
                }
            }
        }
    }
}

function checkRelicNumber() {
    let rows = document.getElementById("tbody_buildings").rows;
    let options = rows[1].getElementsByClassName("select_relic")[0].options;
    let checked_types = [];
    let selected_types = [""];
    for (let i = 1; i < rows.length; i++) {
        selected_types.push(rows[i].getElementsByClassName("select_relic")[0].selectedOptions[0].dataset.type);
    }
    for (let i = 1; i < options.length; i++) {
        if (options[i].dataset.type != undefined && !checked_types.includes(options[i].dataset.type)) {
            checked_types.push(options[i].dataset.type);
            let nb_selected = 0;
            for (let j = 1; j < rows.length; j++) {
                if (selected_types[j] == options[i].dataset.type) {
                    nb_selected++;
                }   
            }
            for (let j = 1; j < rows.length; j++) {
                let row_options = rows[j].getElementsByClassName("select_relic")[0].options;
                for (let k = 0; k < row_options.length; k++) {
                    if (row_options[k].dataset.type == options[i].dataset.type) {
                        if (nb_selected >= +options[i].dataset.maxNumber && row_options[k].dataset.type != selected_types[j]) {
                            row_options[k].classList.add("hidden");
                        }
                        else {
                            row_options[k].classList.remove("hidden");
                        }
                    }
                }
            }
    
        }
    }

}

function toggleInputs(row) {
    let level = row.getElementsByClassName("select_level")[0];
    let damages = row.getElementsByClassName("input_damages")[0];
    let primary = row.getElementsByClassName("select_primary")[0];
    let relic = row.getElementsByClassName("select_relic")[0];
    if (row.getElementsByClassName("select_building")[0].value == "") {
        level.disabled = true;
        level.value = "";
        damages.disabled = true;
        damages.value = "";
        primary.disabled = true;
        primary.value = "";
        relic.disabled = true;
        relic.value = "";
    }
    else {
        if (row.getElementsByClassName("select_building")[0].selectedOptions[0].dataset.burnable == "0") {
            damages.disabled = true;
            damages.value = "";    
        }
        else {
            damages.disabled = false;
        }
        level.disabled = false
        primary.disabled = false;
        relic.disabled = false;
    }
}

function changeCastle() {
    addMaxHunt();
    addMaxVillages();
    toggleInputHunt();
    loadPlaceholderHunt();
    toggleInputVillages();
    loadPlaceholderVillages();
    toggleSelectCore();
    toggleInputMetropolis();
    updateProduction();
}

function hideLoadingPage() {
    document.getElementById("filler").classList.add("hidden");
    document.getElementById("loader").classList.add("hidden");
    document.body.classList.remove("overflowHidden");
}

function showLoadingPage(transparency) {
    if (transparency) {
        document.getElementById("filler").style.backgroundColor = "#ffffff80";
    }
    else {
        document.getElementById("filler").style.backgroundColor = "#ffffff";
    }
    document.getElementById("filler").classList.remove("hidden");
    document.getElementById("loader").classList.remove("hidden");
    document.body.classList.add("overflowHidden");
}