//popup functions -->

var timer_display = document.getElementById("t-time");
var central = document.getElementsByClassName("central")[0];
var popup = document.getElementsByClassName("popup contents")[0];
var close = document.getElementById("popup-close");
var pp_reset = document.getElementById("popup-reset");
var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var second = document.getElementById("second")
var total_time = 0, o_total_time = 0;
var o_h = "00", o_m = "00", o_s = "00";

timer_display.addEventListener('click', () => {
    central.classList.toggle('blur');
    popup.classList.toggle('active');
})

close.addEventListener('click', () => {
    central.classList.toggle('blur');
    popup.classList.toggle('active');
    var h = Number(hour.value);
    var m = Number(minute.value);
    var s = Number(second.value);
    o_total_time = total_time = (h * 3600000) + (m * 60000) + (s * 1000);
    if (h == null || h < 0) {
        h = 0;
    }
    if (m == null || m < 0) {
        m = 0;
    }
    if (s == null || s < 0) {
        s = 0;
    }
    while (s > 60) {
        s = s - 60;
        m++;
    }
    while (m > 60) {
        m = m - 60;
        h++;
    }
    o_h = h = h < 10 ? "0" + h : h;
    o_m = m = m < 10 ? "0" + m : m;
    o_s = s = s < 10 ? "0" + s : s;
    timer_display.innerHTML = `${h} : ${m} : ${s} : 000`;
})

pp_reset.addEventListener('click', () => {
    hour.value = minute.value = second.value = null;
})

hour.addEventListener('input', () => {
    if (hour.value < 0) {
        hour.value = null;
    }
})

minute.addEventListener('input', () => {
    if (minute.value < 0) {
        minute.value = null;
    }
})

second.addEventListener('input', () => {
    if (second.value < 0) {
        second.value = null;
    }
})


//timer time decreasing function -->

var t_start = document.getElementById("t-start");
var t_reset = document.getElementById("t-reset");
var t_time = document.getElementById("t-time");
var t_isStart = false;
var t_on = null;
var timer_audio=new Audio("alarm-clock-short-6402.mp3")

t_start.addEventListener('click', function () {
    if (!t_isStart && !(total_time <= 0)) {
        t_start.innerHTML = "Stop";
        t_start.style.backgroundColor = 'red'
        t_isStart = true;

        t_on = setInterval(() => {
            timer_displayTime();
        }, 10);
    }
    else {
        t_start.innerHTML = "Start";
        t_start.style.backgroundColor = 'greenyellow'
        t_isStart = false;

        clearInterval(t_on);
    }
})

function stop() {
    timer_display.innerHTML = `00 : 00 : 00 : 000`;
    t_start.innerHTML = "Start";
    t_start.style.backgroundColor = 'greenyellow'
    t_isStart = true;
    clearInterval(t_on);
    timer_audio.play();
}

t_reset.addEventListener('click', function () {
    timer_display.innerHTML = `${o_h} : ${o_m} : ${o_s} : 000`;
    clearInterval(t_on);
    t_start.innerHTML = "Start";
    t_start.style.backgroundColor = 'greenyellow'
    t_isStart = false;
    total_time = o_total_time;
    timer_audio.pause();
    timer_audio.currentTime=0;
})

function timer_displayTime() {
    total_time = total_time - 10;
    if (total_time <= 0) {
        stop();
    }
    var h = Math.floor((total_time / 1000 / 60 / 60) % 24);
    var m = Math.floor((total_time / 1000 / 60) % 60);
    var s = Math.floor((total_time / 1000) % 60);
    var ms = Math.floor(total_time % 1000);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    ms = ms < 10 ? "00" + ms : ms < 100 ? "0" + ms : ms;
    t_time.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}