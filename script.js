const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const rows = 21;
const cols = 21;

const map = [
    "#####################",
    "#.........#.........#",
    "#.###.###.#.#.###.###.#",
    "#...................#",
    "#.###.#.#####.#.###.#",
    "#.....#...#...#.....#",
    "#####.###.#.#.###.#####",
    "    #.#... G ...#.#    ",
    "#####.#.##---##.#.#####",
    "      . .#     #. .    ",
    "#####.#.##-----##.#.#####",
    "    #.#...       ...#.#    ",
    "#####.#.##.#####.##.#.#####",
    "#.........#.........#",
    "#.###.###.#.#.###.###.#",
    "#...#.............#...#",
    "###.#.#.#####.#.#.#.###",
    "#.....#...#...#.....#",
    "#.#########.#########.#",
    "#.....................#",
    "#####################"
];

let pacman = { x: 1, y: 1, dx: 0, dy: 0 };
let ghost = { x: 10, y: 7 };

function drawMap() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tile = map[y][x];
            if (tile === "#") {
                ctx.fillStyle = "blue";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else if (tile === ".") {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    3,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
        }
    }
}

function drawPacman() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(
        pacman.x * tileSize + tileSize / 2,
        pacman.y * tileSize + tileSize / 2,
        tileSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function drawGhost() {
    ctx.fillStyle = "red";
    ctx.fillRect(
        ghost.x * tileSize + 2,
        ghost.y * tileSize + 2,
        tileSize - 4,
        tileSize - 4
    );
}

function movePacman() {
    const nextX = pacman.x + pacman.dx;
    const nextY = pacman.y + pacman.dy;

    if (map[nextY][nextX] !== "#") {
        pacman.x = nextX;
        pacman.y = nextY;
    }
}

function moveGhost() {
    const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ];
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const nextX = ghost.x + dir.x;
    const nextY = ghost.y + dir.y;

    if (map[nextY][nextX] !== "#") {
        ghost.x = nextX;
        ghost.y = nextY;
    }
}

function checkCollision() {
    if (pacman.x === ghost.x && pacman.y === ghost.y) {
        alert("GAME OVER!");
        location.reload();
    }
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") pacman.dx = 0, pacman.dy = -1;
    if (e.key === "ArrowDown") pacman.dx = 0, pacman.dy = 1;
    if (e.key === "ArrowLeft") pacman.dx = -1, pacman.dy = 0;
    if (e.key === "ArrowRight") pacman.dx = 1, pacman.dy = 0;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPacman();
    drawGhost();
    movePacman();
    moveGhost();
    checkCollision();
}

setInterval(gameLoop, 200);
