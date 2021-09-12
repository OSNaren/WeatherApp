let drpdown = $('#city-selecter');

//drpdown.empty();
//drpdown.prop('selectedIndex', 0);

const url = 'js/data.json';

// Populate dropdown with list of Cities
$.getJSON(url, function (data) {
    let i = 1;
    $.each(data, function (key, entry) {
        var idd = String('#cop' + i);
        drpdown.append($('<a onclick="e.preventDefault();return false;"></a>').attr({
            'value': entry.cityName,
            'class': 'dloptions',
            'id': idd
        }).text(entry.cityName));
        i++;
    })
});
let ulpar = document.getElementById('city-selecter');
let litems = ulpar.getElementsByClassName("dloptions");


let flg_ct_select = 0;
let city_select = document.getElementById("filterer");
let city_txt = document.getElementById("city-icon");


city_select.onchange = function onctChange() {
    var i = city_select.selectedIndex;
    var tt = city_select.value;
    city_select.blur();
    city_txt.focus();
    city_txt.click();
    var w_values = new Array(4);
    curtime(tt);
}

/**
 * @desc Getting current time
 * @param {String} tt
 * @return {Void} noresponse
 */
function curtime(tt) {
    $.getJSON(url, function (data) {
        //console.log(data);
        let proto;
        for (var i in data) {
            if (tt.toLowerCase() == i) {
                var tcity = data[i];
                row1_update(tcity, i);
                proto = new protocall(tcity, i);
                proto.row1_5hrs();
                overlay_upd(tcity);
            }
        }
    });
}

/**
 * @desc Updater for Row1
 * @param tcity
 * @param tname
 */
function row1_update(tcity, tname) {
    document.getElementById('city-icon').src = "img/city_icons/" + tname + ".svg";
    document.getElementById('city-icon').setAttribute('style', 'width:120px;height:120px');
    var tzone = tcity['timeZone'];
    let cur_time_dt = (new Date().toLocaleString("en-US", {timeZone: "" + tzone}));
    var full_date = new Date(cur_time_dt);
    var currtime = cur_time_dt.split(",")[0];
    var cdate = new Date(currtime);

    //console.log(Date.parse(currtime).toString("MMMM yyyy"));
    var mydate = full_date.getDate();
    var mymonth = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][full_date.getMonth()];

    console.log(cur_time_dt);
    console.log(full_date);
    //console.log(full_date.getHours());

    document.getElementsByClassName('w-date')[0].innerHTML = ("0" + mydate).slice(-2) + " - " + mymonth + " - " + full_date.getFullYear();
    //console.log(document.getElementsByClassName('w-time')[0].childNodes[0]);

    var myhr = ("0" + full_date.getHours()).slice(-2);
    var mymin = ("0" + full_date.getMinutes()).slice(-2);
    var mysec = ("0" + full_date.getSeconds()).slice(-2);
    if (cur_time_dt.endsWith('AM')) {
        document.getElementById('ampm-icon').src = "img/general/amState.svg"
        document.getElementsByClassName('w-time')[0].childNodes[0].nodeValue = myhr + ': ' + mymin + ": ";
        document.getElementsByClassName('w-secs')[0].childNodes[0].nodeValue = mysec;
    } else {
        myhr = Number(myhr) > 12 ? ("0" + (myhr - 12)).slice(-2) : myhr;
        document.getElementById('ampm-icon').src = "img/general/pmState.svg"
        document.getElementsByClassName('w-time')[0].childNodes[0].nodeValue = myhr + ': ' + mymin + ": ";
        document.getElementsByClassName('w-secs')[0].childNodes[0].nodeValue = mysec;
    }

    var wt_values = document.getElementsByClassName('wt-values');
    var tkeys = Object.keys(tcity);
    for (var i = 3, j = 0; i <= 5; i++, j++) {
        if (j == 2) {
            var matches = tcity[tkeys[i - 2]].match(/(\d+)/);
            var temp = Number(matches[0]);
            wt_values[j].innerHTML = Math.round((temp * 1.8) + 32) + " &deg;F";
            //console.log('Zoom',wt_values[j].innerHTML.length);
            if (wt_values[j].innerHTML.length > 5) {
                wt_values[j].setAttribute("style", "zoom:80%");
            }
            wt_values[j + 1].innerHTML = tcity[tkeys[i]];
        } else
            wt_values[j].innerHTML = tcity[tkeys[i]];
    }
}

class myproto {

    constructor() {
    }

