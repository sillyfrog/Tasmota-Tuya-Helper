javascript:var%20lastval%20=%20%22%22;var%20fnidmap%20=%20{0:%20%22None%22,1:%20%22Switch%201%20(bool)%22,2:%20%22Switch%202%20(bool)%22,3:%20%22Switch%203%20(bool)%22,4:%20%22Switch%204%20(bool)%22,11:%20%22Relay%201%20(bool)%22,12:%20%22Relay%202%20(bool)%22,13:%20%22Relay%203%20(bool)%22,14:%20%22Relay%204%20(bool)%22,15:%20%22Relay%205%20(bool)%22,16:%20%22Relay%206%20(bool)%22,17:%20%22Relay%207%20(bool)%22,18:%20%22Relay%208%20(bool)%22,21:%20%22Dimmer%20(integer)%22,22:%20%22Dimmer2%22,23:%20%22CCT%20Light%22,24:%20%22RGB%20light%22,25:%20%22white%20light%22,26:%20%22light%20mode%20set%20(0%20=%20white%20and%201%20=%20color)%22,27:%20%22to%20report%20the%20state%20of%20Dimmer1%22,28:%20%22to%20report%20the%20state%20of%20Dimmer2%22,31:%20%22Power%20in%20deci%20Watt%20(integer)%22,32:%20%22Current%20in%20milli%20Amps%20(integer)%22,33:%20%22Voltage%20in%20deci%20Volt%20(integer)%22,34:%20%22Battery%20State%20(integer)%22,35:%20%22Battery%20percentage%20%25%20(integer)%22,36:%20%22Power%20Combined%20deci%20KWh%20(integer)%22,37:%20%22Power%20Total%20deci%20KWh%20(integer)%22,41:%20%22Relay%20Inverted%201%20(bool)%22,42:%20%22Relay%20Inverted%202%20(bool)%22,43:%20%22Relay%20Inverted%203%20(bool)%22,44:%20%22Relay%20Inverted%204%20(bool)%22,45:%20%22Relay%20Inverted%205%20(bool)%22,46:%20%22Relay%20Inverted%206%20(bool)%22,47:%20%22Relay%20Inverted%207%20(bool)%22,48:%20%22Relay%20Inverted%208%20(bool)%22,51:%20%22Battery%20powered%20sensor%20mode%20(slightly%20different%20protocol)%22,61:%20%22for%203%20speeds%20fan%20controller%20(possible%20values%200,1,2)%22,62:%20%22for%204%20speeds%20fan%20controller%20(possible%20values%200,1,2,3)%22,63:%20%22for%205%20speeds%20fan%20controller%20(possible%20values%200,1,2,3,4)%22,64:%20%22for%206%20speeds%20fan%20controller%20(possible%20values%200,1,2,3,4,5)%22,71:%20%22Temperature%20Sensor%22,72:%20%22Temperature%20Set%22,73:%20%22Humidity%20Sensor%22,74:%20%22Humidity%20Set%22,75:%20%22Illuminance%20Sensor%22,76:%20%22TVOC%20Sensor%22,77:%20%22CO2%20Sensor%22,78:%20%22ECO2%20Sensor%22,79:%20%22%25LEL%20gas%20Sensor%22,80:%20%22PM2.5%20Sensor%22,81:%20%22Timer%201%22,82:%20%22Timer%202%22,83:%20%22Timer%203%22,84:%20%22Timer%204%22,97:%20%22for%20motor%20direction%22,98:%20%22for%20error%20logging%20(report%20only)%22,99:%20%22as%20a%20dummy%20function%22,};var%20sentcommand%20=%20false;function%20timerLoop()%20{if%20(!sentcommand)%20{sentcommand%20=%20true;refreshConfig();}for%20(var%20row%20of%20document.getElementById(%22tuyatable%22).rows)%20{if%20(row.children[3].style.backgroundColor)%20{var%20asint%20=%20parseInt(row.children[3].style.backgroundColor.split(%22,%22)[1]);asint%20-=%2030;if%20(asint%20<%201)%20{row.children[3].style.backgroundColor%20=%20%22%22;}%20else%20{row.children[3].style.backgroundColor%20=%20%22rgb(0,%20%22%20+%20asint%20+%20%22,%200)%22;}}try%20{if%20(row.children[4].children[0].children[0].style.backgroundColor)%20{row.children[4].children[0].children[0].style.backgroundColor%20=%20%22%22;}}%20catch%20(e)%20{}}var%20ret%20=%20t1.value.substr(lastval.length);lastval%20=%20t1.value;if%20(ret)%20{for%20(var%20line%20of%20ret.split(%22\n%22))%20{if%20(line.length%20<%209)%20{continue;}var%20spacer%20=%20line.indexOf(%22%20%22);var%20time%20=%20line.substr(0,%20spacer);var%20cmdline%20=%20line.substr(spacer%20+%201);if%20(cmdline.indexOf(%22{%22)%20>=%200)%20{try%20{var%20data%20=%20JSON.parse(cmdline.substr(cmdline.indexOf(%22{%22)));processJSON(data);}%20catch%20(e)%20{}}}}}function%20refreshConfig()%20{window.setTimeout(function%20()%20{%20sendCommand(%22Backlog%20Weblog%204;%20TuyaSend8;%22);%20},%20500);window.setTimeout(function%20()%20{%20sendCommand(%22TuyaMCU;%22);%20},%20900);tuyaMcuState%20=%20{};}function%20sendCommand(cmd)%20{console.log(%22Sending%20command:%22,%20cmd);document.getElementById(%22c1%22).value%20=%20cmd;l(1);}function%20setBool(e,%20val)%20{var%20dpid%20=%20e.dataset.id;sendCommand(%22TuyaSend1%20%22%20+%20dpid%20+%20%22,%22%20+%20val);}function%20setInteger(frm)%20{var%20intval;var%20val%20=%20frm.children[0].value;if%20(val.substr(0,%202)%20==%20%270x%27)%20{intval%20=%20parseInt(val.substr(2),%2016);}%20else%20{intval%20=%20parseInt(val,%2010);}if%20(intval%20>=%200%20&&%20intval%20<=%200xffffffff)%20{frm.children[0].style.backgroundColor%20=%20%22#090%22;sendCommand(%22TuyaSend2%20%22%20+%20frm.dataset.id%20+%20%22,%22%20+%20intval);}%20else%20{frm.children[0].style.backgroundColor%20=%20%22#900%22;}return%20false;}function%20setString(frm)%20{var%20val%20=%20frm.children[0].value.trim();frm.children[0].value%20=%20val;frm.children[0].style.backgroundColor%20=%20%22#090%22;sendCommand(%22TuyaSend3%20%22%20+%20frm.dataset.id%20+%20%22,%22%20+%20val);return%20false;}function%20setEnum(frm)%20{var%20intval;var%20val%20=%20frm.children[0].value;intval%20=%20parseInt(val,%2010);if%20(intval%20>=%200%20&&%20intval%20<=%205)%20{frm.children[0].style.backgroundColor%20=%20%22#090%22;sendCommand(%22TuyaSend4%20%22%20+%20frm.dataset.id%20+%20%22,%22%20+%20intval);}%20else%20{frm.children[0].style.backgroundColor%20=%20%22#900%22;}return%20false;}function%20updateCurrentState()%20{var%20cmd%20=%20%22Backlog%20%22;for%20(var%20dpid%20in%20tuyaMcuState)%20{var%20fnid%20=%20tuyaMcuState[dpid];cmd%20+=%20%22TuyaMCU%20%22%20+%20fnid%20+%20%22,%22%20+%20dpid%20+%20%22;%20%22;}document.getElementById(%22currentstate%22).innerText%20=%20cmd;return%20currentstate;}function%20genBacklogCmd()%20{if%20(Object.keys(tuyaStateToSet).length%20===%200)%20{document.getElementById(%22setstate%22).style.display%20=%20%22none%22;document.getElementById(%22setstatelabel%22).style.display%20=%20%22none%22;var%20cmd%20=%20%22%22;}%20else%20{document.getElementById(%22setstate%22).style.display%20=%20%22%22;document.getElementById(%22setstatelabel%22).style.display%20=%20%22%22;var%20cmd%20=%20%22Backlog%20%22;for%20(var%20dpid%20in%20tuyaStateToSet)%20{var%20fnid%20=%20tuyaStateToSet[dpid];if%20(fnid%20==%200)%20{cmd%20+=%20%22TuyaMCU%20%22%20+%20tuyaMcuState[dpid]%20+%20%22,0;%20%22;}%20else%20{cmd%20+=%20%22TuyaMCU%20%22%20+%20fnid%20+%20%22,%22%20+%20dpid%20+%20%22;%20%22;}}}document.getElementById(%22statetoset%22).innerText%20=%20cmd;return%20cmd;}function%20sendBacklogCmd()%20{sendCommand(genBacklogCmd());tuyaStateToSet%20=%20{};genBacklogCmd();return%20false;}function%20newFnId(e)%20{var%20dpid%20=%20parseInt(e.id.substr(4));var%20fnid%20=%20parseInt(e.value);tuyaStateToSet[dpid]%20=%20fnid;genBacklogCmd();}function%20fnidSelect(dpid)%20{var%20html%20=%20%22<select%20id=%27dpfn%22%20+%20dpid%20+%20%22%27%20onchange=%27newFnId(this);%27>%22;for%20(var%20id%20in%20fnidmap)%20{html%20+=%20%22<option%20value=%27%22%20+%20id%20+%20%22%27>%22%20+%20id%20+%20%22:%20%22%20+%20fnidmap[id]%20+%20%22</option>%22;}html%20+=%20%22</select>%22;return%20html;}function%20displayInt(val)%20{var%20ret%20=%20%27%27;var%20valint%20=%20parseInt(val,%2016);ret%20+=%20valint%20+%20%22%20(0x%22%20+%20valint.toString(16)%20+%20%22)%22;return%20ret;}var%20knownState%20=%20{};var%20tuyaMcuState%20=%20{};var%20tuyaStateToSet%20=%20{};function%20updateRow(data)%20{var%20id%20=%20%22dprow%22%20+%20data.DpId;var%20row%20=%20document.getElementById(id);if%20(!row)%20{var%20myDpId%20=%20parseInt(data.DpId);var%20i%20=%200;var%20table%20=%20document.getElementById(%22tuyatable%22);while%20(true)%20{var%20nextrow%20=%20table.rows[i];if%20(!nextrow)%20{break;}if%20(parseInt(nextrow.dataset.id)%20>%20myDpId)%20{break;}i++;}row%20=%20table.insertRow(i);row.id%20=%20id;row.dataset.id%20=%20myDpId;for%20(var%20i%20=%200;%20i%20<%206;%20i++)%20{var%20td%20=%20document.createElement(%22td%22);row.appendChild(td);}if%20(data.DpIdType%20==%201)%20{row.children[4].innerHTML%20=%20%22<button%20data-id=%22%20+%20data.DpId%20+%20%22%20onclick=%27setBool(this,%201);%27>On</button>%22;row.children[4].innerHTML%20+=%20%22<button%20data-id=%22%20+%20data.DpId%20+%20%22%20onclick=%27setBool(this,%200);%27>Off</button>%22;}else%20if%20(data.DpIdType%20==%202)%20{row.children[4].innerHTML%20=%20%22<form%20onsubmit=%27return%20setInteger(this);%27%20data-id=%22%20+%20data.DpId%20+%20%22><input%20/></form>%22;}else%20if%20(data.DpIdType%20==%203)%20{row.children[4].innerHTML%20=%20%22<form%20onsubmit=%27return%20setString(this);%27%20data-id=%22%20+%20data.DpId%20+%20%22><input%20/></form>%22;}else%20if%20(data.DpIdType%20==%204)%20{row.children[4].innerHTML%20=%20%22<form%20onsubmit=%27return%20setEnum(this);%27%20data-id=%22%20+%20data.DpId%20+%20%22><input%20type=number%20min=0%20max=5%20style=%27width:4em;%27%20/></form>%22;}row.children[5].innerHTML%20=%20fnidSelect(data.DpId);row.children[5].children[0].value%20=%20tuyaMcuState[data.DpId];}row.children[0].innerText%20=%20data.DpId;var%20laststate%20=%20knownState[id];if%20(!laststate)%20{laststate%20=%20{};}if%20(data.DpIdType%20==%201)%20{row.children[1].innerText%20=%20%22Boolean%22;row.children[2].innerText%20=%20laststate.DpIdData%20==%20%2200%22%20?%20%22Off%22%20:%20%22On%22;row.children[3].innerText%20=%20data.DpIdData%20==%20%2200%22%20?%20%22Off%22%20:%20%22On%22;}else%20if%20(data.DpIdType%20==%202)%20{row.children[1].innerText%20=%20%22Integer%22;row.children[2].innerText%20=%20displayInt(laststate.DpIdData);row.children[3].innerText%20=%20displayInt(data.DpIdData);}else%20if%20(data.DpIdType%20==%203)%20{row.children[1].innerText%20=%20%22String%22;if%20(laststate.Type3Data)%20{row.children[2].innerText%20=%20laststate.Type3Data;}%20else%20{row.children[2].innerText%20=%20%22%22;}row.children[3].innerText%20=%20data.Type3Data;}else%20if%20(data.DpIdType%20==%204)%20{row.children[1].innerText%20=%20%22Enum%22;if%20(laststate.DpIdData)%20{row.children[2].innerText%20=%20laststate.DpIdData;}%20else%20{row.children[2].innerText%20=%20%220%22;}row.children[3].innerText%20=%20data.DpIdData;}if%20(laststate.DpIdData%20!=%20data.DpIdData)%20{row.children[3].style.backgroundColor%20=%20%22rgb(0,%20200,%200)%22;}knownState[id]%20=%20data;}function%20processJSON(data)%20{if%20(data.TuyaReceived)%20{for%20(var%20key%20in%20data.TuyaReceived)%20{if%20(key%20==%20parseInt(key))%20{updateRow(data.TuyaReceived[key]);}}}else%20if%20(data.TuyaMCU)%20{for%20(var%20elem%20of%20data.TuyaMCU)%20{tuyaMcuState[elem.dpId]%20=%20elem.fnId;var%20e%20=%20document.getElementById(%22dpfn%22%20+%20elem.dpId);if%20(e)%20{e.value%20=%20elem.fnId;}updateCurrentState();}}else%20if%20(data.RestartReason)%20{refreshConfig();}}if%20(intid)%20{window.clearInterval(intid);}var%20intid;function%20setupTable()%20{if%20(document.getElementById(%22t1%22)%20&&%20document.getElementById(%22c1%22))%20{var%20ps%20=%20document.getElementsByTagName(%22p%22);var%20p%20=%20ps[ps.length%20-%201];p.innerHTML%20=%20%22<style>table%20{%20border-collapse:%20collapse;%20border:%201px%20solid%20grey;%20}%20td,%20th%20{%20border:%201px%20solid%20grey;%20padding:%200px%206px;%20}</style>%22;p.innerHTML%20+=%20%22<table><tr><th>DpId</th><th>Type</th><th>Last%20Val</th><th>Cur%20Val</th><th>Send%20Val</th><th>FnId</th><tbody%20id=%27tuyatable%27></tbody></table>%22;p.innerHTML%20+=%20%22<div><span%20id=%27setstatelabel%27%20style=%27font-weight:%20bolder;%20display:%20none;%27>Command%20To%20Update%20Configuration:%20</span><span%20id=%27statetoset%27%20style=%27font-family:%20monospace;%27></span><button%20id=%27setstate%27%20onclick=%27return%20sendBacklogCmd();%27%20style=%27width:%20auto;%20display:%20none;%27>Send%20Command</button></div>%22;p.innerHTML%20+=%20%22<div><span%20style=%27font-weight:%20bolder;%27>Current%20Configuration%20Command:%20</span><span%20id=%27currentstate%27%20style=%27font-family:%20monospace;%27></span></div>%22;p.innerHTML%20+=%20%22<div>Run%20<span%20style=%27font-family:%20monospace;%27>weblog%202</span>%20when%20complete%20to%20return%20console%20log%20to%20default.</div>%22;p.innerHTML%20+=%20%22<div>See%20<a%20href=%27https://tasmota.github.io/docs/TuyaMCU/%27%20target=%27_blank%27>https://tasmota.github.io/docs/TuyaMCU/</a>%20for%20a%20full%20explanation%20of%20all%20of%20the%20options.</div>%22;p.innerHTML%20+=%20%22<div>See%20the%20<a%20href=%27https://github.com/sillyfrog/Tasmota-Tuya-Helper/wiki/Tips-for-Tuya-Convert%27%20target=%27_blank%27>wiki%20for%20troubleshooting%20tips</a>.</div>%22;p.innerHTML%20+=%20%22<div>Designed%20for%20Tasmota%20v8.5.1%20or%20later.</div>%22;p.style.color%20=%20%22#eaeaea%22;intid%20=%20window.setInterval(timerLoop,%201000);}%20else%20{alert(%22This%20should%20only%20be%20applied%20on%20the%20Console%20screen%20of%20Tasmota%22);}}if%20(!document.getElementById(%22tuyatable%22))%20{setupTable();}