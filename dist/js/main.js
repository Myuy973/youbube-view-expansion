(()=>{"use strict";let e;function t(){e.classList.remove("notice-fade-out"),e.classList.add("notice-fade-in"),setTimeout((function(){e.classList.remove("notice-fade-in"),e.classList.add("notice-fade-out")}),2e3)}var o,s,n="",i=!1;const r=e=>new Promise((t=>setTimeout(t,e))),l="www.youtube.com/watch?v=",c=screen.width,a=new MutationObserver(((e,t)=>{console.log("video_attributes_check----------------------"),console.log(e),e.forEach((e=>{"style"==e.attributeName&&(console.log("attributeName is style"),console.log(e),m("by observe"))})),console.log("video_attributes_check end")}));async function m(t){var l;await async function(e){for(console.log("data_setting css reset"),chrome.runtime.sendMessage({message:"remove css file"},(()=>{chrome.runtime.lastError})),console.log("data_setting css "),console.log(window.getComputedStyle(document.querySelector("html"))["overflow-x"]),o=null;!o||!s;)o="mini_player"!=e?document.getElementById("player").getElementsByTagName("video")[0]:document.getElementById("container").getElementsByTagName("video")[0],"other"==n&&"mini_player"==n||(s=document.getElementById("actions")),await r(100);console.log(`data_setting: ${o} ${s}`)}(t),"by observe"!=t&&(s.insertAdjacentHTML("beforeend",'<div id="notice"></div>'),l=document.getElementById("notice"),e=l,a.disconnect(),a.observe(o,{attributes:!0})),function(e){if(o){if(console.log(`video_size_change type: ${e}`),i="hidden"==window.getComputedStyle(document.querySelector("html"))["overflow-x"],"mini_player"==e)return console.log("mini_player"),void chrome.runtime.sendMessage({message:"remove css file"},(()=>{chrome.runtime.lastError}));const t=.564*o.clientWidth,s=o.clientHeight<=t;console.log(`video_object.clientWidth: ${o.clientWidth}, video_object.clientHeight: ${o.clientHeight}`),console.log(`max_video_height: ${t}, video_size_type: ${s}`),console.log(`outerWidth: ${outerWidth}, screen_size: ${c}`),console.log(`url_pattern: ${n}`),console.log(`css_type: ${i}`),s&&!i&&window.outerWidth===c&&"mini_player"!=n?(console.log("video_size_change if ok"),chrome.runtime.sendMessage({message:"add css file"},(()=>{chrome.runtime.lastError}))):!s&&i&&(console.log("video_size_change if else"),chrome.runtime.sendMessage({message:"remove css file"},(()=>{chrome.runtime.lastError})))}}(t)}window.onload=()=>{chrome.runtime.sendMessage({message:"url register"},(()=>{chrome.runtime.lastError,console.log("url register after"),chrome.runtime.sendMessage({message:"url change check"},(()=>{chrome.runtime.lastError}))}))},window.addEventListener("keypress",(o=>{switch(!0){case";"==o.key:n=document.getElementsByClassName("ytp-ad-skip-button-container")[0],i=document.getElementsByClassName("ytp-ad-overlay-close-button")[0],n&&n.click(),i&&i.click();break;case"u"==o.key:(s=document.getElementById("segmented-like-button"))&&(s.getElementsByTagName("button")[0]&&s.getElementsByTagName("button")[0].click(),document.getElementById("segmented-like-button").querySelectorAll('[aria-pressed="true"]')[0]?(e.innerText="いいねをはずしました",t()):document.getElementById("segmented-like-button").querySelectorAll('[aria-pressed="false"]')[0]&&(e.innerText="いいねしました",t()))}var s,n,i})),chrome.runtime.onMessage.addListener(((e,t,o)=>{switch(e.message){case"url change":!function(){if(console.log(`location.href.includes(watch_url_pattern): ${location.href.includes(l)}`),location.href.includes(l))console.log(`url_pattern: ${n}`),document.querySelector("[id*='player-overlay']")&&"ad-video"!=n?(console.log("ad+++++++++++++++++++++++++++++++++;;"),n="ad-video",m("by url change")):document.querySelector("[id*='player-overlay']")||"watch"==n||(console.log("watch+++++++++++++++++++++++++++++"),n="watch",m("by url change"));else if(!location.href.includes(l)){const e=document.getElementsByClassName("ytp-miniplayer-scrim").length;console.log(`mini_player: ${e}`),e&&"mini_player"!=n?(console.log("mini_player ok"),n="mini_player",m("mini_player")):e||"other"==n||(a.disconnect(),console.log("other"),n="other")}}();break;case"add css":chrome.runtime.sendMessage({message:"add css file"},(()=>{chrome.runtime.lastError}));break;case"remove css":chrome.runtime.sendMessage({message:"remove css file"},(()=>{chrome.runtime.lastError}))}}))})();