function addLanguages() {
    let select_language = document.getElementById("select_language");
    for (let language in text_version.languages) {
        getText(language, "@metadata", () => {
            let new_option = document.createElement("option");
            new_option.value = language;
            if (language == "en") {
                new_option.selected = "selected";
            }
            select_language.add(new_option);
        });
    }
}

function addOptions() {
    addOptionsCastle();
    addValueSubscription();
    addOptionsMill();
    addOptionsVIP();
    addOptionsGallantry();
    addOptionsStorm();
    addMaxEmblem();
    addMaxHunt();
    addMaxVillages();
    addMaxHero();
    addOptionsResearch();
    addOptionsCore();
    addOptionsKeep();
    for (let i = 0 ; i < 10 ; i++) {
        createRow();
    }
    toggleInputHunt();
    toggleInputVillages();
    toggleSelectCore();
    toggleInputMetropolis();
}

function addOptionsCastle() {
    let select_castle = document.getElementById("select_castle");

    let new_option = document.createElement("option");
    new_option.value = "main";
    new_option.dataset.kid = 0;
    new_option.dataset.areaType = 1;
    new_option.dataset.production_slots = 3;
    select_castle.add(new_option);

    new_option = document.createElement("option");
    new_option.value = "op2";
    new_option.dataset.kid = 0;
    new_option.dataset.areaType = 4;
    new_option.dataset.production_slots = 2;
    select_castle.add(new_option);

    new_option = document.createElement("option");
    new_option.value = "op6";
    new_option.dataset.kid = 0;
    new_option.dataset.areaType = 4;
    new_option.dataset.production_slots = 6;
    select_castle.add(new_option);

    new_option = document.createElement("option");
    new_option.value = "op8";
    new_option.dataset.kid = 0;
    new_option.dataset.areaType = 4;
    new_option.dataset.production_slots = 8;
    select_castle.add(new_option);

    new_option = document.createElement("option");
    new_option.value = "ice";
    new_option.dataset.kid = 2;
    new_option.dataset.areaType = 12;
    new_option.dataset.production_slots = 2;
    select_castle.add(new_option);

    new_option = document.createElement("option");
    new_option.value = "sand";
    new_option.dataset.kid = 1;
    new_option.dataset.areaType = 12;
    new_option.dataset.production_slots = 2;
    select_castle.add(new_option);

    new_option = document.createElement("option");
    new_option.value = "fire";
    new_option.dataset.kid = 3;
    new_option.dataset.areaType = 12;
    new_option.dataset.production_slots = 2;
    select_castle.add(new_option);

    new_option = document.createElement("option");
    new_option.value = "storm";
    new_option.dataset.kid = 4;
    new_option.dataset.areaType = 12;
    new_option.dataset.production_slots = 2;
    select_castle.add(new_option);
}

function addValueSubscription() {
    let effects = item_database.effects.filter(object => object.effectTypeID == "80" || object.effectTypeID == "69");
    document.getElementById("checkbox_subscription").value = item_database.subscriptionsBuffs.filter(object => {
        if (object.effects != undefined) {
            let effect_list = object.effects.split("#");
            for (let i = 0; i < effect_list.length; i++) {
                let effect = effect_list[i].split("&");
                for (let j = 0; j < effects.length; j++) {
                    if (effects[j].effectID == effect[0]) {
                        return true;
                    }
                }
            }
        }
        return false;
    })[0].effects;
}

function addOptionsMill() {
    let mill_levels = item_database.buildings.filter(object => object.name == "Mill");
    for (let i = 0; i < mill_levels.length; i++) {
        let new_option = document.createElement("option");
        new_option.value = mill_levels[i].level;
        new_option.dataset.foodBoost = mill_levels[i].Foodboost;
        document.getElementById("select_mill").add(new_option);
    }
}

function addOptionsVIP() {
    for (let i = 0; i < item_database.viplevels.length; i++) {
        let new_option = document.createElement("option");
        new_option.value = item_database.viplevels[i].vipLevelID;
        new_option.dataset.foodBoost = item_database.viplevels[i].foodBoosts;
        document.getElementById("select_vip").add(new_option);
    }
}

