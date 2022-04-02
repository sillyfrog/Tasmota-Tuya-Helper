// To generate the Bookmartlet, run the following:
// ./makebookmarklet.pl tuya-helper.js
// That will print to screen, or, for committing to git, output to a file, eg:
// ./makebookmarklet.pl tuya-helper.js > tuya-bookmarklet.js
var lastval = "";
var fnidmap = {
    0: "None",
    1: "Switch 1 (bool)",
    2: "Switch 2 (bool)",
    3: "Switch 3 (bool)",
    4: "Switch 4 (bool)",
    11: "Relay 1 (bool)",
    12: "Relay 2 (bool)",
    13: "Relay 3 (bool)",
    14: "Relay 4 (bool)",
    15: "Relay 5 (bool)",
    16: "Relay 6 (bool)",
    17: "Relay 7 (bool)",
    18: "Relay 8 (bool)",
    21: "Dimmer (integer)",
    22: "Dimmer2",
    23: "CCT Light",
    24: "RGB light",
    25: "white light",
    26: "light mode set (0 = white and 1 = color)",
    27: "to report the state of Dimmer1",
    28: "to report the state of Dimmer2",
    31: "Power in deci Watt (integer)",
    32: "Current in milli Amps (integer)",
    33: "Voltage in deci Volt (integer)",
    34: "Battery State (integer)",
    35: "Battery percentage % (integer)",
    36: "Power Combined deci KWh (integer)",
    37: "Power Total deci KWh (integer)",
    41: "Relay Inverted 1 (bool)",
    42: "Relay Inverted 2 (bool)",
    43: "Relay Inverted 3 (bool)",
    44: "Relay Inverted 4 (bool)",
    45: "Relay Inverted 5 (bool)",
    46: "Relay Inverted 6 (bool)",
    47: "Relay Inverted 7 (bool)",
    48: "Relay Inverted 8 (bool)",
    51: "Battery powered sensor mode (slightly different protocol)",
    61: "for 3 speeds fan controller (possible values 0,1,2)",
    62: "for 4 speeds fan controller (possible values 0,1,2,3)",
    63: "for 5 speeds fan controller (possible values 0,1,2,3,4)",
    64: "for 6 speeds fan controller (possible values 0,1,2,3,4,5)",
    71: "Temperature Sensor",
    72: "Temperature Set",
    73: "Humidity Sensor",
    74: "Humidity Set",
    75: "Illuminance Sensor",
    76: "TVOC Sensor",
    77: "CO2 Sensor",
    78: "ECO2 Sensor",
    79: "%LEL gas Sensor",
    81: "Timer 1",
    82: "Timer 2",
    83: "Timer 3",
    84: "Timer 4",
    97: "for motor direction",
    98: "for error logging (report only)",
    99: "as a dummy function",
};

var sentcommand = false;

function timerLoop() {
    if (!sentcommand) {
        sentcommand = true;
        refreshConfig();
    }
    // Dim the green backgrounds
    for (var row of document.getElementById("tuyatable").rows) {
        if (row.children[3].style.backgroundColor) {
            var asint = parseInt(row.children[3].style.backgroundColor.split(",")[1]);
            asint -= 30;
            if (asint < 1) {
                row.children[3].style.backgroundColor = "";
            } else {
                row.children[3].style.backgroundColor = "rgb(0, " + asint + ", 0)";
            }
        }
        try {
            if (row.children[4].children[0].children[0].style.backgroundColor) {
                row.children[4].children[0].children[0].style.backgroundColor = "";
            }
        } catch (e) {
            // Ignore
        }

    }

    var ret = t1.value.substr(lastval.length);
    lastval = t1.value;
    if (ret) {
        for (var line of ret.split("\n")) {
            if (line.length < 9) {
                continue;
            }
            var spacer = line.indexOf(" ");

            var time = line.substr(0, spacer);
            var cmdline = line.substr(spacer + 1);
            if (cmdline.indexOf("{") >= 0) {
                try {
                    var data = JSON.parse(cmdline.substr(cmdline.indexOf("{")));
                    processJSON(data);
                } catch (e) {
                    // ignore
                }
            }
            //console.log("Got line:", cmdline);
        }
    }
}

function refreshConfig() {
    window.setTimeout(function() { sendCommand("Backlog Weblog 4; TuyaSend8;"); }, 500);
    window.setTimeout(function() { sendCommand("TuyaMCU;"); }, 900);
    tuyaMcuState = {};
}

function sendCommand(cmd) {
    console.log("Sending command:", cmd);
    document.getElementById("c1").value = cmd;
    l(1);
}

