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

    activeScene: "A",

    animationId: null,

    typing: false,

    typingTimer: null,

    typingSpeed: 30,

    fullText: ""

};

/*==================================================
    MESSAGE DATA
==================================================*/

const messages = [

    {
        time: 0,
        text: "Hôm nay chắc cũng mệt ha..."
    },

    {
        time: 3,
        text: "Ngồi nghỉ một chút nghen."
    },

    {
        time: 6,
        text: "Có những ngày,\nchỉ cần cho mình vài phút ngồi yên\ncũng đã là đủ rồi."
    },

    {
        time: 12,
        text: "Không sao nếu hôm nay bà chưa ổn.\n\nMọi chuyện rồi sẽ có cách của nó,\nvà biết đâu ngày mai sẽ dịu dàng hơn hôm nay."
    },

    {
        time: 22,
        text: "Chúc bà luôn bình an\nvà ngủ thật ngon."
    },

    {
        time: 26,
        text: "Lúc nào thấy mệt,\nghé vào đây một chút cũng được. 🤍"
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
        time: 6,
        image: "assets/images/scene2.png"
    },

    {
        time: 12,
        image: "assets/images/scene3.png"
    },

    {
        time: 22,
        image: "assets/images/scene4.png"
    },

    {
        time: 26,
        image: "assets/images/scene5.png"
    }

];

/*==================================================
    PRELOAD IMAGES
==================================================*/

const preloadedImages = [];

function preloadScenes() {

    return Promise.all(

        scenes.map(scene => {

            return new Promise(resolve => {

                const img = new Image();

                img.onload = () => {

                    preloadedImages.push(img);

                    resolve();

                };

                img.onerror = () => {

                    console.warn("Không tải được:", scene.image);

                    resolve();

                };

                img.src = scene.image;

            });

        })

    );

}

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

bgm.volume = 0;

bgm.play().catch(() => {
    

    // Ignore autoplay restriction

});

const fadeIn = setInterval(() => {

    if (bgm.volume < 0.25) {

        bgm.volume += 0.01;

    } else {

        bgm.volume = 0.25;

        clearInterval(fadeIn);

    }

}, 80);

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

           message.classList.add("show-text");

           typeWriter(messages[i].text);

           }, 200);

            return;

        }

    }

}

/*==================================================
    TYPEWRITER ENGINE
==================================================*/

function typeWriter(text) {

    // Nếu đang gõ thì dừng
    if (state.typingTimer) {

    clearInterval(state.typingTimer);

    state.typingTimer = null;

}

    state.typing = true;

    state.fullText = text;

    message.textContent = "";

    let index = 0;

    state.typingTimer = setInterval(() => {

        message.textContent += text.charAt(index);

        index++;

        if (index >= text.length) {

            clearInterval(state.typingTimer);

state.typingTimer = null;

state.typing = false;

        }

    }, state.typingSpeed);

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

            const currentImage =
                state.activeScene === "A"
                    ? sceneImageA
                    : sceneImageB;

            const nextImage =
                state.activeScene === "A"
                    ? sceneImageB
                    : sceneImageA;

           const img = new Image();

img.onload = () => {

    nextImage.src = img.src;

    nextImage.classList.remove("zoom");

    requestAnimationFrame(() => {

        nextImage.classList.add("zoom");

    });

    nextImage.classList.add("active");

    currentImage.classList.remove("active");

    state.activeScene =
        state.activeScene === "A"
            ? "B"
            : "A";

};

img.src = scenes[i].image;

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