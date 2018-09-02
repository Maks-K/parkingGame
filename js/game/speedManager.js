function SpeedManager(config) {
    this.game = config;

    this.keysToUse = ["ArrowRight", "ArrowLeft"];

    window.document.addEventListener("keydown", this.processKeyDown.bind(this));
    window.document.addEventListener("keyup", this.processKeyUp.bind(this));

    this.reset();
}

SpeedManager.prototype.reset = function (){
    this.isAccelerating = false;
    this.isDecelerating = false;
    this.isGameOver = false;
};

SpeedManager.prototype.processKeyDown = function (event) {
    var key = event.key;

    event.preventDefault();

    if(this.isAccelerating || this.isDecelerating || !this.keysToUse.includes(key) || this.isGameOver){
        return false;
    }

    this.isAccelerating = key === "ArrowRight";
    this.isDecelerating = key === "ArrowLeft";
};

SpeedManager.prototype.processKeyUp = function (event) {
    var key = event.key;

    event.preventDefault();

    if(this.keysToUse.includes(key)){
        this.isAccelerating = false;
        this.isDecelerating = false;
    }
};

SpeedManager.prototype.update = function () {
    if(this.isAccelerating){
        this.game.speed += this.game.acceleration;
    }
    if(this.isDecelerating){
        this.game.speed -= this.game.acceleration;
    }
};

SpeedManager.prototype.processGameOver = function () {
    this.isGameOver = true;
    this.isAccelerating = false;
    this.isDecelerating = false;
    this.game.speed = 0;
};