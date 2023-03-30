

window.onload = function() {
    
    console.log("js start");
    var screen_size = screen.width;
    var watch_url_pattern = "https://www.youtube.com/watch?v=";
    var video_object = document.getElementById("player").getElementsByTagName("video")[0];
    var video_attributes_check = new MutationObserver(() => {
        video_object = document.getElementById("player").getElementsByTagName("video")[0];
        video_size_change();
    });
    

    // videoサイズの初期化
    video_size_change()
    
    // ウィンドウのリサイズを管理
    window.addEventListener("resize", video_size_change());    

    // videoのリサイズを管理。
    var video_config = { attributes: true };
    video_attributes_check.observe(video_object, video_config);
    
    // min video -> default video: ビデオサイズを再度調整
    var url_config = { childList: true, subtree: true };
    video_attributes_check.observe(document, url_config);


    
    
    // 広告スキップ
    window.addEventListener("keypress", (e) => {
        console.log("push key is : " + e.key);
        if (e.key == ";") {
            console.log("push key is ;");
            var ad_skip_object = document.getElementsByClassName("ytp-ad-skip-button-container")[0]
            var ad_overlay_close_object = document.getElementsByClassName("ytp-ad-overlay-close-button")[0]
            if (ad_skip_object) ad_skip_object.click();
            if (ad_overlay_close_object) ad_overlay_close_object.click();
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
    

}





// 
// var bottom_bar = document.getElementsByClassName("ytp-chrome-bottom");
// bottom_bar[0].classList.add("bottom-bar");

// var video_style = "--ytd-watch-flexy-scrollbar-width:17px; --ytd-watch-flexy-space-below-player:31px; --ytd-watch-flexy-panel-max-height:385px; --ytd-watch-flexy-chat-max-height:385px; --ytd-watch-flexy-structured-description-max-height:385px; --ytd-watch-flexy-comments-panel-max-height:385px;";
// window.onload = function() {
//     console.log("hello");
//     setTimeout(function(){
//         // console.log("I am the third log after 5 seconds");
//         document.getElementsByTagName("ytd-watch-flexy")[0].style = video_style;
//     },10000);
    
// }