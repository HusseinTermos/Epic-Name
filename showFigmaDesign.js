// lezem hay ten2ara mn file ("example_html.html"), aw gets updated somehow by the user
const target = document.body;
let observer = new MutationObserver((mutations) => {
    updateDesign();
})
observer.observe(target, {attributes: true, attributeFilter: ["style", "class"]})

let figmaHTMLString;
const figmaHTML = document.createElement("div");
figmaHTML.setAttribute("id", "figma_div_epic_name_id")
document.body.appendChild(figmaHTML);

function updateDesign() {
    console.log("RECVEDDDD");
    const code_blocks = document.getElementsByClassName("code_panel--codeWell--9P6tu code_panel--codeWellWithLeftGutter--Tp2Pe");
    console.log(code_blocks);
    try {
        figmaHTMLString = code_blocks[0].lastChild.innerText;
    }
    catch (TypeError) {
        return;
    }
    figmaHTML.innerHTML = figmaHTMLString; // hacky??
    figmaHTML.style.position = 'absolute';
    figmaHTML.style.opacity = '0.5';
    figmaHTML.style.top = '0';
    // to make sure l figma wara kel shi (fina n3mla fo2 kel shi, just remove the "-")
    figmaHTML.style.zIndex = '9999';
}
