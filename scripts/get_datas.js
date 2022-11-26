function getItemsVersion() {
    $.get(`${proxy}https://empire-html5.goodgamestudios.com/default/items/ItemsVersion.properties`,
    response => {
        item_version = response.split("=")[1];
        getItems();
    },
    "text"
    );
}

function getItems() {
    $.getJSON(`${proxy}https://empire-html5.goodgamestudios.com/default/items/items_v${item_version}.json`,
    response => {
        item_database = response;
        addOptions();
        getTextVersion();
    });
}

function getTextVersion() {
    $.getJSON(`${proxy}https://empire-html5.goodgamestudios.com/config/languages/version.json`,
    response => {
        text_version = response;
        addLanguages();
        getFullText("en");
    });
}

function getFullText(language) {
    getText(language, "*", response => {
        text_database = response;
        loadText();
        hideLoadingPage();
    });
}

function getText(language, content, callback) {
    $.getJSON(`${proxy}https://langserv.public.ggs-ep.com/12@${text_version.languages[language]}"/${language}/${content}`, 
    response => callback(response)
    );
}