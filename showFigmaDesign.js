// Existing code to create the figmaHTML element
let figmaHTMLString = `
    <div class = "ABBASS3AMMAK" ; style="width: 100vw; height: 100vh; position: relative; background: #FAFAFA">
        <div style="width: 685px; height: 492px; left: 0px; top: 0px; position: absolute; background: #FAFAFA"></div>
        <div style="height: 202px; left: 375px; top: 145px; position: relative">
            <div style="width: 276px; left: 0px; top: 0px; position: absolute; color: black; font-size: 38px; font-family: Inter; font-weight: 700; line-height: 43.70px; word-wrap: break-word">
                Build your own team library
            </div>
            <div style="width: 278px; left: 0px; top: 106px; position: absolute; color: rgba(0, 0, 0, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 24px; word-wrap: break-word">
                Don't reinvent the wheel with every design. Team libraries let you share styles and components across files, with everyone on your team.
            </div>
        </div>
    </div>


`;

// Function to fetch the data from the API and update the figmaHTML element
async function fetchAndUpdateFigmaHTML() {
    const apiUrl = "https://epic-name.onrender.com/get_data?name=1";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the payload contains the figmaHTML string under `data.html`
        const figmaHTMLString = data.payload;

        // Create or update the figmaHTML element
        let figmaHTML = document.querySelector("figma_div");
        if (!figmaHTML) {
            figmaHTML = document.createElement("figma_div");
            document.body.appendChild(figmaHTML);
        }

        figmaHTML.innerHTML = figmaHTMLString;
        figmaHTML.style.position = "absolute";
        figmaHTML.style.opacity = "0.5"; // Default opacity, can be controlled via slider
        figmaHTML.style.top = "0";
        figmaHTML.style.zIndex = "9999";

        console.log("Figma HTML updated:", figmaHTML);
    } catch (error) {
        console.error("Failed to fetch and update Figma HTML:", error);
    }
}

// Call the function to fetch and update
fetchAndUpdateFigmaHTML();

let figmaHTML = document.createElement("figma_div");
figmaHTML.innerHTML = figmaHTMLString;
figmaHTML.style.position = 'absolute';
figmaHTML.style.opacity = '0.5';
figmaHTML.style.top = '0';
figmaHTML.style.zIndex = '9999';

document.body.appendChild(figmaHTML);
console.log(figmaHTML);

// Tooltip remains the same
const tooltip = document.createElement("div");
tooltip.style.position = "fixed";
tooltip.style.padding = "8px";
tooltip.style.background = "rgba(0, 0, 0, 0.8)";
tooltip.style.color = "#fff";
tooltip.style.borderRadius = "4px";
tooltip.style.fontSize = "12px";
tooltip.style.pointerEvents = "none";
tooltip.style.visibility = "hidden";
tooltip.style.zIndex = "10000";
document.body.appendChild(tooltip);

// Create horizontal and vertical lines
const horizontalLine = document.createElement("div");
horizontalLine.style.position = "absolute";
horizontalLine.style.borderTop = "1px dotted red";
horizontalLine.style.color = "red";
horizontalLine.style.fontSize = "10px";
horizontalLine.style.whiteSpace = "nowrap";
horizontalLine.style.zIndex = "10000";
horizontalLine.style.visibility = "hidden";

const verticalLine = document.createElement("div");
verticalLine.style.position = "absolute";
verticalLine.style.borderLeft = "1px dotted blue";
verticalLine.style.color = "blue";
verticalLine.style.fontSize = "10px";
verticalLine.style.whiteSpace = "nowrap";
verticalLine.style.zIndex = "10000";
verticalLine.style.visibility = "hidden";

document.body.appendChild(horizontalLine);
document.body.appendChild(verticalLine);

// Helper function to check if a parent has the target class
function hasParentWithClass(element, className) {
    let parent = element.parentElement;
    while (parent) {
        if (parent.classList.contains(className)) {
            return true;
        }
        parent = parent.parentElement;
    }
    return false;
}

// Function to show measurements and lines
function showMeasurements(event) {
    const target = event.target;


    if (
        target.tagName.toLowerCase() === "div"
    ) {
        // Check for visible text
        if (target.textContent.trim() === "") {
            tooltip.style.visibility = "hidden";
            horizontalLine.style.visibility = "hidden";
            verticalLine.style.visibility = "hidden";
            return;
        }

        const computedStyle = getComputedStyle(target);
        const rect = target.getBoundingClientRect();
        const parentRect = target.parentElement?.getBoundingClientRect();

        // Screen dimensions
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Measurements
        const distanceLeft = rect.left;
        const distanceTop = rect.top;
        const distanceRight = screenWidth - rect.right;
        const distanceBottom = screenHeight - rect.bottom;

        const widthPercentScreen = ((rect.width / screenWidth) * 100).toFixed(2);
        const heightPercentScreen = ((rect.height / screenHeight) * 100).toFixed(2);

        const widthPercentParent = parentRect
            ? ((rect.width / parentRect.width) * 100).toFixed(2)
            : "N/A";
        const heightPercentParent = parentRect
            ? ((rect.height / parentRect.height) * 100).toFixed(2)
            : "N/A";

        // Tooltip for text styles
        const textStyles = `
            Font Family: ${computedStyle.fontFamily}<br>
            Font Size: ${computedStyle.fontSize}<br>
            Font Weight: ${computedStyle.fontWeight}<br>
            Color: ${computedStyle.color}<br>
            Line Height: ${computedStyle.lineHeight}
        `;
        tooltip.innerHTML = textStyles;
        tooltip.style.visibility = "visible";
        tooltip.style.left = `${event.clientX + 15}px`;
        tooltip.style.top = `${event.clientY + 15}px`;

        // Horizontal line
        horizontalLine.style.top = `${rect.top}px`;
        horizontalLine.style.left = "0";
        horizontalLine.style.width = "100%";
        horizontalLine.style.visibility = "visible";
        horizontalLine.textContent = `${distanceLeft}px / ${widthPercentScreen}% / ${widthPercentParent}%`;

        // Vertical line
        verticalLine.style.left = `${rect.left}px`;
        verticalLine.style.top = "0";
        verticalLine.style.height = "100%";
        verticalLine.style.visibility = "visible";
        verticalLine.textContent = `${distanceTop}px / ${heightPercentScreen}% / ${heightPercentParent}%`;
    }
}

// Function to hide tooltip and lines
function hideMeasurements() {
    tooltip.style.visibility = "hidden";
    horizontalLine.style.visibility = "hidden";
    verticalLine.style.visibility = "hidden";
}

// Attach event listeners
document.addEventListener("mouseover", showMeasurements);
document.addEventListener("mouseout", hideMeasurements);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setOpacity") {
        const figmaHTML = document.querySelector("figma_div");
        if (figmaHTML) {
            figmaHTML.style.opacity = message.value;
        } else {
            console.error("figmaHTML element not found!");
        }
    }
});
