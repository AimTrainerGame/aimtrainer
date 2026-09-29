// =================================================
// ================= ÉLÉMENTS ======================
// =================================================

const target =
    document.getElementById("target");

const game =
    document.getElementById("game");

const scoreText =
    document.getElementById("score");

const timeText =
    document.getElementById("time");

const crosshair =
    document.getElementById("crosshair");


// =================================================
// ================= SON ===========================
// =================================================

// Le fichier hit.mp3 est directement
// dans le même dossier que le site.

const hitSound =
    new Audio("hit.mp3");

hitSound.preload =
    "auto";


// =================================================
// ================= VARIABLES =====================
// =================================================

let score = 0;

let time = 30;

let timer = null;

let gameRunning = false;

let gameStarted = false;


// =================================================
// ================= CROSSHAIR =====================
// =================================================

const savedCrosshair =
    localStorage.getItem("crosshair") || "dot";


crosshair.classList.add(
    "crosshair-" + savedCrosshair
);


// =================================================
// ================= SOURIS ========================
// =================================================

game.addEventListener(
    "mousemove",
    (event) => {

        crosshair.style.left =
            event.clientX + "px";

        crosshair.style.top =
            event.clientY + "px";

        crosshair.style.display =
            "block";

    }
);


game.addEventListener(
    "mouseenter",
    () => {

        crosshair.style.display =
            "block";

    }
);


game.addEventListener(
    "mouseleave",
    () => {

        crosshair.style.display =
            "none";

    }
);


// =================================================
// ================= DÉPLACER CIBLE ================
// =================================================

function moveTarget() {

    const maxX =
        game.clientWidth -
        target.clientWidth;

    const maxY =
        game.clientHeight -
        target.clientHeight;


    const x =
        Math.random() * maxX;

    const y =
        Math.random() * maxY;


    target.style.transform =
        "none";


    target.style.left =
        x + "px";

    target.style.top =
        y + "px";
}


// =================================================
// ================= JOUER LE SON ==================
// =================================================

function playHitSound() {

    // On clone le son pour que les clics
    // rapides puissent tous produire un son.

    const sound =
        hitSound.cloneNode();

    sound.volume =
        0.7;


    sound.play().catch(() => {

        // Si le navigateur bloque le son,
        // le jeu continue quand même.

    });
}


// =================================================
// ================= CHRONO ========================
// =================================================

function startTimer() {

    timer =
        setInterval(() => {

            time--;

            timeText.textContent =
                time;


            if (time <= 0) {

                clearInterval(timer);

                timer = null;

                gameRunning =
                    false;


                timeText.textContent =
                    0;


                saveBestScore();

            }

        }, 1000);
}


// =================================================
// ================= MEILLEUR SCORE ================
// =================================================

function saveBestScore() {

    const oldBest =
        Number(
            localStorage.getItem(
                "bestScore"
            )
        ) || 0;


    if (score > oldBest) {

        localStorage.setItem(
            "bestScore",
            score
        );

    }
}


// =================================================
// ================= CLIC CIBLE ====================
// =================================================

target.addEventListener(
    "click",
    () => {


        // ===== PREMIER CLIC =====

        if (!gameStarted) {

            gameStarted =
                true;

            gameRunning =
                true;


            score =
                1;


            scoreText.textContent =
                score;


            playHitSound();

            moveTarget();

            startTimer();


            return;
        }


        // ===== PARTIE TERMINÉE =====

        if (!gameRunning) {

            return;

        }


        // ===== +1 POINT =====

        score++;


        scoreText.textContent =
            score;


        playHitSound();

        moveTarget();

    }
);