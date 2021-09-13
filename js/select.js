let inputField;
let dropdown;
let dropdownArray;
let parul;
let liitems;
var nodes;
var selected;
let valueArray = [];

setTimeout(function () {
    inputField = document.querySelector('.chosen-value');
    dropdown = document.querySelector('.value-list');
    dropdownArray = [...document.querySelectorAll("a")];

    dropdown.classList.remove('open');
    inputField.placeholder = 'Select City';
    inputField.value = '';

    parul = document.getElementById('city-selecter');
    liitems = parul.getElementsByClassName("dloptions");
    for (var i = 1; i <= liitems.length; i++) {
        var idd = String('#cop' + i);
        var key = (liitems[i - 1].getAttribute('value')).toLowerCase();
        var srcc = String("img/city_icons/" + key + ".svg");
        var iht = document.getElementById(idd);
        iht.innerHTML = '<img class="c-icon" alt="Cicon">' + iht.innerHTML;
        iht.firstChild.src = srcc;
    }

    dropdownArray.forEach(item => {
        valueArray.push(item.textContent);
    });
    console.log(valueArray);
    nodes = document.querySelectorAll('a');
    selected = 0;
    selectAllfn();
}, 7000);

function selectAllfn() {
    const closeDropdown = () => {
        dropdown.classList.remove('open');
    }


    inputField.addEventListener('input', () => {
        dropdown.classList.add('open');
        filterFunction();
        let inputValue = inputField.value.toLowerCase();
    });


    dropdownArray.forEach(item => {
        item.addEventListener('click', (evt) => {
            inputField.value = item.textContent;
            inputField.placeholder = item.textContent;
            dropdownArray.forEach(dropdown => {
                dropdown.classList.add('closed');
            });
        });
    })

    inputField.addEventListener('hover', () => {
        dropdown.classList.add('open');
        dropdownArray.forEach(dropdown => {
            dropdown.classList.remove('closed');
        });
    });

    inputField.addEventListener('focus', () => {
        if (inputField.value === '') {
        }
        inputField.placeholder = 'Search...';
        dropdown.classList.add('open');
        dropdownArray.forEach(dropdown => {
            dropdown.classList.remove('closed');
        });
    });

    inputField.addEventListener('blur', () => {
        inputField.placeholder = 'Select City';
        dropdown.classList.remove('open');
    });

    document.addEventListener('click', (evt) => {
        const isDropdown = dropdown.contains(evt.target);
        const isInput = inputField.contains(evt.target);
        if (!isDropdown && !isInput) {
            dropdown.classList.remove('open');
            if (liSelected !== undefined) {
                var parnm = liSelected.parentElement.nodeName;
                remhovercss(liSelected);
            }
        }

    });

    dropdownArray.forEach(item => {
        item.addEventListener('mousedown', (evt) => {
            inputField.value = item.textContent;
            inputField.placeholder = item.textContent;
            selected = index = indexli(item);
            //index--;
            selected++;
            liSelected = item;
            //console.log('S : ', selected, 'Nodes len : ', nodes.length);
            $("#filterer").trigger("change");
            $("#alcloser").trigger("click");
            dropdownArray.forEach(dropdown => {
                dropdown.classList.add('closed');
            });
        });
    });
}

city_select.ondblclick = function (evt) {
    this.value = '';
    this.blur();
    filterFunction();
    initiator();
    selected = index = 0;
    //document.getElementById('city-icon').src = 'img/gifs/sunglass.gif';
}

$('form').submit(function (e) {
    e.preventDefault();
    let inval = city_select.value;
    console.log(inval);
    return false;
});

function indexli(item) {
    var xid = item.getAttribute('id');
    //console.log(xid);
    var child = document.getElementById(xid);
    var parent = child.parentNode;
// The equivalent of parent.children.indexOf(child)
    var index = Array.prototype.indexOf.call(parent.children, child);

    for (var i = 0; i < liitems.length; i++) {
        if (item.textContent === liitems[i].textContent) {
            return i;
        }
    }
    return -1;
}

let div = document.getElementById("city-selecter");
let a = div.getElementsByTagName("a");
let flvi = 0;

function filterFunction() {
    var input, filter, ul, li, i;
    input = document.getElementById("filterer");
    filter = input.value.toUpperCase();
    let txtValue;
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            if (flvi === 1) {
                selected = i;
            }
        } else {
            a[i].style.display = "none";
        }
    }
}


function remhovercss(ele) {
    if (ele !== undefined) {
        ele.removeAttribute('style');
    }
}

document.getElementById('alcloser').addEventListener('click', function (e) {
    salert.style.display = 'none';
});

let salert = document.getElementById('searchal');

function checkli(it) {
    for (var i = 0; i < liitems.length; i++) {
        if (it === liitems[i].textContent) {
            //console.log(liitems[i].textContent);
            return true;
        }
    }
    return false;
}

function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}

