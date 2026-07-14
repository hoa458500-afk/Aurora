/*==========================================================
    Aurora 2.0
    Production Edition
==========================================================*/

"use strict";

/*==========================================================
    CONFIG
==========================================================*/

const CONFIG = Object.freeze({

    fadeDuration: 800,

    textDelay: 300,

    musicVolume: 0.35,

    totalDuration: 30

});

/*==========================================================
    DOM
==========================================================*/

const DOM = Object.freeze({

    intro: document.getElementById("intro-screen"),

    app: document.getElementById("app"),

    ending: document.getElementById("ending-screen"),

    startButton: document.getElementById("start-btn"),

    scene: document.getElementById("scene-image"),

    message: document.getElementById("message"),

    audio: document.getElementById("bgm")

});

/*==========================================================
    STATE
==========================================================*/

const STATE = {

    started: false,

    finished: false,

    startTime: 0,

    currentIndex: -1,

    animationId: null

};

/*==========================================================
    SCENES
==========================================================*/

const SCENES = Object.freeze({

    scene1: "assets/images/scene1.png",

    scene2: "assets/images/scene2.png",

    scene3: "assets/images/scene3.png"

});

/*==========================================================
    TIMELINE
==========================================================*/

const TIMELINE = Object.freeze([

    {

        time: 0,

        scene: "scene1",

        text: "Hôm nay chắc cũng mệt ha..."

    },

    {

        time: 4,

        scene: "scene1",

        text: "Ngồi nghỉ một chút nghen."

    },

    {

        time: 8,

        scene: "scene1",

        text: "Có những ngày,\nchỉ cần cho mình vài phút ngồi yên\ncũng đã là đủ rồi."

    },

    {

        time: 15,

        scene: "scene2",

        text: "Không sao nếu hôm nay bà chưa ổn.\nMọi chuyện rồi sẽ có cách của nó."

    },

    {

        time: 22,

        scene: "scene2",

        text: "Biết đâu ngày mai\nsẽ dịu dàng hơn hôm nay."

    },

    {

        time: 27,

        scene: "scene3",

        text: "Chúc bà luôn bình an\nvà ngủ thật ngon.\n🤍"

    }

]);

/*==========================================================
    END OF PART 1
==========================================================*/