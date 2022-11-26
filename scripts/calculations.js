function getProductivity() {
    let public_order = +document.getElementById("input_po").value;
    if (public_order > 0) {
        return 1 + 0.02 * Math.sqrt(public_order);
    }
    else if (public_order < 0) {
        return 1 / (1 + 0.02 * Math.sqrt(- public_order))
    }
    else {
        return  1;
    }
}

function getFoodBoosts() {
    let foodboost = [1, 1, 0];
    let castle = document.getElementById("select_castle").selectedOptions[0].dataset;

    if (document.getElementById("checkbox_overseer").checked) {
        foodboost[0] += 0.2;
    }

    if (document.getElementById("checkbox_subscription").checked) {
        let effects = document.getElementById("checkbox_subscription").value.split(",");
        for (let j = 0; j < effects.length; j++) {
            let effect = effects[j].split("&");
            let effect_desc = item_database.effects.filter(object => object.effectID == effect[0])[0];
            if ((effect_desc.spaceIDs == undefined || effect_desc.spaceIDs.split(",").includes(castle.kid))
                && (effect_desc.areaTypeID == undefined || effect_desc.areaTypeID.split(",").includes(castle.areaType))) {
                if (effect_desc.effectTypeID == 80) {
                    foodboost[0] += +effect[1] / 100;
                }
                else if (effect_desc.effectTypeID == 69) {
                    foodboost[2] += +effect[1];
                }
            }
        }
    }

    if (document.getElementById("select_mill").value != "") {
        foodboost[0] += +document.getElementById("select_mill").selectedOptions[0].dataset.foodBoost / 100;
    }

    if (document.getElementById("select_vip").value != "") {
        let effects = document.getElementById("select_vip").selectedOptions[0].dataset.foodBoost.split("#");
        for (let i = 0; i < effects.length; i++) {
            let effect = effects[i].split("+");
            if (effect[0] == castle.areaType) {
                foodboost[0] += +effect[1] / 100;
            }
        }
    }

    let selects = document.getElementsByClassName("select_foodboost");
    for (let i = 0; i < selects.length; i++) {
        if (selects[i].value != "") {
            let effects = selects[i].selectedOptions[0].dataset.effects.split(",");
            for (let j = 0; j < effects.length; j++) {
                let effect = effects[j].split("&");
                let effect_desc = item_database.effects.filter(object => object.effectID == effect[0])[0];
                if ((effect_desc.spaceIDs == undefined || effect_desc.spaceIDs.split(",").includes(castle.kid))
                    && (effect_desc.areaTypeID == undefined || effect_desc.areaTypeID.split(",").includes(castle.areaType))) {
                    if (effect_desc.effectTypeID == 80) {
                        foodboost[0] += +effect[1] / 100;
                    }
                    else if (effect_desc.effectTypeID == 69) {
                        foodboost[2] += +effect[1];
                    }
                }
            }
        }
    }

    let emblem = +document.getElementById("input_emblem").value;
    if (emblem > 0) {
        foodboost[0] += emblem / 100;
    }

    let hunt = +document.getElementById("input_hunt").value
    if (hunt > 0) {
        if (castle.kid == 0) {
            foodboost[1] += hunt / 100;
        }
        else if (["1", "2", "3", "4"].includes(castle.kid)) {
            foodboost[0] += hunt / 100;
        }
    }

    let villages = +document.getElementById("input_villages").value;
    if (villages > 0) {
        foodboost[0] += villages / 100;
    }

    let metropolis = +document.getElementById("input_metropolis").value
    if (metropolis > 0 && castle.kid == 0) {
        foodboost[2] += metropolis;
    }

    let build = +document.getElementById("input_build").value;
    if (build > 0) {
        foodboost[2] += build;
    }

    let castellan = +document.getElementById("input_hero").value;
    if (castellan > 0) {
        foodboost[2] += castellan;
    }

    let look = +document.getElementById("input_look").value;
    if (look > 0) {
        foodboost[2] += look;
    }

    let look2 = +document.getElementById("input_look2").value;
    if (look2 > 0) {
        foodboost[0] += look2 / 100;
    }

    return foodboost;
}

function getDamages(row) {
    let damages = +row.getElementsByClassName("input_damages")[0].value;
    if (damages > 50) {
        return 0.5;
    }
    else if (damages <= 50) {
        return 1 - damages / 100;
    }
    else {
        return 1;
    }
}

function getWorkload(row) {
    if (row.rowIndex == 1) {
        return 1;
    }
    let production_slots = +document.getElementById("select_castle").selectedOptions[0].dataset.production_slots;
    let building_index = +row.getElementsByClassName("text_workload")[0].dataset.index;
    if (building_index <= production_slots) {
        return 1;
    }
    else {
        return 0.75 ** (building_index - production_slots);
    }
}

function getBaseProduction(row) {
    let base_production = +row.getElementsByClassName("select_level")[0].selectedOptions[0].dataset.foodBoost;
    if (row.rowIndex != 1) {
        let primary = row.getElementsByClassName("select_primary")[0].selectedOptions[0];
        let relic = row.getElementsByClassName("select_relic")[0].selectedOptions[0];
        if (primary.value == "foodProduction") {
            base_production += +primary.dataset.foodBoost;
        }
        if (relic.value == "foodProduction") {
            base_production += +relic.dataset.foodBoost;
        }
    }
    return base_production;
}

function getBonusProduction(row) {
    let bonus_production = 0;
    if (row.rowIndex != 1) {
        let primary = row.getElementsByClassName("select_primary")[0].selectedOptions[0];
        let relic = row.getElementsByClassName("select_relic")[0].selectedOptions[0];
        if (primary.value == "unboostedFoodProduction") {
            bonus_production += +primary.dataset.foodBoost;
        }
        if (relic.value == "unboostedFoodProduction") {
            bonus_production += +relic.dataset.foodBoost;
        }
    }
    return bonus_production;
}

function updateWorkload() {
    let bat_index = 0;
    let rows = document.getElementById("tbody_buildings").rows;
    for (let i = 0; i < rows.length; i++) {
        let text_workload = rows[i].getElementsByClassName("text_workload")[0];
        if (rows[i].getElementsByClassName("select_building")[0].value != "") {
            text_workload.dataset.index = bat_index;
            text_workload.dataset.value = ~~(getWorkload(rows[i]) * 100);
            bat_index++;
        }
        else {
            text_workload.dataset.index = "";
            text_workload.dataset.value = "";
        }
    }
}

function updateProduction() {
    updateWorkload();
    loadTextWorkload();
    let foodboost = getFoodBoosts();
    let productivity  = getProductivity() * foodboost[0] * foodboost[1];
    let total_production = foodboost[2];

    let rows = document.getElementById("tbody_buildings").rows;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].getElementsByClassName("select_building")[0].value != "") {
            let production = productivity * getDamages(rows[i]) * getWorkload(rows[i]) * getBaseProduction(rows[i]) + getBonusProduction(rows[i]);
            rows[i].getElementsByClassName("text_production")[0].textContent = production.toFixed(2);
            total_production += production;
        }
        else {
            rows[i].getElementsByClassName("text_production")[0].textContent = "/";
        }
    }
    document.getElementById("title_total").textContent = text_database.ci_effect_unboostedFoodProduction.replace("+{0}", total_production.toFixed(2));
}