let subjects = [];
let main = document.body;
let change;
let mode = 'dark';
let confetti;
let randomnumber;
let max;
let ad;
let changeele;
let stat2;
let stat2alt;
let day = new Date();
let pri;
let output;
let hsl3;
let output2;
let a;
let date;
let hours;
let minutes;
let seconds;
let finalDate;
let ampm;
let version = '07/26';
let points;
let ok = false;
let username;
let avail;
let array;
const strArray = ['Hey there', 'Hello', 'Nice day to do homework', 'Good day', 'Back again', 'Ready to study', 'What\'s up', 'Got a lot of homework', 'Do you have your planner', 'What subjects do you have today', 'Enjoying your school year', 'This text is here for no reason', 'What subject are you doing first'];
const proctors = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
const alertTypes = ['success', 'info', 'warning', 'error'];
const punctArray = ['!', '!', '!', '!', '?', '?', '?', '?', '?', '?', '?', '.', '?'];
const girds = document.querySelectorAll(".hw-grid");
const confetticont = document.getElementById('confetti-cont');
/*fundamental functions*/
function closePopup() {
    localStorage.setItem("subjects", subjects);
}
function toggle(name) {
    document.body.classList.toggle(name);
}
function changeBodyStat(stat) {
    change = (event.target.value);
    if (stat === 'fontSize') {
        change = Number(event.target.value);
        change = change + "em";
    }
    document.body.style[stat] = change;
    if (event.target.checked && event.target.type === "checkbox") {
        document.body.style[stat] = change;
    } else if (event.target.type === 'checkbox') {
        document.body.style[stat] = '';
    }
    /*https://stackoverflow.com/questions/4968406/javascript-property-access-dot-notation-vs-brackets*/
}
function changeElementStat(element, stat2, stat2alt) {
    if (stat2alt === undefined || stat2alt === "") {
        changeele = document.getElementById(element);
        if (changeele.style[stat2] === "" | changeele.style[stat2] === undefined) {
            changeele.style[stat2] = event.target.value;
        } else {
            changeele.style[stat2] = '';
        }
    } else {
        changeele = document.getElementById(element);
        if (changeele.style[stat2] === "" | changeele.style[stat2] === undefined) {
            changeele.style[stat2] = event.target.value;
            changeele.style[stat2alt] = event.target.value;
        } else {
            changeele.style[stat2] = '';
            changeele.style[stat2alt] = '';
        }
        /*https://stackoverflow.com/questions/4968406/javascript-property-access-dot-notation-vs-brackets*/
    }
}
/* deprecated 'switch' function used this -> https://stackoverflow.com/questions/37801882/how-to-change-css-root-color-variables-in-javascript*/
/*menu options' functions*/
function checkConfetti() {
    ad = 0;
    if (ok === true && event.target.checked) {
        points = parseInt(points) + 1;
        localStorage.setItem('points', parseInt(points));
    }
    else {
        if (!event.target.checked) {
            points = parseInt(points) - 1;
            localStorage.setItem('points', parseInt(points));
        }
    }
    if (document.getElementById("confetti-box").checked && event.target.checked) {
        for (i = 0; i <= 40; i++) {
            confetti = document.createElement('div');
            confetti.style.backgroundColor = 'rgb(' + randInt(255) + ',' + randInt(255) + ',' + randInt(255) + ")";
            confetti.className = "confetti-square";
            confetti.style.left = randInt(100) + "%";;
            confetti.style.animationDelay = ad + "s";
            confetticont.appendChild(confetti);
            ad += 0.025;
            /*attempted solutions:
            1. https://stackoverflow.com/questions/16707751/how-to-delete-a-created-element-in-javascript
            */
        }
        setTimeout(() => confetticont.innerHTML = '', 10000);
    }
    document.getElementById("points").innerHTML = points;
    for (i = 0; i < document.querySelectorAll(".checkmark").length; i++) {
        if (document.querySelectorAll('.checkmark')[i].checked) {
            if (document.querySelectorAll('.checkmark')[i].style.display === 'none') {
                avail[i] = 'N/A';
            } else {
                avail[i] = 1;
            }
        } else {
            avail[i] = 0;
        }
    }
    localStorage.setItem("avail", JSON.stringify(avail));
}
function randInt(max) {
    randomnumber = Math.floor(Math.random() * max + 1);
    return randomnumber;
}
function submit() {
    for (i = 0; i < document.querySelectorAll('.subject-desc').length; i++) {
        document.querySelectorAll('.subject-desc')[i].innerHTML = document.querySelectorAll('.hw-input2')[i].value;
    }
    document.getElementById("announcement").innerHTML = document.getElementById("announcement-input").value;
    document.getElementById("hw-popup").classList.add("close");
}
function useTheme(elem) {
    pri = elem.getAttribute('pri');
    hsl3 = elem.getAttribute('hsl3');
    output = 'hsl(' + pri + hsl3 + '%)';
    output2 = 'hsl(' + pri + (hsl3 - 5) + '%)';
    document.documentElement.style.setProperty("--dp", output);
    document.documentElement.style.setProperty("--ds", output2);
    if (elem.getAttribute('color') === 'yes') {
        document.documentElement.style.setProperty("--color", 'white');
        document.documentElement.style.setProperty("--color-2", "black");
    } else {
        document.documentElement.style.setProperty("--color", 'black');
        document.documentElement.style.setProperty("--color-2", 'white');
    }
    for (i = 0; i < document.querySelectorAll(".selected-btn").length; i++) {
        document.querySelectorAll(".selected-btn")[i].setAttribute("onclick", "useTheme(this)");
        document.querySelectorAll(".selected-btn")[i].classList.remove("selected-btn");
    }
    event.target.classList.add("selected-btn");
    array = [...document.querySelectorAll(".theme-btn")];
    array = array.findIndex(theme => theme === event.target);
    /*https://stackoverflow.com/questions/36483151/uncaught-typeerror-indexof-is-not-a-function*/
    event.target.setAttribute("onclick", "sendAlert('Theme already in use.',3)");
    localStorage.setItem("theme", array + 1 || 0);
}

