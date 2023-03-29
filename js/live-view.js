

var video_object = document.getElementsByTagName("video")[0];
var screen_size = screen.width;

video_size_change()

window.addEventListener("resize", video_size_change());

var bottom_bar = document.getElementsByClassName("ytp-chrome-bottom");
bottom_bar[0].classList.add("bottom-bar");



function video_size_change() {
    
    if (window.outerWidth === screen_size) {
        // video_object[0].classList.add("video-view");
        // video_object.style.width = "872px";
        video_object.style.width = "100%";
        video_object.style.height = "516px";
    }

}









// var video_style = "--ytd-watch-flexy-scrollbar-width:17px; --ytd-watch-flexy-space-below-player:31px; --ytd-watch-flexy-panel-max-height:385px; --ytd-watch-flexy-chat-max-height:385px; --ytd-watch-flexy-structured-description-max-height:385px; --ytd-watch-flexy-comments-panel-max-height:385px;";
// window.onload = function() {
//     console.log("hello");
//     setTimeout(function(){
//         // console.log("I am the third log after 5 seconds");
//         document.getElementsByTagName("ytd-watch-flexy")[0].style = video_style;
//     },10000);
    
// }