var ull = document.querySelector('ul');
var ul = document.getElementById('city-selecter');
var liSelected;
var index = -1;
/*
function jumpvisible(next) {
    if (next.style.display === 'none') {
        var ind = indexli(next);
        for (var i = ind; i < liitems.length; i++) {
            if (liitems[i].style.display !== 'none') {
                index = i;
                selected = i;
                liSelected = liitems[i];
            }
        }
    }

}
*/

document.addEventListener('keydown', function (event) {
    var len = ul.getElementsByTagName('a').length - 1;
    //console.log('Length : ', len);
    let next;
    if (event.which === 40) {
        //down
        index++;
        if (liSelected) {
            removeClass(liSelected, 'selected');
            remhovercss(liSelected);
            next = ul.getElementsByTagName('a')[index];
            //jumpvisible(next);
            //console.log(next);
            if (index <= len) {
                liSelected = next;
            } else {
                index = 0;
                liSelected = ul.getElementsByTagName('li')[0];
            }
            addhovercss(liSelected);
            addClass(liSelected, 'selected');
            //console.log('Index', index);
        } else {
            index = 0;

            liSelected = ul.getElementsByTagName('a')[0];
            addhovercss(liSelected);
            addClass(liSelected, 'selected');
        }

    } else if (event.which === 38) {
        index--;
        //up
        if (liSelected) {
            removeClass(liSelected, 'selected');
            remhovercss(liSelected);

            //console.log('Index', index);
            next = ul.getElementsByTagName('a')[index];
            if (index >= 0) {
                liSelected = next;
            } else {
                index = len;
                liSelected = ul.getElementsByTagName('a')[len];
            }
            addClass(liSelected, 'selected');
            addhovercss(liSelected);
        } else {
            index = len;
            liSelected = ul.getElementsByTagName('a')[len];
            addClass(liSelected, 'selected');
            addhovercss(liSelected);
        }

    }
}, false);


document.addEventListener('keydown', function (e) {
    if (e.keyCode === 38) { // up
        if (selected + 1 <= 0) {
            selected = nodes.length;
        }
        select(nodes[selected - 1]);
    }
    if (e.keyCode === 40) { // down
        if (selected + 1 >= nodes.length) {
            selected = -1;
        }
        select(nodes[selected + 1]);
    }
    if (e.keyCode === 13) { // enter
        inselect(nodes[selected - 1]);
    }

});


function inselect(el) {
    //console.log(el);
    var ic = inputField.placeholder;
    //console.log('IC:', ic, checkli(ic));
    if (ic === '' || !checkli(ic)) {
        $("#filterer").trigger("dblclick");
        //initiator();
        salert.style.display = 'block';
        setTimeout(function () {
            salert.style.display = 'none';
        }, 5000);
        return;
    }
    inputField.value = el.textContent;
    inputField.placeholder = el.textContent;
    dropdown.classList.add('closed');
    $("#filterer").trigger("change");
    //console.log(inputField.value);
}

function select(el) {
    var s;
    s = indexli(el);
    if (s > 0) {
        inputField.value = liitems[s - 1].textContent;
        inputField.placeholder = liitems[s - 1].textContent;
    }
    //console.log('el : ', el, 'S : ', s, 'Nodes len : ', nodes.length);

    if (s === -1 || index === 21 || el.getAttribute('id') === 'cop22') {
        s = 22;
    }
    if (s > 22) {
        s = 0;
    }
    selected = s;

    var elHeight = $(el).height();
    var scrollTop = $(ull).scrollTop();
    var viewport = scrollTop + $(ull).height();
    var elOffset = elHeight * selected * 2 - 64;

    //console.log('scrolltop', scrollTop, 'select', selected, ' viewport', viewport, ' elOffset', elOffset);
    if (elOffset < scrollTop || (elOffset + elHeight) > viewport)
        $(ull).scrollTop(elOffset);

    if (document.querySelector('a.selected') != null)
        document.querySelector('a.selected').classList.remove('selected');
    el.classList.add('selected');
}

function addhovercss(ele) {
    if (ele !== undefined) {
        ele.setAttribute('style', 'transition: all 0.5s ease-in;');
        ele.setAttribute('style', 'background-color: #d2d0d0;font-style: italic;justify-content: space-between;');
    }
}

ull.onscroll = function () {
    //var elHeight = $(el).height();
    var scrollTop = $(ull).scrollTop();
    var viewport = scrollTop + $(ull).height();
    var elOffset = 64 * selected * 2;
    var winScroll = $(ull).scrollTop();
    var height = $(ull).height();//document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = ((scrollTop / height) * 100) / 3.4;
    //console.log(winScroll + $(ull).height(), scrolled);
    //console.log(height, 'scrolltop', scrollTop, 'select', selected, ' viewport', viewport, ' elOffset', elOffset, 'scrolled', scrolled);
    document.getElementById("selprog").style.width = scrolled + "%";
}
