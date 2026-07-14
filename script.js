"use strict";

/*==================================================
    AURORA v2.0 STABLE
==================================================*/

/*==================================================
    DOM
==================================================*/

const introScreen = document.getElementById("intro-screen");
const app = document.getElementById("app");

const startButton = document.getElementById("start-btn");

const message = document.getElementById("message");

const sceneImageA = document.getElementById("scene-image-a");
const sceneImageB = document.getElementById("scene-image-b");

const endingScreen = document.getElementById("ending-screen");

const bgm = document.getElementById("bgm");

/*==================================================
    STATE
==================================================*/

const state = {

    started: false,

    finished: false,

    startTime: 0,

    currentMessage: -1,

    currentScene: -1,

    animationId: null

};

console.log("Aurora Ready");

/*==================================================
    MESSAGE DATA
==================================================*/

const messages = [

    {
        time: 0,
        text: "Hôm nay chắc cũng mệt ha..."
    },

    {
        time: 4,
        text: "Ngồi nghỉ một chút nghen."
    },

    {
        time: 8,
        text: "Có những ngày,\nchỉ cần cho mình vài phút ngồi yên\ncũng đã là đủ rồi."
    }

];

/*==================================================
    SCENE DATA
==================================================*/

const scenes = [

    {
        time: 0,
        image: "assets/images/scene1.png"
    },

    {
        time: 15,
        image: "assets/images/scene2.png"
    },

    {
        time: 27,
        image: "assets/images/scene3.png"
    }

];

/*==================================================
    START ENGINE
==================================================*/

function startAurora() {

    if (state.started) return;

    state.started = true;

    // Ẩn Intro
    introScreen.classList.add("fade-out");

    // Hiện App
    app.classList.add("fade-in");

    // Phát nhạc
    bgm.currentTime = 0;
    bgm.volume = 0.35;

    bgm.play().catch(() => {
        console.log("Trình duyệt yêu cầu tương tác trước khi phát nhạc.");
    });

    // Khóa nút
    startButton.disabled = true;
    startButton.style.pointerEvents = "none";
    requestAnimationFrame(loop);

}

/*==================================================
    MESSAGE ENGINE
==================================================*/

function updateMessage(elapsed) {

    for (let i = messages.length - 1; i >= 0; i--) {

        if (elapsed >= messages[i].time) {

            if (state.currentMessage === i) {

                return;

            }

            state.currentMessage = i;

            message.classList.remove("show-text");

            setTimeout(() => {

                message.textContent = messages[i].text;

                message.classList.add("show-text");

            }, 200);

            return;

        }

    }

}

/*==================================================
    SCENE ENGINE
==================================================*/

function updateScene(elapsed) {

    for (let i = scenes.length - 1; i >= 0; i--) {

        if (elapsed >= scenes[i].time) {

            if (state.currentScene === i) {

                return;

            }

            state.currentScene = i;

            sceneImageA.src = scenes[i].image;

            return;

        }

    }

}

/*==================================================
    ENDING ENGINE
==================================================*/

function finishAurora() {

    if (state.finished) return;

    state.finished = true;

    // Ẩn dòng chữ
    message.classList.remove("show-text");

    // Hiện màn hình kết
    endingScreen.classList.add("fade-in");

    // Dừng vòng lặp
    if (state.animationId) {
        cancelAnimationFrame(state.animationId);
    }

    // Fade nhạc
    const fade = setInterval(() => {

        if (bgm.volume > 0.02) {

            bgm.volume -= 0.02;

        } else {

            clearInterval(fade);

            bgm.pause();

            bgm.currentTime = 0;

        }

    }, 100);

}

/*==================================================
    LOOP
==================================================*/

function loop(timestamp) {

    if (!state.startTime) {

        state.startTime = timestamp;

    }

    const elapsed = (timestamp - state.startTime) / 1000;

    updateMessage(elapsed);

updateScene(elapsed);

if (elapsed >= 30) {

    finishAurora();

    return;

}

state.animationId = requestAnimationFrame(loop);

}

/*==================================================
    EVENTS
==================================================*/

startButton.addEventListener("click", startAurora);