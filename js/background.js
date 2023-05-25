var current_tab_id = 0;
 
function handleUpdated(tabId, changeInfo, tabInfo) {

    console.log(`handleUpdated start`);
    console.log(`tabId`);
    console.log(tabId);
    console.log(`changeInfo`);
    console.log(changeInfo);
    console.log(`tabInfo`);
    console.log(tabInfo);
    if(current_tab_id == tabId) {
        console.log(`changeInfo`);
        console.log(changeInfo);
        console.log(`tabInfo`);
        console.log(tabInfo);
        if(tabInfo["status"] == "complete") {
            console.log(`url complete`);
            // remove_css_file;
            chrome.tabs.sendMessage(current_tab_id, {message: "url change"}, () => {
                if(chrome.runtime.lastError) {}
            });        
        }
        if(tabInfo["status"] == "loading") {
            console.log(`url loading`);
            // remove_css_file();
        }
    }
    console.log(`handleUpdated end`);
}


function add_css_file() {
    console.log(`add css file start`);
    chrome.scripting.insertCSS({
        target: {
            tabId: current_tab_id,
            },
        files: ["css/view.css"],
    });
}

function remove_css_file() {
    console.log(`remove css file start`);
    chrome.scripting.removeCSS({
        target: {
            tabId: current_tab_id,
            },
        files: ["css/view.css"],
    });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    const mes = message["message"];
    console.log(`background start`);
    
    switch(mes) {
        case "url register": 
            console.log(`url register`);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                console.log(`tabs[0].id: ${tabs[0].id}`);
                current_tab_id = tabs[0].id;
                console.log(`current_tab_id: ${current_tab_id}`);

            });
            break;
            
        case "url change check":
            chrome.tabs.onUpdated.addListener(handleUpdated);
            break;

        case "add css file": 
            console.log(`add css file start`);
            add_css_file();
            break;

        case "remove css file": 
            console.log(`remove css file start`);
            remove_css_file();
            break;
    }
});





  