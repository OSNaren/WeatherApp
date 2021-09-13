let top3_icons = document.getElementsByClassName('wtop-icons');
let loadercnt = document.getElementById('ldcont');
var my_json;
let cat1 = {}, cat2 = {}, cat3 = {};
let catv = [0, 0, 0];

const remurl = 'https://soliton.glitch.me/all-timezone-cities';
let options = {method: 'GET'};


function funcall() {
    my_json = categorise(my_json);
    cat1 = sortObject(cat1, 'temperature');
    cat2 = sortObject(cat2, 'precipitation');
    cat3 = sortObject(cat3, 'humidity');
    console.log(my_json);
}

fetch(remurl, options)
    .then(async (res) => {
        res = (await res.text());
        var resp = JSON.parse(res)
        my_json = keychng(resp);
        funcall();
    })
    .catch((err) => console.error(err));


const sortObject = function (obj, ct) {
    const arr = Object.keys(obj).map(el => {
        return obj[el];
    });
    arr.sort((a, b) => {
        //console.log(ct);
        if (ct === 'temperature') {
            a = a[ct].replace('°C', '');
            b = b[ct].replace('°C', '');
        } else {
            a = a[ct].replace('%', '');
            b = b[ct].replace('%', '');
        }
        //console.log(a, b);
        return b - a;
    });
    return arr;
};

function categorise(jsdt) {
    Object.keys(jsdt).forEach(function (key) {
        const value = jsdt[key];
        //console.log(value);

        var tem = Number(value['temperature'].replace('°C', ''));
        var hum = Number(value['humidity'].replace('%', ''));
        var pre = Number(value['precipitation'].replace('%', ''));

        if (tem >= 29 && hum < 50 && pre >= 50) {
            value['category'] = 1;
            cat1[key] = value;
            catv[0]++;
        }
        if (tem >= 20 && tem <= 28 && hum >= 50 && pre < 50) {
            value['category'] = 2;
            cat2[key] = value;
            catv[1]++;
        }
        if (tem < 20 && hum >= 50) {
            value['category'] = 3;
            cat3[key] = value;
            catv[2]++;
        }
        //console.log(value, value['category']);
    });
    //console.log(catv);
    return jsdt;
}

function remuline(ele) {
    //console.log(ele.innerHTML);
    var txy;
    for (var i = 0; i < top3_icons.length; i++) {
        if (top3_icons[i].innerHTML !== ele.innerHTML) {
            top3_icons[i].classList.remove('uline');
        } else {
            txy = ele.getAttribute('value');
        }
    }
    return txy;
}

for (var i = 0; i < top3_icons.length; i++) {
    top3_icons[i].addEventListener('click', function (e) {
        chgvisible(false);
        var tar = e.target;
        if (e.target.getAttribute('class') === 'wti') {
            tar = e.target.parentNode;
        }
        tar.classList.add('uline');
        //console.log(tar);
        var txy = remuline(tar);
        console.log('txy', txy);
        dis_cards(Number(txy));
        setTimeout(chgvisible, 1000, true);
        setTimeout(function () {
            checkflow(cont_sli);
            $('#wtop-num').trigger('change');
            cont_sli.classList.remove('gradient-border-as');
            cont_sli.setAttribute('style', 'overflow-y:hidden');
        }, 3500);
        dosecs2();
    });
}

function chgvisible(bl) {
    if (bl) {
        $('#ldcont').show().delay(2000).fadeOut(400);
        cont_sli.style.overflowX = 'scroll';
        cont_sli.setAttribute('style', 'overflow-y:hidden');
        for (var i = 0; i < ctcls.length; i++) {
            ctcls[i].style.display = '';
        }
        setTimeout(checkflow, 3500, cont_sli);
    } else {
        $('#ldcont').show().delay(2000).fadeIn(400);
        cont_sli.classList.add('gradient-border-as');
        //cont_sli.setProperty('disabled', true);
        cont_sli.style.overflow = 'hidden';
        for (i = 0; i < ctcls.length; i++) {
            ctcls[i].style.display = 'none';
        }
    }
}

let cont_sli = document.getElementById('r-slider');
let ctcls = document.getElementsByClassName('ctcrd');

function dis_cards(cate) {
    //console.log('discards', 1);
    var ctlen = ctcls.length;
    var extra;
    let scat, sic;
    switch (cate) {
        case 1:
            extra = (catv[cate - 1]) / 2 - ctlen;
            scat = cat1;
            sic = 'img/gifs/csun.gif';
            break;
        case 2:
            extra = (catv[cate - 1]) / 2 - ctlen;
            scat = cat2;
            sic = 'img/gifs/csnow.gif'
            break;
        case 3:
            extra = (catv[cate - 1]) / 2 - ctlen;
            scat = cat3;
            sic = 'img/gifs/crain.gif'
            break;
    }
    //console.log(extra);

    //console.log('CT', ctcls.length);
    if (extra > 0) {
        for (var i = 0; i < extra; i++) {
            var idd = 'ctcrd' + (ctlen + i);
            $("#ctcrd1").clone().attr('id', idd).prop('style', 'display:none;width: 270.17px;height: 261.36px;margin: 20px 23px;').appendTo(cont_sli);
            //console.log(i);
        }
    }
    if (extra < 0) {
        for (i = extra; i <= 0; i++) {
            cont_sli.removeChild(cont_sli.lastChild);
            //console.log(i);
        }
    }
    console.log('CT', ctcls.length, scat);
    card_edit(ctcls.length, scat, sic);
}