/* Load functions below.
(Some of these might be running on hopes and dreams so don't change them 
if you don't know what you're doing) */
function dayFunct() {
    day = day.getDay() - 1;
    console.log(proctors[day] + ' / ' + proctors.length + ' of school week');
    if (day > 4 || day < 0) {
        console.error('It\'s the weekend. What are you even doing in the terminal? Just do your work...');
        console.warn('I promise there\'s nothing to see here!');
        console.warn('No, seriously.');
    } else {
        console.log('Running on v3, but that isn\'t important. What is important is the reason you\'re here today. You should consider exiting since there isn\'t much to do here.');
        console.log('Since you probably won\'t listen anyway: If you want, come back on the weekend and check again.');
    }
    /*https://stackoverflow.com/questions/59551457/queryselectorall-is-only-showing-odd-value*/
}
function dateFunct() {
    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 12) {
        ampm = "AM";
    }
    if (hours > 12 || hours === 12) {
        hours = hours - 12;
        ampm = "PM";
    }
    if (hours === 0) {
        hours = 12;
    }
    finalDate = (hours + ':' + minutes + ':' + seconds + " " + ampm);
    document.getElementById("date-tracker").innerHTML = finalDate;
}
function checkFunct() {
    for (a = 0; a < document.body.querySelectorAll(".menu-input").length; a++) {
        document.querySelectorAll('.menu-input')[a].checked = false;
    }
    document.getElementById("proctor").innerHTML = proctors[day] + ' | No name' || 'No proctor';
}
function dataFunct() {
    for (i = 0; i < document.querySelectorAll('.theme-btn').length; i++) {
        let example2 = document.querySelectorAll(".theme-btn")[i];
        example2.style.backgroundColor = "hsl(" + example2.getAttribute('pri') + (example2.getAttribute('hsl3') - 5) + '%)';
        if (example2.getAttribute('color') === 'yes') {
            example2.style.color = 'white';
        } else {
            example2.style.color = 'black';
        }
    }
    for (i = 0; i < document.querySelectorAll('.subject-cont').length; i++) {
        if (document.querySelectorAll(".subject-cont")[i].classList.contains('c')) {
            document.querySelectorAll(".checkmark")[i].checked = true;
            document.querySelectorAll(".checkmark")[i].style.display = 'none';
            document.querySelectorAll(".subject-cont")[i].style.pointerEvents = 'none';
            document.querySelectorAll(".subject-cont")[i].style.filter = 'brightness(0.5)';
        }
    }
    /* I do not see a need for high contrast - it is pretty much fine -> document.querySelectorAll('.theme-btn')[2].style.backgroundColor = 'hsl(65, 75%, 24%)';*/
    points = localStorage.getItem("points");
    if (points === "" || points === undefined || points === null) {
        localStorage.setItem('points', 0);
        points = 0;
    }
    username = localStorage.getItem("username") || 'Guest';
    if (username === "" || username === undefined || username === null || username === "Guest") {
        document.getElementById("usernames").style.display = 'flex';
        console.log(username)
        sendAlert('Could not find a username. Username set to Guest', 3)
    }
    else {
        console.log(username)
        document.getElementById("usernames").style.display = 'none';
        ok = true;
    }
    document.getElementById("points").innerHTML = points;
    document.getElementById("username").innerHTML = username || 'Guest';
    var stringNum = Math.floor(Math.random() * strArray.length + 0);
    var randString = strArray[stringNum];
    var rand2 = punctArray[stringNum] || '!';
    console.log(Math.floor(Math.random() * strArray.length + 1));
    document.getElementById("username2").innerHTML = randString + rand2 + "<br>" + points + " points earned." || 'Looks like you\'re a new user. Welcome, or welcome back if you\'ve been here before.';
}
function arrayFunct() {
    let currDate = new Date();
    currDate = currDate.getDate();
    console.log(currDate)
    if (localStorage.getItem('currDate') !== "" || localStorage.getItem('currDate') !== undefined || localStorage.getItem('currData') !== null) {
        if (parseInt(localStorage.getItem("currDate")) !== currDate) {
            localStorage.removeItem("avail");
            localStorage.setItem("currDate", currDate);
            return;
        }
    }
    else {
        localStorage.setItem("currDate", currDate);
    }
    avail = [];
    if (localStorage.getItem('avail') !== null) {
        avail = JSON.parse(localStorage.getItem('avail'));
        for (i = 0; i < document.querySelectorAll('.checkmark').length; i++) {
            if (avail[i] === 1) {
                document.querySelectorAll('.checkmark')[i].checked = true;
            }
        }
        return;
    }
    else {
        for (i = 0; i < document.querySelectorAll('.checkmark').length; i++) {
            if (document.querySelectorAll('.subject-cont')[i].classList.contains('c')) {
                avail.push('N/A');
            } else {
                avail.push(0);
            }
        }
    }
}
function usernameFunct() {
    ok = true;
    document.getElementById("usernames").classList.toggle('hidden');
    localStorage.setItem('username', document.getElementById("username-entry").value || '');
    username = localStorage.getItem("username");
    document.getElementById("username").innerHTML = username || "Guest";
    document.getElementById("username2").innerHTML = username || "Guest";
}
function themeSelect() {
    if (localStorage.getItem('theme') === "" || localStorage.getItem('theme') === undefined || localStorage.getItem('theme') === null) {
        document.querySelectorAll(".theme-btn")[0].click();
    } else {
        let elemSt = document.querySelectorAll('.theme-btn')[localStorage.getItem('theme') - 1];
        if (elemSt.getAttribute('color') === 'yes') {
            document.documentElement.style.setProperty("--color", 'white');
            document.documentElement.style.setProperty("--color-2", "black");
        } else {
            document.documentElement.style.setProperty("--color", 'black');
            document.documentElement.style.setProperty("--color-2", 'white');
        }
        pri = elemSt.getAttribute('pri');
        hsl3 = elemSt.getAttribute('hsl3');
        outputSt = 'hsl(' + pri + hsl3 + '%)';
        outputSt2 = 'hsl(' + pri + (hsl3 - 5) + '%)';
        document.documentElement.style.setProperty("--dp", outputSt);
        document.documentElement.style.setProperty("--ds", outputSt2);
        document.querySelectorAll('.theme-btn')[localStorage.getItem('theme') - 1].click();
    }
}
/*Initialization*/
function initialize() {
    dayFunct();
    checkFunct();
    dataFunct();
    arrayFunct();
    themeSelect();
    setTimeout(testFunctMain, 14500);
}
window.onload = function () {
    initialize();
    setInterval(dateFunct, 1000);

}

