document.addEventListener("DOMContentLoaded", () => {
    const opacitySlider = document.getElementById("opacitySlider");

    opacitySlider.addEventListener("input", (event) => {
        const opacityValue = event.target.value;

        // Send a message to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "setOpacity", value: opacityValue });
        });
    });
});