function setBool(e, val) {
    var dpid = e.dataset.id;
    sendCommand("TuyaSend1 " + dpid + "," + val);
}

function setInteger(frm) {
    var intval;
    var val = frm.children[0].value;
    if (val.substr(0, 2) == '0x') {
        intval = parseInt(val.substr(2), 16);
    } else {
        intval = parseInt(val, 10);
    }
    if (intval >= 0 && intval <= 0xffffffff) {
        frm.children[0].style.backgroundColor = "#090";
        sendCommand("TuyaSend2 " + frm.dataset.id + "," + intval);
    } else {
        frm.children[0].style.backgroundColor = "#900";
    }
    return false;
}

function setString(frm) {
    var val = frm.children[0].value.trim();
    frm.children[0].value = val;
    frm.children[0].style.backgroundColor = "#090";
    sendCommand("TuyaSend3 " + frm.dataset.id + "," + val);
    return false;
}

function setEnum(frm) {
    var intval;
    var val = frm.children[0].value;
    intval = parseInt(val, 10);
    if (intval >= 0 && intval <= 5) {
        frm.children[0].style.backgroundColor = "#090";
        sendCommand("TuyaSend4 " + frm.dataset.id + "," + intval);
    } else {
        frm.children[0].style.backgroundColor = "#900";
    }
    return false;
}

function updateCurrentState() {
    var cmd = "Backlog ";
    for (var dpid in tuyaMcuState) {
        var fnid = tuyaMcuState[dpid];
        cmd += "TuyaMCU " + fnid + "," + dpid + "; ";
    }
    document.getElementById("currentstate").innerText = cmd;
    return currentstate;
}

function genBacklogCmd() {
    if (Object.keys(tuyaStateToSet).length === 0) {
        document.getElementById("setstate").style.display = "none";
        document.getElementById("setstatelabel").style.display = "none";
        var cmd = "";
    } else {
        document.getElementById("setstate").style.display = "";
        document.getElementById("setstatelabel").style.display = "";
        var cmd = "Backlog ";
        for (var dpid in tuyaStateToSet) {
            var fnid = tuyaStateToSet[dpid];
            if (fnid == 0) {
                cmd += "TuyaMCU " + tuyaMcuState[dpid] + ",0; ";
            } else {
                cmd += "TuyaMCU " + fnid + "," + dpid + "; ";
            }
        }
    }
    document.getElementById("statetoset").innerText = cmd;
    return cmd;
}


function sendBacklogCmd() {
    sendCommand(genBacklogCmd());
    tuyaStateToSet = {};
    genBacklogCmd();
    return false;
}

function newFnId(e) {
    var dpid = parseInt(e.id.substr(4));
    var fnid = parseInt(e.value);
    tuyaStateToSet[dpid] = fnid;
    genBacklogCmd();
}

function fnidSelect(dpid) {
    var html = "<select id='dpfn" + dpid + "' onchange='newFnId(this);'>";
    for (var id in fnidmap) {
        html += "<option value='" + id + "'>" + id + ": " + fnidmap[id] + "</option>";
    }
    html += "</select>";
    return html;
}

function displayInt(val) {
    var ret = '';
    var valint = parseInt(val, 16);
    ret += valint + " (0x" + valint.toString(16) + ")";
    return ret;
}

var knownState = {};
var tuyaMcuState = {};
var tuyaStateToSet = {};

