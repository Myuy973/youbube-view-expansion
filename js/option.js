const button = document.getElementById("button");
const add_css = document.getElementById("add_css");
const remove_css = document.getElementById("remove_css");


button.onclick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "P to C"}, () => {
            if(chrome.runtime.lastError) {}
        });
    });

}
add_css.onclick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "add css"}, () => {
            if(chrome.runtime.lastError) {}
        });
    });

}
remove_css.onclick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "remove css"}, () => {
            if(chrome.runtime.lastError) {}
        });
    });

}