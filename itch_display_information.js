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
        //add style
        style = document.createElement("style");
        style.innerHTML = "@media (max-width: 1300px) { .information_panel .action_btn {  font-size: 12px; }} @media (max-width: 960px) { .information_panel { position: absolute; opacity: 0; } } .tooltip { position: relative; display: inline-block; border-bottom: 1px dotted black; } .tooltip .tooltiptext { visibility: hidden; width: 120px; background-color: black; color: #fff; text-align: center; padding: 5px 0; border-radius: 6px; position: absolute; z-index: 1; } .tooltip:hover .tooltiptext { visibility: visible;} .information_panel { text-align: left; left: 0; width: 14%; color: white; margin: 0px 0px 0px 10px; font-size: 16px; } .information_panel table {  border-spacing: 0 10px; } .information_panel table tbody tr {box-shadow: 0 0 0 1px rgba(255,255,255,0.2); border-radius: 2px; background: rgba(0, 0, 0, 0.8); } .information_panel table tbody tr td {padding: .1428571429em .2857142857em; vertical-align:top; } ";
        document.body.appendChild(style);
        
        /**
        @media (max-width: 1300px) { .information_panel .action_btn {  font-size: 12px; }} 
        @media (max-width: 960px) { .information_panel { position: absolute; opacity: 0; } } 
        .tooltip { position: relative; display: inline-block; border-bottom: 1px dotted black; } 
        .tooltip .tooltiptext { visibility: hidden; width: 120px; background-color: black; color: #fff; text-align: center; padding: 5px 0; border-radius: 6px; position: absolute; z-index: 1; } 
        .tooltip:hover .tooltiptext { visibility: visible;} .information_panel { text-align: left; left: 0; width: 14%; color: white; margin: 0px 0px 0px 10px; font-size: 16px; } 
        .information_panel table {  border-spacing: 0 10px; } 
        .information_panel table tbody tr {box-shadow: 0 0 0 1px rgba(255,255,255,0.2); border-radius: 2px; background: rgba(0, 0, 0, 0.8); } 
        .information_panel table tbody tr td {padding: .1428571429em .2857142857em; vertical-align:top; }
         */

        //insert information panel
        document.body.insertBefore(informationPanel, document.body.children[1]);
        informationPanel.id = "informationPanel";
        informationPanel.className = "user_tools information_panel";
        
        //create toggle div
        onOffDiv = document.createElement("div");
        informationPanel.insertBefore(onOffDiv, document.body.children[1])
        onOffLabel = document.createElement("label");
        onOffLabel.className = "tooltip";
        onOffDiv.appendChild(onOffLabel);

        //toggle tooltip
        onOffLabelText = document.createElement("span");
        onOffLabelText.className = "tooltiptext";
        onOffLabelText.innerHTML = "show [More information] in sidebar";
        onOffLabel.appendChild(onOffLabelText);

        //toggle is button
        onOffBtn = document.createElement("input");
        onOffBtn.type = "checkbox";
        onOffBtn.addEventListener('change', function() { changeStatus(this); }, false);
        onOffLabel.appendChild(onOffBtn);
        
        if(item.displayInformation === undefined)
        {
            browser.storage.local.set({ displayInformation });
            onOffBtn.checked = "checked";
        } 
        else if (item.displayInformation.status)
        {
            onOffBtn.checked = "checked";
        }
        else { informationPanel.hidden = true; }
    }
}

function changeStatus(btn) { 
    informationPanel.hidden = !btn.checked; 
    setDisplayInformation(btn.checked);
    browser.storage.local.set({ displayInformation });
}
function onError(error) { console.log(error); }
window.addEventListener("load", browser.storage.local.get("displayInformation").then(innit));