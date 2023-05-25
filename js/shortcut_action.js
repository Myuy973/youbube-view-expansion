
let notice_object;
export const setNotice_object = (value) => {
    notice_object = value;
}

export function add_skip() {
    var ad_skip_object = document.getElementsByClassName("ytp-ad-skip-button-container")[0]
    var ad_overlay_close_object = document.getElementsByClassName("ytp-ad-overlay-close-button")[0]
    if (ad_skip_object) ad_skip_object.click();
    if (ad_overlay_close_object) ad_overlay_close_object.click();
}

export function like_action() {
    var video_like_button = document.getElementById("segmented-like-button");
    
    if (video_like_button) {
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


export function notice_animation() {
    notice_object.classList.remove("notice-fade-out");
    notice_object.classList.add("notice-fade-in");

    setTimeout(function(){
        notice_object.classList.remove("notice-fade-in");
        notice_object.classList.add("notice-fade-out");
    },2000);
}

