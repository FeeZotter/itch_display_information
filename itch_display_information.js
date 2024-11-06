console.log("addon is loaded");                

onOffBtn = "";
informationPanel = "";

let displayInformation = {
    name: "switch",
    status: true,
};

function setDisplayInformation(bool) {
    displayInformation = {
        name: "switch",
        status: bool,
    }
}

function innit(item) {
    informationPanel = document.querySelector('[id^="game_info_panel_"]').cloneNode(true);
    if(informationPanel != null)
    {
        document.body.insertBefore(informationPanel, document.body.children[1]);
        informationPanel.id = "informationPanel";
        informationPanel.className = "user_tools information_panel";
        
        style = document.createElement("style");
        document.body.appendChild(style);
        styleText = " @media (max-width: 1300px) { .information_panel .action_btn {  font-size: 12px; }}"
        styleText += "@media (max-width: 960px) { .information_panel { position: absolute; opacity: 0; } }"
        styleText += ".tooltip { position: relative; display: inline-block; border-bottom: 1px dotted black; } ";
        styleText += ".tooltip .tooltiptext { visibility: hidden; width: 120px; background-color: black; color: #fff; text-align: center; padding: 5px 0; border-radius: 6px; position: absolute; z-index: 1; } ";
        styleText += ".tooltip:hover .tooltiptext { visibility: visible;} ";
        styleText += ".information_panel { text-align: left; left: 0; width: 14%; color: white; margin: 0px 0px 0px 10px; font-size: 16px; } ";
        styleText += ".information_panel table {  border-spacing: 0 10px; } ";
        styleText += ".information_panel table tbody tr {box-shadow: 0 0 0 1px rgba(255,255,255,0.2); border-radius: 2px; background: rgba(0, 0, 0, 0.8); } ";
        styleText += ".information_panel table tbody tr td {padding: .1428571429em .2857142857em; vertical-align:top; } ";
        style.innerHTML = styleText;

        onOffDiv = document.createElement("div");
        onOffLabel = document.createElement("label");
        onOffLabelText = document.createElement("span");
        onOffBtn = document.createElement("input");
        onOffBtn.addEventListener('change', function() { changeStatus(this); }, false);
        
        onOffLabelText.innerHTML = "show [More information] in sidebar";
        onOffLabelText.className = "tooltiptext";
        
        onOffBtn.name = "";
        onOffLabel.className = "tooltip";
        onOffBtn.type = "checkbox";
        
        if(item.displayInformation === undefined)
        {
            console.log("undefined")
            browser.storage.local.set({ displayInformation }).then(console.log(displayInformation), onError);
            onOffBtn.checked = "checked";
        } 
        else if (item.displayInformation.status)
        {
            console.log(item.displayInformation.status)
            onOffBtn.checked = "checked";
        }
        else
        {
            informationPanel.hidden = true; 
        }
        
        onOffDiv.appendChild(onOffLabel);
        onOffLabel.appendChild(onOffBtn);
        onOffLabel.appendChild(onOffLabelText);
        header = document.body.children[0].children[1];
        header.insertBefore(onOffDiv, header.children[3])    
    }
}

function changeStatus(btn) { 
    console.log(btn.checked); 
    if(btn.checked) 
    {
        informationPanel.hidden = false; 
        setDisplayInformation(true);
        browser.storage.local.set({ displayInformation }).then(console.log(displayInformation), onError);
        console.log(browser.storage.local.get("displayInformation"));
    }
    else
    {
        informationPanel.hidden = true; 
        setDisplayInformation(false);
        browser.storage.local.set({ displayInformation }).then(console.log(displayInformation), onError);
        console.log(browser.storage.local.get("displayInformation"));
    }
}
function onError(error) { console.log(error); }
window.addEventListener("load", browser.storage.local.get("displayInformation").then(innit));