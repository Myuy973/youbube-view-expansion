
import * as shortcut from "./shortcut_action.js";

var url_pattern = "";
var css_type = false;
var video_object;
var actions_object;
const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const watch_url_pattern = "www.youtube.com/watch?v=";
const liked_html = '<div id="notice"></div>'
const screen_size = screen.width;
const video_attributes_check = new MutationObserver((mutationList, observer) => {
    console.log(`video_attributes_check----------------------`);
    console.log(mutationList);
    mutationList.forEach(mutation => {
        if(mutation["attributeName"] == "style") {
            console.log(`attributeName is style`);
            console.log(mutation);
            movie_size_check("by observe");
        }
    });
    console.log(`video_attributes_check end`);
    // test();
});


// ----------------------------------------------

window.onload = () => {
    // watch_url_check.observe(document, {childList: true, subtree: true});
    chrome.runtime.sendMessage({message: "url register"}, () => {
        // port_error_pass;
        if(chrome.runtime.lastError) {}
        console.log(`url register after`);
        chrome.runtime.sendMessage({message: "url change check"}, () => {if(chrome.runtime.lastError) {}});
    });
}


window.addEventListener("keypress", (e) => {

    switch(true) {

        // 広告スキップ
        case e.key == ";":
            shortcut.add_skip();
            break;
            
        // likeショートカット
        case e.key == "u":
            shortcut.like_action();
            break;

        default:
            break;        
    }
});


// -----------------------------------------------------


async function movie_size_check(type) {
    await data_setting(type);
    if(type != "by observe") setting_change();
    video_size_change(type);
}


async function data_setting (type){
    console.log("data_setting css reset");
    chrome.runtime.sendMessage({message: "remove css file"}, () => {if(chrome.runtime.lastError) {}});
    console.log("data_setting css ");
    console.log(window.getComputedStyle(document.querySelector("html"))["overflow-x"]);
    // video_object, actions_objectが取得できるまでループ
    video_object = null;
    while(!(video_object && actions_object)) {
        // videoオブジェクト取得
        type != "mini_player" ? video_object = document.getElementById("player").getElementsByTagName("video")[0] :
                                video_object = document.getElementById("container").getElementsByTagName("video")[0];

        // いいねとかあるbar取得
        if(url_pattern != "other" || url_pattern != "mini_player") {
            actions_object = document.getElementById("actions");
        } 
        await sleep( 100 );
    }

    console.log(`data_setting: ${video_object} ${actions_object}`);
}



function url_move_type_check() {

    console.log(`location.href.includes(watch_url_pattern): ${location.href.includes(watch_url_pattern)}`);
    if(location.href.includes(watch_url_pattern)) {
        console.log(`url_pattern: ${url_pattern}`);
        if(document.querySelector("[id*='player-overlay']") && url_pattern != "ad-video") {
            console.log(`ad+++++++++++++++++++++++++++++++++;;`);
            url_pattern = "ad-video";
            movie_size_check("by url change");
        } else if(!document.querySelector("[id*='player-overlay']") && url_pattern != "watch") {
            console.log(`watch+++++++++++++++++++++++++++++`);
            url_pattern = "watch";
            movie_size_check("by url change");
        }
    } else if(!location.href.includes(watch_url_pattern)) {
        const mini_player = document.getElementsByClassName("ytp-miniplayer-scrim").length;
        console.log(`mini_player: ${mini_player}`);
        if(mini_player && url_pattern != "mini_player") {
            console.log(`mini_player ok`);
            url_pattern = "mini_player";
            movie_size_check("mini_player");
        } else if(!mini_player && url_pattern != "other") {
           video_attributes_check.disconnect();
           console.log(`other`);
           url_pattern = "other";
        }
    }
}


function setting_change() {
    
    actions_object.insertAdjacentHTML("beforeend", liked_html);
    shortcut.setNotice_object(document.getElementById("notice")); 
    
    // ウィンドウのリサイズを管理
    // window.addEventListener("resize", data_setting());    
    
    video_attributes_check.disconnect();

    // videoのリサイズを管理。　広告後  属性値監視
    video_attributes_check.observe(video_object, { attributes: true});
    
}



// videoサイズを調整
function video_size_change(type) {
    if(video_object) {

        console.log(`video_size_change type: ${type}`);

        // view.cssが適用されているかチェック
        window.getComputedStyle(document.querySelector("html"))["overflow-x"] == "hidden" ?
                                                    css_type = true: css_type = false;
        
        // ミニプレイヤー時、css,video_css削除
        if(type == "mini_player") {
            console.log(`mini_player`);
            chrome.runtime.sendMessage({message: "remove css file"}, () => {if(chrome.runtime.lastError) {}});
            return;
        }

        // 特定の動画の高さいないかどうかチェック
        const max_video_height = video_object.clientWidth * 0.564;
        const video_size_type = video_object.clientHeight <= max_video_height;
        
        console.log(`video_object.clientWidth: ${video_object.clientWidth}, video_object.clientHeight: ${video_object.clientHeight}`);
        console.log(`max_video_height: ${max_video_height}, video_size_type: ${video_size_type}`);
        console.log(`outerWidth: ${outerWidth}, screen_size: ${screen_size}`);
        console.log(`url_pattern: ${url_pattern}`);
        console.log(`css_type: ${css_type}`);
        if (video_size_type && !css_type && ((window.outerWidth === screen_size) && url_pattern != "mini_player")) {
            console.log(`video_size_change if ok`);
            chrome.runtime.sendMessage({message: "add css file"}, () => {if(chrome.runtime.lastError) {}});
        } else if(!video_size_type && css_type) {
            console.log(`video_size_change if else`);
            chrome.runtime.sendMessage({message: "remove css file"}, () => {if(chrome.runtime.lastError) {}});
        }
    }
}


function port_error_pass() {
    if(chrome.runtime.lastError) {}
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    const mes = message["message"];

    switch(mes) {
        case "url change" :
            // リセット
            url_move_type_check();
            break;
        case "add css" :
            chrome.runtime.sendMessage({message: "add css file"}, () => {if(chrome.runtime.lastError) {}});
            break;
        case "remove css" :
            chrome.runtime.sendMessage({message: "remove css file"}, () => {if(chrome.runtime.lastError) {}});
            break;
    }

});