function addOptionsGallantry() {
    let effects = item_database.effects.filter(object => object.effectTypeID == "80" || object.effectTypeID == "69");
    let titles = item_database.titles.filter(object => {
        if (object.effects != undefined) {
            let effect_list = object.effects.split(",");
            for (let i = 0; i < effect_list.length; i++) {
                let effect = effect_list[i].split("&");
                for (let j = 0; j < effects.length; j++) {
                    if (effects[j].effectID == effect[0]) {
                        return object.type == "FACTION";
                    }
                }
            }
        }
        return false;
    });
    for (let i = 0; i < titles.length; i++) {
        let new_option = document.createElement("option");
        new_option.value = titles[i].titleID;
        new_option.dataset.effects = titles[i].effects;
        document.getElementById("select_gallantry").add(new_option);
    }
}

function addOptionsStorm() {
    let effects = item_database.effects.filter(object => object.effectTypeID == "80" || object.effectTypeID == "69");
    let titles = item_database.titles.filter(object => {
        if (object.effects != undefined) {
            let effect_list = object.effects.split(",");
            for (let i = 0; i < effect_list.length; i++) {
                let effect = effect_list[i].split("&");
                for (let j = 0; j < effects.length; j++) {
                    if (effects[j].effectID == effect[0]) {
                        return object.type == "ISLE";
                    }
                }
            }
        }
        return false;
    });
    for (let i = 0; i < titles.length; i++) {
        let new_option = document.createElement("option");
        new_option.value = titles[i].titleID;
        new_option.dataset.effects = titles[i].effects;
        document.getElementById("select_storm").add(new_option);
    }
}

function addMaxEmblem() {
    let emblems = item_database.crestsymbols.filter(object => object.effects != undefined && object.effects.split("&")[0] == "67");
    let max = 0;
    for (let i = 0; i < emblems.length; i++) {
        let emblem_effect = +emblems[i].effects.split("&")[1];
        if (emblem_effect > max) {
            max = emblem_effect;
        }
    }
    document.getElementById("input_emblem").dataset.max = 2 * max;
}

function addMaxHunt() {
    let castle = document.getElementById("select_castle").selectedOptions[0].dataset;
    let input_hunt = document.getElementById("input_hunt");
    if (castle.kid == "0") {
        input_hunt.dataset.max = item_database.buildings.filter(object => object.name == "Hunter")[0].hunterMax;
    }
    else if (["1", "2", "3", "4"].includes(castle.kid)) {
        input_hunt.dataset.max = item_database.buildings.filter(object => object.name == "Kingdomhunter")[0].hunterMax;
    }
    else {
        input_hunt.dataset.max = "";
    }
}

function addMaxVillages() {
    let castle = document.getElementById("select_castle").selectedOptions[0].dataset;
    let input_villages = document.getElementById("input_villages");
    let villages_number = +item_database.kingdoms.filter(object => object.kID == castle.kid)[0].villageCapFood;
    if (villages_number > 0) {
        let max = +item_database.villages.filter(object => object.kID == castle.kid)[0].productivityFoodBoost;
        let private_villages = item_database.privateVillages.filter(object => object.kID == castle.kid);
        for (let i = 0; i < private_villages.length; i++) {
            village_effect = +private_villages[i].effects.split("&")[1];
            if (village_effect > max) {
                max = village_effect;
            }
        }
        input_villages.dataset.max = max * villages_number;
    }
    else {
        input_villages.dataset.max = "";
    }
}

function addMaxHero() {
    let effects = item_database.relicEffects.filter(object => object.effectID == "32004");
    let max = 0;
    for (let i = 0; i < effects.length; i++) {
        let hero_effect = +effects[i].maximumValue;
        if (hero_effect > max) {
            max = hero_effect;
        }
    }
    document.getElementById("input_hero").dataset.max = max;
}

