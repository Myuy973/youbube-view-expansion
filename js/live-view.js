



window.onload = function() {
    
    console.log("js start");
    var screen_size = screen.width;
    var watch_url_pattern = "https://www.youtube.com/watch?v=";
    var liked_html = '<div id="notice"></div>'
    var video_object = document.getElementById("player").getElementsByTagName("video")[0];
    var actions_object = document.getElementById("actions");
    var notice_object = document.getElementById("notice");
    var notice_add_count = 0;
    
    var video_attributes_check = new MutationObserver(() => {
        
        console.log("MutationObserver start");
        
        actions_object = document.getElementById("actions");
        notice_object = document.getElementById("notice");
        notice_add_actions();

        video_object = document.getElementById("player").getElementsByTagName("video")[0];
        video_size_change();
    });
    

    

    // videoサイズの初期化
    video_size_change()
    
    // ウィンドウのリサイズを管理
    window.addEventListener("resize", video_size_change());    

    // videoのリサイズを管理。
    video_attributes_check.observe(video_object, { attributes: true });
    
    // min video -> default video: ビデオサイズを再度調整
    video_attributes_check.observe(document, { childList: true, subtree: true });


    
    
    window.addEventListener("keypress", (e) => {
        console.log("push key is : " + e.key);

        // 広告スキップ
        if (e.key == ";") {
            console.log("push key is ;");
            var ad_skip_object = document.getElementsByClassName("ytp-ad-skip-button-container")[0]
            var ad_overlay_close_object = document.getElementsByClassName("ytp-ad-overlay-close-button")[0]
            if (ad_skip_object) ad_skip_object.click();
            if (ad_overlay_close_object) ad_overlay_close_object.click();
        }

        // likeショートカット
        if (e.key == "u") {
            console.log("push key is u");
            var video_like_button = document.getElementById("segmented-like-button");
            
            if (video_like_button) {
                console.log("push key is video_like_button ok");
                if (video_like_button.getElementsByTagName("button")[0]) video_like_button.getElementsByTagName("button")[0].click();
                
                if (document.getElementById("segmented-like-button").querySelectorAll('[aria-pressed="true"]')[0]) {
                    notice_object.innerText = "いいねをはずしました"
                    notice_animation();
                } else if (document.getElementById("segmented-like-button").querySelectorAll('[aria-pressed="false"]')[0]) {
                    notice_object.innerText = "いいねしました"
                    notice_animation();
                }
            }
        }
        
    })

    
    // videoサイズを調整
    function video_size_change() {
        // console.log("video_size_change start: " + location.href.includes(watch_url_pattern));
        if ((window.outerWidth === screen_size || 
            location.href.includes(watch_url_pattern)) &&
            video_object) {
            // console.log("video_size_change check ok");
            // console.log("url " + location.href);
            // console.log("video_object " + video_object);
            video_object.style.width = "100%";
            video_object.style.height = "516px";
        }

    }
    

    function notice_add_actions() {
        if (notice_add_count == 0 && actions_object) {
            actions_object.insertAdjacentHTML("beforeend", liked_html);
            notice_add_count++;
        }
    }

    function notice_animation() {
        notice_object.classList.remove("notice-fade-out");
        notice_object.classList.add("notice-fade-in");
    
        setTimeout(function(){
            notice_object.classList.remove("notice-fade-in");
            notice_object.classList.add("notice-fade-out");
        },2000);
    }
    

}





// 後で見るショートカット　没
// if (e.key == "y") {
            
//     var count = 0;
//     var another_button = document.querySelectorAll('[aria-label="その他の操作"]')[0];
//     if (another_button) {
        
//         another_button.click();
        
//         var dropdown = document.getElementsByTagName("tp-yt-iron-dropdown")[1];
//         var select_dialog_object = document.getElementsByTagName("tp-yt-paper-dialog")[0];
        
//         var dropdown_check = new MutationObserver(() => {

//             if (dropdown.style.display != "none" && !count) {
                
//                 var popup_list = document.getElementsByTagName("ytd-menu-popup-renderer")[0].getElementsByTagName("yt-formatted-string");
//                 console.log("list : " + popup_list);
//                 console.log("list : " + popup_list[0]);
//                 console.log("list : " + popup_list[1]);
//                 Array.prototype.forEach.call(popup_list, (object) => {
//                     console.log("object : " + object.innerText);
//                     if (object.innerText == "保存") {
//                         console.log("click before");
//                         object.click();
                        
//                         console.log("click after: count -> " + ++count);

                        
//                         // setTimeout(() => {
//                         //     select_dialog_object = document.getElementsByTagName("tp-yt-paper-dialog")[0];
//                         //     console.log("where_save_dialog_check start");
//                         //     document.getElementById("playlists").querySelectorAll('[title="後で見る"]')[0].click();
//                         //     console.log("where_save_dialog_check end");
//                         // }, 1000);
//                     }
//                 })
//             }

//         });
        
        
//         // var where_save_dialog_check = new MutationObserver(() => {
//         //     document.getElementById("close-button").click();
//         // });

//         dropdown_check.observe(dropdown, { attributes: true });
        
//         // setTimeout(() => {
//         //     console.log("select_dialog_object: " + select_dialog_object);
//         //     where_save_dialog_check.observe(select_dialog_object, { attributes: true });
//         // }, 5000);

        
        
        
//     }
    
// }