function updateRow(data) {
    var id = "dprow" + data.DpId;
    var row = document.getElementById(id);
    if (!row) {
        // Figure out where to insert it
        var myDpId = parseInt(data.DpId);
        var i = 0;
        var table = document.getElementById("tuyatable");
        while (true) {
            var nextrow = table.rows[i];
            if (!nextrow) {
                break;
            }
            if (parseInt(nextrow.dataset.id) > myDpId) {
                break;
            }
            i++;
        }
        row = table.insertRow(i);
        row.id = id;
        row.dataset.id = myDpId;
        for (var i = 0; i < 6; i++) {
            var td = document.createElement("td");
            row.appendChild(td);
        }
        if (data.DpIdType == 1) {
            row.children[4].innerHTML = "<button data-id=" + data.DpId + " onclick='setBool(this, 1);'>On</button>";
            row.children[4].innerHTML += "<button data-id=" + data.DpId + " onclick='setBool(this, 0);'>Off</button>";
        } else if (data.DpIdType == 2) {
            row.children[4].innerHTML = "<form onsubmit='return setInteger(this);' data-id=" + data.DpId + "><input /></form>";
        } else if (data.DpIdType == 3) {
            row.children[4].innerHTML = "<form onsubmit='return setString(this);' data-id=" + data.DpId + "><input /></form>";
        } else if (data.DpIdType == 4) {
            row.children[4].innerHTML = "<form onsubmit='return setEnum(this);' data-id=" + data.DpId + "><input type=number min=0 max=5 style='width:4em;' /></form>";
        }
        row.children[5].innerHTML = fnidSelect(data.DpId);
        row.children[5].children[0].value = tuyaMcuState[data.DpId];
    }
    row.children[0].innerText = data.DpId;
    var laststate = knownState[id];
    if (!laststate) {
        laststate = {};
    }
    if (data.DpIdType == 1) {
        row.children[1].innerText = "Boolean";
        row.children[2].innerText = laststate.DpIdData == "00" ? "Off" : "On";
        row.children[3].innerText = data.DpIdData == "00" ? "Off" : "On";
    } else if (data.DpIdType == 2) {
        row.children[1].innerText = "Integer";
        row.children[2].innerText = displayInt(laststate.DpIdData);
        row.children[3].innerText = displayInt(data.DpIdData);
    } else if (data.DpIdType == 3) {
        row.children[1].innerText = "String";
        if (laststate.Type3Data) {
            row.children[2].innerText = laststate.Type3Data;
        } else {
            row.children[2].innerText = "";
        }
        row.children[3].innerText = data.Type3Data;
    } else if (data.DpIdType == 4) {
        row.children[1].innerText = "Enum";
        if (laststate.DpIdData) {
            row.children[2].innerText = laststate.DpIdData;
        } else {
            row.children[2].innerText = "0";
        }
        row.children[3].innerText = data.DpIdData;
    }
    if (laststate.DpIdData != data.DpIdData) {
        row.children[3].style.backgroundColor = "rgb(0, 200, 0)";
    }
    knownState[id] = data;
}

function processJSON(data) {
    if (data.TuyaReceived) {
        for (var key in data.TuyaReceived) {
            if (key == parseInt(key)) {
                updateRow(data.TuyaReceived[key]);
            }
        }
    } else if (data.TuyaMCU) {
        for (var elem of data.TuyaMCU) {
            tuyaMcuState[elem.dpId] = elem.fnId;
            var e = document.getElementById("dpfn" + elem.dpId);
            if (e) {
                e.value = elem.fnId;
            }
            updateCurrentState();
        }
    } else if (data.RestartReason) {
        // The device has restarted, get the current config (maybe again)
        refreshConfig();
    }
}

if (intid) {
    window.clearInterval(intid);
}
var intid;

function setupTable() {
    if (document.getElementById("t1") && document.getElementById("c1")) {
        // Create the table to display the data, there is an empty <p> at the end, so we'll use that
        var ps = document.getElementsByTagName("p");
        var p = ps[ps.length - 1];
        p.innerHTML = "<style>table { border-collapse: collapse; border: 1px solid grey; } td, th { border: 1px solid grey; padding: 0px 6px; }</style>";
        p.innerHTML += "<table><tr><th>DpId</th><th>Type</th><th>Last Val</th><th>Cur Val</th><th>Send Val</th><th>FnId</th><tbody id='tuyatable'></tbody></table>";
        p.innerHTML += "<div><span id='setstatelabel' style='font-weight: bolder; display: none;'>Command To Update Configuration: </span><span id='statetoset' style='font-family: monospace;'></span><button id='setstate' onclick='return sendBacklogCmd();' style='width: auto; display: none;'>Send Command</button></div>";
        p.innerHTML += "<div><span style='font-weight: bolder;'>Current Configuration Command: </span><span id='currentstate' style='font-family: monospace;'></span></div>";
        p.innerHTML += "<div>Run <span style='font-family: monospace;'>weblog 2</span> when complete to return console log to default.</div>";
        p.innerHTML += "<div>See <a href='https://tasmota.github.io/docs/TuyaMCU/' target='_blank'>https://tasmota.github.io/docs/TuyaMCU/</a> for a full explanation of all of the options.</div>";
        p.innerHTML += "<div>See the <a href='https://github.com/sillyfrog/Tasmota-Tuya-Helper/wiki/Tips-for-Tuya-Convert' target='_blank'>wiki for troubleshooting tips</a>.</div>";
        p.innerHTML += "<div>Designed for Tasmota v8.5.1 or later.</div>";
        intid = window.setInterval(timerLoop, 1000);
    } else {
        alert("This should only be applied on the Console screen of Tasmota");
    }
}
if (!document.getElementById("tuyatable")) {
    setupTable();
}