function addOptionsResearch() {
    let research_levels = item_database.researches.filter(object => object.groupID == "14");
    let effect = [research_levels[0].effects.split("&")[0], 0];
    for (let i = 0; i < research_levels.length; i++) {
        effect[1] += +research_levels[i].effects.split("&")[1];
        let new_option = document.createElement("option");
        new_option.value = research_levels[i].level;
        new_option.dataset.effects = effect.join("&");
        document.getElementById("select_research").add(new_option);
    }
}

function addOptionsCore() {
    let research_levels = item_database.researches.filter(object => object.groupID == "47");
    let effect = [research_levels[0].effects.split("&")[0], 0];
    for (let i = 0; i < research_levels.length; i++) {
        effect[1] += +research_levels[i].effects.split("&")[1];
        let new_option = document.createElement("option");
        new_option.value = research_levels[i].level;
        new_option.dataset.effects = effect.join("&");
        document.getElementById("select_core").add(new_option);
    }
}

function addOptionsKeep() {
    let keep_levels = item_database.buildings.filter(object => object.name == "Keep");
    for (let i = 0; i < keep_levels.length; i++) {
        let new_option = document.createElement("option");
        new_option.value = keep_levels[i].level;
        new_option.dataset.foodBoost = keep_levels[i].Foodproduction;
        document.getElementById("tbody_buildings").rows[0].getElementsByClassName("select_level")[0].add(new_option);
    }
}

function addOptionsBuilding(row) {
    let building_list = item_database.buildings.filter(object => object.Foodproduction != undefined && object.buildingGroundType == "CIVIL");
    for (let i = 0; i < building_list.length; i++) {
        if (building_list[i].level == "1") {
            let new_option = document.createElement("option");
            new_option.dataset.maxNumber = building_list[i].maximumCount;
            new_option.dataset.burnable = building_list[i].burnable;
            new_option.value = building_list[i].name;
            row.getElementsByClassName("select_building")[0].add(new_option);
        }
    }
}

function addOptionsLevel(row) {
    let select_building = row.getElementsByClassName("select_building")[0];
    let select_level = row.getElementsByClassName("select_level")[0];
    while (select_level.options.length > 0) {
        select_level.remove(0);
    }
    if (select_building.value != "") {
        let building_levels = item_database.buildings.filter(object => object.name == select_building.value);
        for (let i = 0; i < building_levels.length; i++) {
            let new_option = document.createElement("option");
            new_option.value = building_levels[i].level;
            new_option.dataset.foodBoost = building_levels[i].Foodproduction;
            select_level.add(new_option);
        }
    }
}

function addOptionsPrimary(row) {
    let builds_list = item_database.constructionItems.filter(object => (object.Foodproduction != undefined || object.unboostedFoodProduction != undefined) && object.slotTypeID == 1);
    for (let i = 0; i < builds_list.length; i++) {
        let new_option = document.createElement("option");
        new_option.value = builds_list[i].name;
        new_option.dataset.type = builds_list[i].constructionItemEffectGroupID;
        new_option.dataset.maxNumber = item_database.constructionItemsEffectGroups.filter(object => object.constructionItemEffectGroupID == builds_list[i].constructionItemEffectGroupID)[0].areaLimit;
        new_option.dataset.level = builds_list[i].level;
        if (builds_list[i].Foodproduction != undefined) {
            new_option.dataset.foodBoost = builds_list[i].Foodproduction;
        }
        else if (builds_list[i].unboostedFoodProduction != undefined) {
            new_option.dataset.foodBoost = builds_list[i].unboostedFoodProduction;
        }
        row.getElementsByClassName("select_primary")[0].add(new_option);
    }
}