/*Data removal*/
function remUser() {
    localStorage.removeItem('username');
    document.getElementById('username').innerHTML = 'Guest';
    username = 'Guest';
}
function remPts() {
    localStorage.removeItem('points');
    document.getElementById('points').innerHTML = '0';
    localStorage.removeItem('avail');
    avail = [];
    points = 0;
}
function remTheme() {
    localStorage.removeItem("theme");
}
function remData() {
    remUser();
    remPts();
    remTheme();
    document.querySelectorAll(".theme-btn")[0].click();
    event.target.innerHTML = "Please reload page";
    window.alert("Data removal scripts completed successfully. Please reload page to ensure full completion of this process");
}

/*Alert function*/
let alertNum = 0;
function sendAlert(content, type) {
    let newAlert = document.createElement('div');
    let alertText = document.createElement('span');
    newAlert.classList.add("alert");
    alertText.innerHTML = content;
    newAlert.classList.add(alertTypes[type - 1] || 1);
    document.getElementById("alerts-cont").appendChild(newAlert);
    newAlert.appendChild(alertText);
    setTimeout(() => newAlert.classList.add("hidden"), 1750);
    setTimeout(() => newAlert.remove(), 2100);
}
selector = 0;
function testFunctMain() {
    document.querySelectorAll('.hw-grid')[selector].classList.add('hide');
    setTimeout(testFunct, 500);
    setTimeout(testFunctMain, 15000);
}
function testFunct() {
    document.querySelectorAll('.hw-grid')[selector].classList.remove('show');
    document.querySelectorAll('.hw-grid')[selector].classList.remove('hide');
    if (selector === document.querySelectorAll('.hw-grid').length - 1) {
        selector = 0;
    } else {
        selector += 1;
    }
    girds[selector].classList.add('show');
}