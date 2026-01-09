const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 40,
    width: 40,
    height: 20,
    speed: 5
};

// Bullet
let bullets = [];

// Enemy
let enemies = [];
const enemyWidth = 30;
const enemyHeight = 20;

// Control
let keys = {};

// Event listener
document.addEventListener("keydown", e => {
    keys[e.code] = true;
});

document.addEventListener("keyup", e => {
    keys[e.code] = false;
});

// Create enemy
function spawnEnemy() {
    enemies.push({
        x: Math.random() * (canvas.width - enemyWidth),
        y: 0,
        speed: 2
    });
}

setInterval(spawnEnemy, 1000);

// Game loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // Shoot
    if (keys["Space"]) {
        bullets.push({
            x: player.x + player.width / 2 - 2,
            y: player.y,
            speed: 6
        });
        keys["Space"] = false;
    }

    // Draw player
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Bullets
    bullets.forEach((b, i) => {
        b.y -= b.speed;
        ctx.fillStyle = "yellow";
        ctx.fillRect(b.x, b.y, 4, 10);

        if (b.y < 0) bullets.splice(i, 1);
    });

    // Enemies
    enemies.forEach((e, ei) => {
        e.y += e.speed;
        ctx.fillStyle = "red";
        ctx.fillRect(e.x, e.y, enemyWidth, enemyHeight);

        // Collision
        bullets.forEach((b, bi) => {
            if (
                b.x < e.x + enemyWidth &&
                b.x + 4 > e.x &&
                b.y < e.y + enemyHeight &&
                b.y + 10 > e.y
            ) {
                enemies.splice(ei, 1);
                bullets.splice(bi, 1);
            }
        });

        // Game over
        if (e.y > canvas.height) {
            alert("Game Over!");
            document.location.reload();
        }
    });

    requestAnimationFrame(update);
}

update();
