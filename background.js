// // Hayda kelo ma elo lzom for now, bas might need this file later

// console.log("start");

// chrome.tabs.onUpdated.addListener((tabId, changed_info, tab) => {
//     if (changed_info.status == "complete") {
//         console.log(tab.url)
//         console.log("yessss");
//         while (true) {
//         // if(tab.url.startsWith("https://www.figma.com/design/")) {
//             try {
//                 console.log("trying")
//                 chrome.tabs.sendMessage(tabId, {
//                     type: "GET_CODE",
//                     attr: "a"
//                 })
//                 break;
//             }
//             catch {
//                 console.log("failing")
//             }
//         // }
//         }
//         console.log("done")
//     }
    
// })
