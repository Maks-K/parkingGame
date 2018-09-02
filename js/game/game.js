function Game() {
    this.CAR_CONFIG = {
        parent: scene,
        position: {x: -40, y: 0, z: 0},
        body: {
            dimentions: {width: 10, height: 4, depth: 4},
            textures: {
                right: "img/carTexture.png",
                left: "img/carTexture.png",
                top: "img/carTexture.png",
                bottom: "img/carTexture.png",
                front: "img/carTexture.png",
                back: "img/carTexture.png"
            }
        },
        wheels: {
            radius: 2,
            offset: -3,
            texture: "img/wheel.png",
            wheels: [
                {positionX: -4},
                {positionX: 0},
                {positionX: 4}
            ]
        }
    };

    this.GARAGE_CONFIG = {
        parent: scene,
        position: {x: 30, y: 0, z: 0},
        width: 25,
        height: 10,
        depth: 10,
        frontWallOpacity: 0.5,
        wall: {
            thickness: 1,
            texture: "img/brickTexture.jpg"
        },
        roof: {
            thickness: 1,
            texture: "img/roof.jpg"
        }
    };

    this.speed = 0;
    this.acceleration = 0.015;

    this.init();
}

Game.prototype.init = function () {
    this.car = new Car(this.CAR_CONFIG, this);
    this.garage = new Garage(this.GARAGE_CONFIG);
    this.speedManager = new SpeedManager(this);
    this.resultChecker = new ResultChecker(this, this.onWin.bind(this), this.onLost.bind(this));
    this.effectsManager = new EffectsManager();
    this.resetButton = new RestartButton(this.reset.bind(this));

    this.reset();
};

Game.prototype.reset = function () {
    this.isGameOver = false;

    this.car.reset();
    this.effectsManager.reset();
    this.speedManager.reset();
};

Game.prototype.update = function () {
    if(!this.isGameOver){
        this.speedManager.update();
        this.resultChecker.update();
        this.car.update();

        this.updateSpeedText();
    }
};

Game.prototype.updateSpeedText = function () {
    document.getElementById("speed").innerText = "speed: " + this.speed.toFixed(2);
};

Game.prototype.onWin = function () {
    this.resetButton.updateText("Congrats! Again?");
    this.onGameOver();
    this.effectsManager.applyWinningEffect();
};

Game.prototype.onLost = function () {
    this.resetButton.updateText("Better luck next time. Again?");
    this.onGameOver();
    this.effectsManager.applyLosingEffect();
};

Game.prototype.onGameOver = function () {
    this.speedManager.processGameOver();
    this.isGameOver = true;
    this.resetButton.show();
};

var game = new Game();

addToRenderLoop(function () {
    game.update();
});