function addOptionsRelic(row) {
    let builds_list = item_database.constructionItems.filter(object => (object.Foodproduction != undefined || object.unboostedFoodProduction != undefined) && object.slotTypeID == 2);
    for (let i = 0; i < builds_list.length; i++) {
        let new_option = document.createElement("option");
        new_option.value = builds_list[i].name;
        new_option.dataset.type = builds_list[i].constructionItemEffectGroupID;
        new_option.dataset.maxNumber = item_database.constructionItemsEffectGroups.filter(object => object.constructionItemEffectGroupID == builds_list[i].constructionItemEffectGroupID)[0].areaLimit;
        new_option.dataset.level = builds_list[i].level;
        new_option.dataset.premium = builds_list[i].isPremium;
        if (builds_list[i].Foodproduction != null) {
            new_option.dataset.foodBoost = builds_list[i].Foodproduction;
        }
        else if (builds_list[i].unboostedFoodProduction != undefined) {
            new_option.dataset.foodBoost = builds_list[i].unboostedFoodProduction;
        }
        row.getElementsByClassName("select_relic")[0].add(new_option);
    }
}

function createRow() {
    let new_row = document.getElementById("tbody_buildings").insertRow(-1);

    let new_cell = new_row.insertCell(-1);
    let new_element = document.createElement("select");
    new_element.className = "select_building";
    new_element.addEventListener("change", () => {
        checkBuildingNumber();
        addOptionsLevel(new_row);
        loadOptionsLevel(new_row);
        toggleInputs(new_row);
    });
    let new_option = document.createElement("option");
    new_option.value = "";
    new_element.add(new_option);
    new_cell.appendChild(new_element);

    new_cell = new_row.insertCell(-1);
    new_element = document.createElement("select");
    new_element.className = "select_level";
    new_option = document.createElement("option");
    new_option.value = "";
    new_element.add(new_option);
    new_cell.appendChild(new_element);

    new_cell = new_row.insertCell(-1);
    new_element = document.createElement("p");
    new_element.className = "text_workload";
    new_cell.appendChild(new_element);

    new_cell = new_row.insertCell(-1);
    new_element = document.createElement("input");
    new_element.className = "input_damages";
    new_element.type = "tel";
    new_element.dataset.max = 100;
    new_element.addEventListener("input", function(event) {inputPositiveNumberOnly(event, this)});
    new_element.addEventListener("paste", () => false);
    new_element.addEventListener("drop", () => false);
    new_cell.appendChild(new_element);

    new_cell = new_row.insertCell(-1);
    new_element = document.createElement("select");
    new_element.className = "select_primary";
    new_element.addEventListener("change", checkPrimaryNumber);
    new_option = document.createElement("option");
    new_option.value = "";
    new_element.add(new_option);
    new_cell.appendChild(new_element);

    new_cell = new_row.insertCell(-1);
    new_element = document.createElement("select");
    new_element.className = "select_relic";
    new_element.addEventListener("change", checkRelicNumber);
    new_option = document.createElement("option");
    new_option.value = "";
    new_element.add(new_option);
    new_cell.appendChild(new_element);

    new_cell = new_row.insertCell(-1);
    new_element = document.createElement("p");
    new_element.className = "text_production";
    new_cell.appendChild(new_element);

    new_cell = new_row.insertCell(-1);
    new_element = document.createElement("img");
    new_element.src = "assets/trash.svg";
    new_element.alt = "delete row";
    new_element.className = "icon";
    new_element.addEventListener("click", () => deleteRow(new_row));
    new_cell.appendChild(new_element);

    addOptionsBuilding(new_row);
    addOptionsPrimary(new_row);
    addOptionsRelic(new_row);
    toggleInputs(new_row);

    checkBuildingNumber();
    checkPrimaryNumber();
    checkRelicNumber();
}

function addRow() {
    createRow();
    let rows = document.getElementById("tbody_buildings").rows;
    let row = rows[rows.length - 1];
    loadOptionsBuilding(row);
    loadPlaceholderDamages(row);
    loadOptionsPrimary(row);
    loadOptionsRelic(row);
    updateProduction();
}

function deleteRow(row) {
    document.getElementById("tbody_buildings").deleteRow(row.rowIndex - 1);
    checkBuildingNumber();
    checkPrimaryNumber();
    checkRelicNumber();
    updateProduction();
}