function card_edit(ctlen, scat, sic) {
    console.log(scat[0]['cityName']);
    var ctt = document.getElementsByClassName('ctt');
    var cic = cont_sli.getElementsByClassName('temcic');
    var cnt = cont_sli.getElementsByClassName('ct-cnt');
    var ctim = cont_sli.getElementsByClassName('top-ctimg');
    console.log(scat[0]['category']);
    for (var i = 0; i < ctlen; i++) {
        ctt[i].childNodes[1].innerHTML = scat[i]['cityName'];
        var xtem = scat[i]['temperature'];
        ctt[i].childNodes[3].innerHTML = '<img class="card-icon temcic" src="" alt=""> ' + xtem;
        ctt[i].childNodes[3].firstChild.src = sic;
        //console.log(ctt[i].childNodes[3].innerHTML);
        cnt[i].childNodes[1].innerHTML = (new Date().toLocaleString("en-US", {
            timeZone: "" + scat[i]['timeZone'],
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }));

        var dat = (new Date().toLocaleString("en-US", {
            timeZone: "" + scat[i]['timeZone'],
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            format: true

        }));
        dat = (dat.replace(',', '').split(' '));
        cnt[i].childNodes[3].innerHTML = dat[1] + '-' + dat[0] + '-' + dat[2];
        cnt[i].childNodes[5].innerHTML = '<img class="card-icon humcic" alt=""> ' + scat[i]['humidity'];
        cnt[i].childNodes[7].innerHTML = '<img class="card-icon precic" alt=""> ' + scat[i]['precipitation'];

        var wnum = document.getElementById('wtop-num');
        if (scat[0]['category'] === 2) {
            //console.log('height');
            cic[i].setAttribute('style', 'height: 1em');
            wnum.value = 3;
            wnum.disabled = true;
        } else if (scat[0]['category'] === 1) {
            wnum.value = 4;
            wnum.disabled = false;
            wnum.max = catv[0] / 2;
        } else if (scat[0]['category'] === 3) {
            wnum.value = 4;
            wnum.disabled = false;
            wnum.max = 10;
            $('#wtop-num').trigger('change');
        }
        var tx = (scat[i]['cityName']).toLowerCase();
        var ctsrc = 'img/city_icons/' + tx + '.svg';
        //console.log(ctsrc);
        ctim[i].src = ctsrc;
    }
    $('#wtop-num').trigger('change');

}

var rar = document.getElementById('rarr');
var lar = document.getElementById('larr');


function checkflow(el) {
    el = document.getElementById('r-slider');
    var curOverf = el.style.overflowX;

    if (!curOverf || curOverf === "visible")
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth;

    el.style.overflow = curOverf;

    if (!isOverflowing) {
        rar.style.visibility = "hidden";
        lar.style.visibility = "hidden";
    } else {
        rar.style.visibility = "visible";
        lar.style.visibility = "visible";
    }
}

rar.addEventListener('click', function (e) {
    cont_sli.scrollBy(250, 0);
});
lar.addEventListener('click', function (e) {
    cont_sli.scrollBy(-250, 0);
});

$('#wtop-num').change(function (e) {
    var ctcls = document.getElementsByClassName('ctcrd');
    var vi = (e.target.value);
    console.log('cnt', vi);
    for (var i = 0; i < vi; i++) {
        ctcls[i].style.display = '';
    }
    for (i = vi; i < ctcls.length; i++) {
        ctcls[i].style.display = 'none';
    }
    checkflow(cont_sli);
});

row2_initiator();

function row2_initiator() {
    checkflow(cont_sli);
    var ctcls = document.getElementsByClassName('ctcrd');
    for (var i = 0; i < ctcls.length; i++) {
        ctcls[i].style.display = 'none';
    }
    var swr = document.getElementById("ldcont");
    swr.style.display = '';
    cont_sli.style.overflowX = 'hidden';
    cont_sli.style.overflowY = 'hidden';
    //document.getElementById('r-slider').pointerEvents = 'none';
}

var disbtn = document.getElementById('r2ini');
disbtn.addEventListener('dblclick', function () {
    row2_initiator();
    rar.style.visibility = 'hidden';
    lar.style.visibility = 'hidden';

    for (var i = 0; i < top3_icons.length; i++) {
        top3_icons[i].classList.remove('uline');
    }
    $('#wtop-num').prop({'disabled': false, 'value': 4});
    cont_sli.classList.add('gradient-border-as');
});


var tcty = document.getElementById('top-city');
$('#top-city').mouseenter(function (e) {
    tcty.classList.add('headline', 'headline--twirl');
    Splitting();
}).mouseleave(function (e) {
    //console.log('left');
    tcty.classList.remove('headline', 'headline--twirl');
});

$('#r2ini').mouseenter(function (e) {
    tcty.classList.add('headline', 'headline--fall');
    Splitting();
}).mouseleave(function (e) {
    //console.log('left2');
    tcty.classList.remove('headline', 'headline--fall');
});

function dosecs2() {
    console.log(my_json);
    setInterval(function () {
        var ctt = document.getElementsByClassName('ctt');
        var cic = cont_sli.getElementsByClassName('temcic');
        var cnt = cont_sli.getElementsByClassName('ct-cnt');

        for (var i = 0; i < ctcls.length / 2; i++) {
            var cname = (ctt[i].childNodes[1].innerHTML).toLowerCase();
            //console.log(cname);
            var tzone = my_json[cname]['timeZone'];
            cnt[i].childNodes[1].innerHTML = (new Date().toLocaleString("en-US", {
                timeZone: "" + tzone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));
        }

    }, 30000);
}