    row1_5hrs() {
        let hr_tem = document.getElementsByClassName('wc-number');
        let tem_dt = this.tem_dt;
        //console.log(tem_dt);
        var temp = this.temp;
        hr_tem[0].innerHTML = temp[0] + temp[1].sup() + "🌡️";
        var tavg = 0;
        for (var i = 1; i < hr_tem.length - 1; i++) {
            temp = tem_dt[i - 1].split(' ');
            hr_tem[i].innerHTML = temp[0] + temp[1].sup() + "🌡️";
            tavg += Number(temp[0]);
        }
        hr_tem[5].innerHTML = Math.round(tavg / 4) + temp[1].sup() + "🌡️";

        //var tzone = this.tzone;
        //let cur_time_dt = this.cur_time_dt;
        var full_date = this.full_date;
        full_date.getHours();
        let temphr = this.temphr;
        let tm_tem = document.getElementsByClassName('wc-time');
        temphr = temphr.split(' ');
        var tx = Number(temphr[0]);
        for (i = 1; i < tm_tem.length; i++) {
            tx++;
            if (temphr[1] === 'AM' && tx > 12) {
                tx = 1;
                temphr[1] = "PM";
            }
            if (temphr[1] === 'PM' && tx > 12) {
                tx = 1;
                temphr[1] = "AM";
            }
            tm_tem[i].innerHTML = String(tx) + " " + temphr[1];
        }

        let wi_tem = document.getElementsByClassName('wc-icon');
        let we_tem = document.getElementsByClassName('wc-ic');

        for (i = 0; i < hr_tem.length; i++) {
            var txy = hr_tem[i].firstChild.nodeValue;
            switch (true) {
                case txy >= 23 && txy <= 29:
                    wi_tem[i].setAttribute('src', 'img/gifs/fcloud.gif');
                    break;
                case txy >= 18 && txy <= 22:
                    wi_tem[i].setAttribute('src', 'img/gifs/fwind.gif');
                    break;
                case txy > 29:
                    wi_tem[i].setAttribute('src', 'img/gifs/fsun.gif');
                    break;
                case txy < 18 && txy > 10:
                    wi_tem[i].setAttribute('src', 'img/gifs/frain.gif');
                    break;
                case txy <= 10:
                    wi_tem[i].setAttribute('src', 'img/gifs/fsnow.gif');
                    break;
            }


        }

        tm_tem[0].innerHTML = 'NOW';
        for (i = 0; i < tm_tem.length; i++) {
            tm_tem[i].style.fontSize = "19.2px";
            we_tem[i].style.fontSize = "large";
            we_tem[i].style.display = "none";
            wi_tem[i].style.display = "";
            hr_tem[i].style.fontSize = "22.4px";
        }
    }
}

class protocall extends myproto {
    constructor(tcity, i) {
        super();
        this.tem_dt = tcity['nextFiveHrs'];
        this.temp = tcity['temperature'].split(' ');
        this.tzone = tcity['timeZone'];
        this.cur_time_dt = (new Date().toLocaleString("en-US", {timeZone: "" + this.tzone}));
        this.full_date = new Date(this.cur_time_dt);
        this.temphr = (this.full_date.toLocaleString('en-US', {hour: 'numeric', hour12: true}));
    }
}

function ovly_loop(xo) {
    var ov = document.getElementsByClassName('overlayers');
    for (i = 0; i < ov.length; i++) {
        if (i === xo) {
            ov[i].style.display = '';
        } else {
            ov[i].style.display = 'none';
        }
    }
}

let hr_tem = document.getElementsByClassName('wc-number');
let tm_tem = document.getElementsByClassName('wc-time');

function remborder(ele) {
    //console.log(ele.innerHTML);
    var txy;
    for (var i = 0; i < tm_tem.length; i++) {
        if (tm_tem[i].innerHTML !== ele.innerHTML) {
            tm_tem[i].classList.remove('border', 'border-3', 'rounded-3', 'bdrbg');
        } else {
            txy = hr_tem[i].innerHTML;
            //console.log(txy);
        }
    }
    return txy;
}

function overlay_upd(tcity) {
    var txy = tcity['temperature'];

    for (var i = 0; i < tm_tem.length; i++) {
        tm_tem[i].addEventListener('mousedown', function (e) {
            //console.log(e.target);
            e.target.classList.add('border', 'border-3', 'rounded-3', 'bdrbg');
            txy = remborder(e.target);
            bg_overlay(txy.replace("<sup>°C</sup>🌡️", ''));
        });
    }
    remborder(tm_tem[0]);
    tm_tem[0].classList.add('border', 'border-3', 'rounded-3', 'bdrbg');
    bg_overlay(txy);
}

