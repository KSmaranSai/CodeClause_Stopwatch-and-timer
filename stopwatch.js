var [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
var start = document.getElementById("sw-start");
var reset = document.getElementById("sw-reset");
var time = document.getElementById("sw-time");
var isStart = false;
var on = null;

start.addEventListener('click', function () {
    if (!isStart) {
        start.innerHTML = "Stop";
        start.style.backgroundColor = 'red'
        isStart = true;

        on = setInterval(() => {
            displayTime();
        }, 10);
    }
    else {
        start.innerHTML = "Start";
        start.style.backgroundColor = 'greenyellow'
        isStart = false;

        clearInterval(on);
    }
})

reset.addEventListener('click', function () {
    clearInterval(on);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    time.innerHTML = "00 : 00 : 00 : 000";
    start.innerHTML = "Start";
    start.style.backgroundColor = 'greenyellow'
    isStart = false;
})

function displayTime() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    var h = hours < 10 ? "0" + hours : hours;
    var m = minutes < 10 ? "0" + minutes : minutes;
    var s = seconds < 10 ? "0" + seconds : seconds;
    var ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    time.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}