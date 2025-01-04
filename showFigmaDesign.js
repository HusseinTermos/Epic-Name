// lezem hay ten2ara mn file ("example_html.html"), aw gets updated somehow by the user
let figmaHTMLString = `<div style="width: 100%; height: 100%; position: relative">
    <div style="width: 685px; height: 492px; left: 0px; top: 0px; position: absolute; background: #FAFAFA"></div>
    <img style="width: 342.50px; height: 492px; left: 0px; top: 0px; position: absolute" src="https://via.placeholder.com/342x492" />
    <div style="height: 202px; left: 375px; top: 145px; position: absolute">
        <div style="width: 276px; left: 0px; top: 0px; position: absolute; color: black; font-size: 38px; font-family: Inter; font-weight: 700; line-height: 43.70px; word-wrap: break-word">Build your own team library</div>
        <div style="width: 278px; left: 0px; top: 106px; position: absolute; color: rgba(0, 0, 0, 0.80); font-size: 14px; font-family: Inter; font-weight: 400; line-height: 24px; word-wrap: break-word">Don’t reinvent the wheel with every design. Team libraries let you share styles and components across files, with everyone on your team.</div>
    </div>
</div>`;

figmaHTML = document.createElement("figma_div");
figmaHTML.innerHTML = figmaHTMLString;
figmaHTML.style.position = 'absolute';
figmaHTML.style.opacity = '0.5';
figmaHTML.style.top = '0';
// to make sure l figma wara kel shi (fina n3mla fo2 kel shi, just remove the "-")
figmaHTML.style.zIndex = '-9999';

document.body.appendChild(figmaHTML);
console.log(figmaHTML);