function bg_overlay(txy) {
    txy = Number(txy.replace(' °C', ''));
    //console.log(txy);
    switch (true) {
        case txy >= 23 && txy <= 29:
            ovly_loop(0);
            document.getElementById('bg').setAttribute('style', 'filter: opacity(50%) blur(5px) saturate(3) contrast(180%) brightness(120%);');
            break;
        case txy >= 18 && txy <= 22:
            ovly_loop(1);
            document.getElementById('bg').setAttribute('style', 'filter: blur(1px) hue-rotate(90deg) brightness(120%) saturate(3);');
            break;
        case txy > 29:
            ovly_loop(2);
            document.getElementById('bg').setAttribute('style', 'filter: contrast(80%) sepia(3) saturate(3);');
            break;
        case txy < 18 && txy > 10:
            ovly_loop(3);
            document.getElementById('bg').setAttribute('style', 'filter: blur(2px) saturate(3) contrast(180%);');
            //document.getElementById('thunder').style.display = '';
            break;
        case txy <= 10:
            ovly_loop(4);
            document.getElementById('bg').setAttribute('style', 'filter: brightness(150%) saturate(3) blur(1px);');
            break;
    }
}

const d = new Date();
initiator();

/**
 * desc Page Initiator
 */
function initiator() {
    remborder('hi');
    document.getElementById('filterer').value = '';
    $('#selprog').attr('style', 'width:100%').prop('aria-valuenow', '10');
    var wt_values = document.getElementsByClassName('wt-values');
    var mydate = d.getDate();
    var mymonth = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][d.getMonth()];
    var myhr = ("0" + d.getHours()).slice(-2);
    var mymin = ("0" + d.getMinutes()).slice(-2);
    var mysec = ("0" + d.getSeconds()).slice(-2);
    document.getElementsByClassName('w-date')[0].innerHTML = mydate + " - " + mymonth + " - " + d.getFullYear();
    document.getElementById('ampm-icon').src = "img/gifs/ampm.gif";
    document.getElementsByClassName('w-time')[0].childNodes[0].nodeValue = '06: 06: ';
    document.getElementsByClassName('w-secs')[0].childNodes[0].nodeValue = mysec;

    for (var i = 0; i < wt_values.length; i++) {
        wt_values[i].innerHTML = "⌁";
    }
    var cicon = document.getElementById('city-icon');
    cicon.src = "img/gifs/sunglass.gif"
    cicon.setAttribute('style', 'width:160px;height:160px');

    hr_tem = document.getElementsByClassName('wc-number');
    tm_tem = document.getElementsByClassName('wc-time');
    wi_tem = document.getElementsByClassName('wc-icon');
    we_tem = document.getElementsByClassName('wc-ic');
    for (i = 0; i < hr_tem.length; i++) {
        wi_tem[i].style.display = 'none';
        we_tem[i].style.display = '';
        if (i % 2 == 0) {
            hr_tem[i].innerHTML = '🌡️';
            tm_tem[i].innerHTML = '⌚';
            we_tem[i].innerHTML = '🌩️';
        } else {
            tm_tem[i].innerHTML = '⏳';
            we_tem[i].innerHTML = '🪁';
            hr_tem[i].innerHTML = '℃';
        }
        tm_tem[i].style.fontSize = "x-large";
        we_tem[i].style.fontSize = "x-large";
        hr_tem[i].style.fontSize = "x-large";
    }
    document.getElementById('searchal').style.display = 'none';
    bg_overlay('24 °C');
    document.getElementById('bg').removeAttribute('style');
}


/**
 * @desc Update Page Clock
 */

function dosecs() {
    var xx = document.getElementsByClassName('w-secs')[0].childNodes[0];
    var zz = document.getElementsByClassName('w-time')[0].childNodes[0];
    var yy = Number(xx.nodeValue);
    var xy = zz.nodeValue.split(":");
    if (yy === 60) {
        yy = 0;
        xy[1] = Number(xy[1]) + 1;
        zz.nodeValue = ("0" + xy[0]).slice(-2) + ": " + ("0" + xy[1]).slice(-2) + ": ";
    }
    if (Number(xy[1]) === 60) {
        xy[1] = 0;
        xy[0] = Number(xy[0]) + 1;
        zz.nodeValue = ("0" + xy[0]).slice(-2) + ": " + ("0" + xy[1]).slice(-2) + ": ";
    }
    yy++;
    document.getElementsByClassName('w-secs')[0].childNodes[0].nodeValue = ("0" + yy).slice(-2);
}

setInterval(dosecs, 1000);
