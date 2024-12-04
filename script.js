// عناصر اللعبة
const player = document.getElementById('player');
const ball = document.getElementById('ball');
const scoreElement = document.getElementById('score');

let playerPosition = 180; // موقع اللاعب
let ballPositionX = Math.random() * 90; // موقع الكرة بشكل عشوائي كنسبة مئوية
let ballPositionY = -10; // موقع الكرة أعلى الشاشة كنسبة مئوية
let score = 0;

// تحريك اللاعب باستخدام اللمس
document.getElementById('game-container').addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const containerBounds = event.currentTarget.getBoundingClientRect();
    let touchX = touch.clientX - containerBounds.left;

    if (touchX < 0) touchX = 0;
    if (touchX > containerBounds.width - 40) touchX = containerBounds.width - 40;

    playerPosition = touchX;
    player.style.left = `${playerPosition}px`;
});

// تحديث موقع الكرة
function moveBall() {
    ballPositionY += 2; // سرعة الكرة
    ball.style.top = `${ballPositionY}%`;
    ball.style.left = `${ballPositionX}%`;

    // التحقق من الاصطدام بين اللاعب والكرة
    const playerBounds = player.getBoundingClientRect();
    const ballBounds = ball.getBoundingClientRect();

    if (
        ballBounds.bottom >= playerBounds.top &&
        ballBounds.right >= playerBounds.left &&
        ballBounds.left <= playerBounds.right
    ) {
        score++;
        scoreElement.textContent = score;
        resetBall();
    }

    // إعادة تعيين اللعبة إذا خرجت الكرة من الشاشة
    if (ballPositionY > 100) {
        alert(`🫵🏻😂😂ونود على سلامتك ! مجموع نقاطك: ${score}`);
        restartGame();
    }

    requestAnimationFrame(moveBall);
}

// إعادة تعيين موقع الكرة
function resetBall() {
    ballPositionY = -10; // إعادة الكرة إلى أعلى الشاشة
    ballPositionX = Math.random() * 90; // وضعها في مكان عشوائي
}

// إعادة تشغيل اللعبة
function restartGame() {
    score = 0;
    scoreElement.textContent = score;
    resetBall();
    ballPositionY = -10; // إعادة الكرة إلى الأعلى
}

// بدء اللعبة
moveBall();
