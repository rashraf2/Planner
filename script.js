
let tasks = 0;
let points;
let theme;
let theme2;
let theme3;
let selection;
let targetElement;
let identifier;
let changedValue;
let counter = 1;
let setup_screen = 0;
let username;
let checkboxes;
let pages = 0;
let grids = document.querySelectorAll('.grid');
let checkedSubjects = [0, 0, 0, 0, 0, 0];
let parsedSubjects;
let currentDay = new Date();
currentDay = currentDay.getDate();
const strArray = ['Hey there', 'Hello', 'Nice day to do homework', 'Good day', 'You\'re back', 'Time to study', 'Make sure you have your planner'];
window.onload = async function () {
    await setupCheck();
    await checkboxFunct();
    await userFunct();
    await themeFunct();
    await wait(1000);
    finishedLoading();
}
function togglePopup(param1, param2, disabled) {
    document.getElementById(param1).classList.toggle(param2);
}
async function wait(ms) {
    await new Promise(waited => setTimeout(waited, ms));
    return;
    // www.geeksforgeeks.org/javascript/how-to-wait-n-seconds-in-javascript/
}
async function updateCounters(okay) {
    if (okay === 'no') {
        document.querySelectorAll(".status")[tasks].classList.add('complete');
    } else {
        document.querySelectorAll(".status")[tasks].classList.add('complete');
    }
    tasks += 1;
}
function finishedLoading() {

    document.getElementById("loading-screen").classList.add("hidden");
    document.body.classList.remove('loading');
    scrollGrids();
}
async function setup(action) {
    let setup_interfaces = document.querySelectorAll('.setup-sect');
    if (action === 'next') {
        if (setup_screen <= setup_interfaces.length - 2) {
            setup_interfaces[setup_screen].classList.remove('active');
            setup_screen += 1;
            document.getElementById("prev-button").style.display = 'block';
            await wait(300);
            setup_interfaces[setup_screen].classList.add('active');
        }
        if (setup_screen >= setup_interfaces.length - 1) {
            document.getElementById("next-button").style.display = 'none';
        }
    }

    if (action === 'back') {
        if (setup_screen >= 1 && setup_screen <= setup_interfaces.length) {
            setup_interfaces[setup_screen].classList.remove('active');
            setup_screen -= 1;
            await wait(300);
            setup_interfaces[setup_screen].classList.add('active');
            document.getElementById("prev-button").style.display = 'block';
            document.getElementById("next-button").style.display = 'block';
        }
        if (setup_screen < 1) {
            document.getElementById("prev-button").style.display = 'none';
        }
    }
    if (action === 'done') {
        localStorage.setItem('username', document.getElementById("username-input").value || 'Guest');
        if (pass(localStorage.getItem('points')) !== true) {
            localStorage.setItem('points', 0);
        } else {
        }
        if (pass(localStorage.getItem('checkboxes')) !== true) {
            localStorage.setItem('checkboxes', 0);
        }
        if (pass(localStorage.getItem('pages')) !== true) {
            localStorage.setItem('pages', 0);
        }
        localStorage.setItem('setup', '1');
        document.getElementById('setup').classList.remove('active');
        userFunct();
    }
}
async function setupCheck() {
    if (localStorage.getItem('setup') !== '1') {
        document.getElementById('setup').classList.add("active");
    }
    await initializeData();
}
async function initializeData() {
    if (pass(localStorage.getItem('pages')) === true) {

        pages = Number(localStorage.getItem('pages')) + 1;
    } else {
        pages = 1;
    }
    localStorage.setItem('pages', pages);
    if (pass(localStorage.getItem('checkboxes')) === true) {

        checkboxes = Number(localStorage.getItem('checkboxes'));
    } else {
        checkboxes = 0;
    }
    if (pass(localStorage.getItem('username')) === true) {
        username = (localStorage.getItem('username'));
    } else {
        username = 'Guest';
    }
    if (pass(localStorage.getItem('points')) === true) {
        points = Number(localStorage.getItem("points"));
    } else {
        points = 0;
    }
    if (pass(localStorage.getItem('checkedSubjects')) === true) {
        if (pass(localStorage.getItem('date')) !== true || currentDay !== Number(localStorage.getItem('date'))) {
            localStorage.setItem('checkedSubjects', '');
            localStorage.setItem('date',currentDay);
            return;
        }
        parsedSubjects = JSON.parse(localStorage.getItem("checkedSubjects"));
        for (i = 0; i < parsedSubjects.length; i++) {
            if (parsedSubjects[i] === 1) {
                document.querySelectorAll('.subject-marker')[i].click();
            }
            if (parsedSubjects[i] === 2) {
                document.querySelectorAll('.subject-marker')[i].style.pointerEvents = 'none';
                document.querySelectorAll('.subject-marker')[i].style.opacity = '0.5';
            }
        }
    }
}
async function checkboxFunct() {
    for (let m = 0; m < document.querySelectorAll(".subject-marker").length; m++) {
        document.querySelectorAll('.subject-marker')[m].addEventListener('change', () => {
            checkboxes += 1;
            document.getElementById('checkboxes').innerHTML = checkboxes;
            localStorage.setItem("checkboxes", checkboxes);
            localStorage.setItem('pages', pages);
            if (document.querySelectorAll('.subject-marker')[m].checked) {
                points += 1;
                updateSubjects('add', m);
            } else {
                points -= 1;
                updateSubjects('rem', m);
            }
            localStorage.setItem('points', points);
            document.getElementById("points").innerHTML = points;
        })
    }
    updateCounters();
}
function updateSubjects(param1, param2) {
    if (param1 === 'add') {
        checkedSubjects[param2] = 1;
    } else {
        checkedSubjects[param2] = 0;
    }
    parsedSubjects = JSON.stringify(checkedSubjects);
    localStorage.setItem('checkedSubjects', parsedSubjects);
}
function pass(item) {
    if (item !== null && item !== 'undefined' && item !== false) {
        return true;
    }
}
async function themeFunct() {
    // Adding functionality and styles to theme buttons
    for (let t = 0; t < document.querySelectorAll(".theme-btn").length; t++) {
        document.querySelectorAll('.theme-btn')[t].addEventListener('click', function () {
            useTheme(t);
        })
        document.querySelectorAll('.theme-btn')[t].style.backgroundColor = document.querySelectorAll('.theme-btn')[t].getAttribute('bg');
        if (document.querySelectorAll('.theme-btn')[t].getAttribute('color') === 'dark') {
            document.querySelectorAll('.theme-btn')[t].style.color = 'black'
        } else {
            document.querySelectorAll('.theme-btn')[t].style.color = 'white';
        }
    }
    if (pass(localStorage.getItem('theme')) == true) {
        document.querySelectorAll('.theme-btn')[Number(localStorage.getItem('theme'))].click();
        console.log(document.querySelectorAll('.theme-btn')[Number(localStorage.getItem('theme'))])
    }
    updateCounters();
}
async function userFunct() {
    document.getElementById("checkboxes").innerHTML = checkboxes;
    document.getElementById('pages').innerHTML = pages;
    document.getElementById('points').innerHTML = points;
    document.getElementById('username').innerHTML = username;
    updateCounters();
    let greeting = Math.floor(Math.random() * strArray.length + 0);
    document.getElementById('load-desc').innerHTML = strArray[greeting] + ', ' + (localStorage.getItem('username') || 'Guest') + '!';
}
function useTheme(selection) {
    theme = document.querySelectorAll('.theme-btn')[selection].getAttribute('bg');
    theme = theme.replace('(', '');
    theme = theme.replace(')', '');
    theme = theme.replace('hsl', '');
    theme = theme.split(',');
    theme2 = theme[2].replace('%', '');
    theme3 = theme2 - 7;
    if (theme3 < 0) {
        theme3 = 0;
    }
    document.documentElement.style.setProperty('--b2', 'hsl(' + theme[0] + ',' + theme[1] + ',' + theme2 + '%' + ')');
    document.documentElement.style.setProperty('--b1', 'hsl(' + theme[0] + ',' + theme[1] + ',' + theme3 + '%' + ')');
    document.documentElement.style.setProperty('--b3', 'hsla(' + theme[0] + ',' + theme[1] + ',' + theme3 + '%' + ',' + '0.85' + ')');
    if (document.querySelectorAll('.theme-btn')[selection].getAttribute('color') === 'dark') {
        document.documentElement.style.setProperty('--c1', 'black');
        document.documentElement.style.setProperty('--c2', 'white');
        document.getElementById('logo').setAttribute('src', 'logo_black2.png');
        document.getElementById('load-img').setAttribute('src', 'logo_black2.png');
    } else {
        document.documentElement.style.setProperty('--c1', 'white');
        document.documentElement.style.setProperty('--c2', 'black');
        document.getElementById('logo').setAttribute('src', 'logo_white2.png');
        document.getElementById('load-img').setAttribute('src', 'logo_white2.png');
    }
    localStorage.setItem('theme', selection);

}
function toggleValues(identifier, targetElement, changedValue) {
    changedValue = changedValue.split(':');
    if (identifier === 'body') {
        if (!event.target.checked) {
            document.body.style.removeProperty(changedValue[0]);
        } else {
            document.body.style[changedValue[0]] = changedValue[1];
        }
    } else if (identifier === 'class') {
        if (!event.target.checked) {
            for (i = 0; i < document.querySelectorAll('.' + targetElement).length; i++) {
                document.querySelectorAll('.' + targetElement)[i].style.removeProperty(changedValue[0]);
            }
        } else {

            for (i = 0; i < document.querySelectorAll('.' + targetElement).length; i++) {


                document.querySelectorAll('.' + targetElement)[i].style[changedValue[0]] = changedValue[1];

            }
        }
    } else if (identifier === 'id') {
        if (!event.target.checked) {
            document.getElementById(targetElement).style.removeProperty(changedValue[0]);
        }
        else {
            console.log(changedValue);
            document.getElementById(targetElement).style[changedValue[0]] = changedValue[1];
        }
    }
}
async function scrollGrids() {
    grids[counter].classList.add('inactive');
    await wait(300);
    if (counter === (grids.length - 1)) {
        counter = 0;
        grids[0].classList.remove('inactive');
    } else {
        counter += 1; grids[counter].classList.remove('inactive');
    }
    setTimeout(scrollGrids, 20000);
}
function removeStorage(name) {
    localStorage.removeItem(name);
}