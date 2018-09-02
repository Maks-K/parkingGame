function ResultChecker(game, onWinCallback, onLostCallback) {
    this.game = game;
    this.car = game.car.group;
    this.garage = game.garage.insideBox;
    this.carBox = new THREE.Box3();
    this.garageBox = new THREE.Box3();

    this.onWinCallback = onWinCallback;
    this.onLostCallback = onLostCallback;
}

/**
 * On each frame checks whether player has lost/won
 */
ResultChecker.prototype.update = function () {
    this.carBox.setFromObject(this.car);
    this.garageBox.setFromObject(this.garage);

    var carMin = this.carBox.min.x,
        carMax = this.carBox.max.x,
        garageMin = this.garageBox.min.x,
        garageMax = this.garageBox.max.x;

    //WIN CONDITION
    if(carMax > garageMax || carMax < -gameWidth/2){
        console.warn("CRASH");
        this.onLostCallback();
    //LOSE CONDITION
    }else if(carMin > garageMin && carMax <= garageMax && +this.game.speed.toFixed(2) === 0){
        console.error("WIN");
        this.onWinCallback();
    }
};