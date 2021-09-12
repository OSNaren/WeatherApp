import {my_json as my_json} from '/js/T2002.js';
import {categorise} from "/js/T2002.js";

const r3 = document.getElementById("row3-1");
categorise(my_json);
console.log(my_json);
const cnames = [];
Object.keys(my_json).forEach(function (key) {
    cnames.push(key);
});
//console.log(cnames);

let tcity = document.getElementById('conti-head');
$('#conti-head').mouseenter(function (e) {
    tcity.classList.add('headline', 'headline--fall');
    Splitting();
}).mouseleave(function (e) {
    //console.log('left2');
    tcity.classList.remove('headline', 'headline--fall');
});


let conticrd = document.getElementsByClassName('cntcrd');
let cntt = document.getElementsByClassName('cntt');
let cntcnt = document.getElementsByClassName('cnt-cnt');
row31_update(0);
postcnt(12);

function row31_update(x) {
    for (var i = x; i < conticrd.length; i++) {
        var ccnm = cnames[i];
        var value = my_json[ccnm];
        var conti = (value['timeZone'])
        conti = conti.split('/');
        var cate = value['category'];
        var sic;
        switch (cate) {
            case 1:
                sic = 'img/gifs/csun.gif';
                break;
            case 2:
                sic = 'img/gifs/fsnow.gif';
                break;
            case 3:
                sic = 'img/gifs/crain.gif';
                break;
        }
        console.log(conti, cate, sic);
        cntt[i].childNodes[1].innerHTML = conti[0];
        //console.log(cntt[i].childNodes[3].firstChild);
        var xtem = value['temperature'];
        cntt[i].childNodes[3].innerHTML = '<img class="cnt-icon" alt=""> ' + xtem;
        cntt[i].childNodes[3].firstChild.src = sic;

        cntcnt[i].childNodes[1].innerHTML = value['cityName'] + ', ' + (new Date().toLocaleString("en-US", {
            timeZone: "" + value['timeZone'],
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }));

        cntcnt[i].childNodes[3].innerHTML = '<img class="cnt-icon" src="/img/gifs/humi.gif" alt=""> ' + value['humidity'];
    }
}

function postcnt(i) {
    var itm = conticrd[0];

    //console.log('po', i);
    for (var j = i; j < cnames.length; j++) {
        //console.log(j);
        var cln = itm.cloneNode(true);
        r3.appendChild(cln);
        //cln.style.display = 'none';
    }
    row31_update(i);
}

var cbtn = document.getElementById("contin");
var tbtn = document.getElementById("contit");
var presort = document.getElementById("presort");
var dar = document.getElementById("darr");
var uar = document.getElementById("uarr");
var cfl = true, tfl = false;
cbtn.addEventListener('click', function (e) {
    //console.log(e.target.parentElement);
    $("#row3-1").children().not(presort).css('visibility', 'hidden');
    setTimeout(function () {
        presort.style.display = 'flex';
    }, 500);
    setTimeout(function () {
        presort.style.display = 'none';
    }, 2000);
    setTimeout(function () {
        $("#row3-1").children().not(presort).css('visibility', 'visible');
    }, 2500);

    if (!cfl) {
        cardCsort(cfl);
        dar.setAttribute('style', 'transform: rotate(-180deg);transition: transform 1.3s ease-out;');
        cfl = !cfl;
    } else {
        cardCsort(cfl);
        dar.setAttribute('style', 'transform: rotate(0deg);transition: transform 1.3s ease-out;');
        cfl = !cfl;
    }
    makevisible();
});

function cardCsort(cfl) {
    let toSort = Array.prototype.slice.call(conticrd, 0);
    toSort.sort((a, b) => {
        var tcx = a.childNodes[1].childNodes[1].innerHTML;
        var tcy = b.childNodes[1].childNodes[1].innerHTML;
        //console.log(a, b);
        if (cfl)
            return tcx.localeCompare(tcy);
        else
            return tcy.localeCompare(tcx);
    });
    toSort = cardCtemp(cfl, toSort);
    let parentr = document.getElementById('row3-1');
    parentr.innerHTML = "";
    $('#row3-1').empty();

    for (var i = 0; i < toSort.length; i++) {
        //console.log(toSort[i].childNodes[1].childNodes[1].innerHTML);
        r3.appendChild(toSort[i]);
    }
}

function cardCtemp(cfl, toSort) {
    toSort.sort((a, b) => {
        var tcx = a.childNodes[1].childNodes[1].innerHTML;
        var tcy = b.childNodes[1].childNodes[1].innerHTML;
        var xx = Number((a.childNodes[1].childNodes[3].innerText).replace(' °C', ''));
        var yy = Number((b.childNodes[1].childNodes[3].innerText).replace(' °C', ''));
        if (cfl && tcx === tcy) {
            //console.log('!!', xx, yy);
            return xx - yy;
        } else if (!cfl && tcx === tcy)
            return yy - xx;
    });
    return toSort;
}

function cardTsort(tfl) {
    let toSort = Array.prototype.slice.call(conticrd, 0);
    toSort.sort((a, b) => {
        var tcx = a.childNodes[1].childNodes[1].innerHTML;
        var tcy = b.childNodes[1].childNodes[1].innerHTML;

        //if (tfl)
        return tcx.localeCompare(tcy);

    });

    toSort = cardCtemp(tfl, toSort);
    let parentr = document.getElementById('row3-1');
    parentr.innerHTML = "";
    $('#row3-1').empty();

    for (var i = 0; i < toSort.length; i++) {
        //console.log(toSort[i].childNodes[1].childNodes[1].innerHTML);
        r3.appendChild(toSort[i]);
    }
}

tbtn.addEventListener('click', function (e) {

    $("#row3-1").children().not(presort).css('visibility', 'hidden');
    setTimeout(function () {
        presort.style.display = 'flex';
    }, 500);
    setTimeout(function () {
        presort.style.display = 'none';
    }, 2000);
    setTimeout(function () {
        $("#row3-1").children().not(presort).css('visibility', 'visible');
    }, 2500);

    if (tfl) {
        cardTsort(tfl);
        uar.setAttribute('style', 'transform: rotate(-180deg);transition: transform 1.3s ease-out;');
        tfl = !tfl;
    } else {
        cardTsort(tfl);
        uar.setAttribute('style', 'transform: rotate(0deg);transition: transform 1.3s ease-out;');
        tfl = !tfl;
    }
    makevisible();
});

function makevisible() {
    for (var i = 0; i < cnames.length; i++) {
        if (i < 12) {
            conticrd[i].style.display = '';
        } else {
            conticrd[i].style.display = 'none';
        }
    }
}