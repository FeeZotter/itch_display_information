onOffBtn = "";
informationPanel = "";


  /*
  chrome.storage.local.get(["key"]).then((result) => {
    console.log("Value is " + result.key);
  });
  */

let displayInformation = {
    name: "switch",
    status: true,
};

function setDisplayInformation(bool) {
    chrome.storage.local.set({ "displayInformation": bool });
}

function getDisplayInformation() {
    return chrome.storage.local.get(["displayInformation"]).key;
}

function innit(item) {
    informationPanel = document.querySelector('[id^="game_info_panel_"]').cloneNode(true);
    if(informationPanel != null)
    {
        document.body.insertBefore(informationPanel, document.body.children[1]);
        informationPanel.id = "informationPanel";
        informationPanel.className = "user_tools information_panel";
        
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
        style = document.createElement("style");
        style.innerHTML = "@media (max-width: 1300px) { .information_panel .action_btn {  font-size: 12px; }} @media (max-width: 960px) { .information_panel { position: absolute; opacity: 0; } } .tooltip { position: relative; display: inline-block; border-bottom: 1px dotted black; } .tooltip .tooltiptext { visibility: hidden; width: 120px; background-color: black; color: #fff; text-align: center; padding: 5px 0; border-radius: 6px; position: absolute; z-index: 1; } .tooltip:hover .tooltiptext { visibility: visible;} .information_panel { text-align: left; left: 0; width: 14%; color: white; margin: 0px 0px 0px 10px; font-size: 16px; } .information_panel table {  border-spacing: 0 10px; } .information_panel table tbody tr {box-shadow: 0 0 0 1px rgba(255,255,255,0.2); border-radius: 2px; background: rgba(0, 0, 0, 0.8); } .information_panel table tbody tr td {padding: .1428571429em .2857142857em; vertical-align:top; } ";
        document.body.appendChild(style);

        onOffDiv = document.createElement("div");
        onOffLabel = document.createElement("label");
        onOffDiv.appendChild(onOffLabel);
        onOffLabelText = document.createElement("span");
        onOffLabel.appendChild(onOffLabelText);
        onOffBtn = document.createElement("input");
        onOffLabel.appendChild(onOffBtn);

        onOffLabelText.className = "tooltiptext";
        onOffLabelText.innerHTML = "show [More information] in sidebar";
    
        onOffBtn.type = "checkbox";
        onOffLabel.className = "tooltip";
        onOffBtn.addEventListener('change', function() { changeStatus(this); }, false);
        
        if(item === undefined)
        {
            setDisplayInformation(true);
            onOffBtn.checked = "checked";
        } 
        else if (item)
        {
            onOffBtn.checked = "checked";
        }
        else { informationPanel.hidden = true; }
        

        informationPanel.insertBefore(onOffDiv, informationPanel.children[0])    
    }
}

function changeStatus(btn) { 
    informationPanel.children[1].hidden = !btn.checked; 
    setDisplayInformation(btn.checked);
}
function onError(error) { console.log(error); }
window.addEventListener("load", innit(getDisplayInformation()));