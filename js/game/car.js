function Car(config, game) {
    this.config = config;
    this.group = new THREE.Group();
    this.body = this.initBody(config.body, this.group);
    this.wheels = this.initWheels(config.wheels, this.group);

    config.parent.add(this.group);

    this.game = game;

    this.reset();
}

Car.prototype.reset = function(){
    var startingPosition = this.config.position;

    this.group.position.set(startingPosition.x, startingPosition.y, startingPosition.z);
};

Car.prototype.initBody = function (config, parent) {
    var dim = config.dimentions,
        textures = config.textures,
        cubeGeometry = new THREE.BoxGeometry(dim.width, dim.height, dim.depth),
        cubeMaterialArray = [
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(textures.right)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(textures.left)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(textures.top)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(textures.bottom)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(textures.front)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(textures.back)})
        ],
        body = new THREE.Mesh(cubeGeometry, cubeMaterialArray);

    body.castShadow = true;

    parent.add(body);

    return body;
};


Car.prototype.initWheels = function (wheelsConfig, parent) {
    var me = this;

    return wheelsConfig.wheels.map(function (wheelConfig) {
        return me.initWheel(wheelConfig, wheelsConfig.radius, wheelsConfig.offset, wheelsConfig.texture,  parent);
    });
};

Car.prototype.initWheel = function (config, radius, offset, texture, parent) {
    var geometry = new THREE.CylinderGeometry(radius, radius, 5, 10),
        material = [
            new THREE.MeshLambertMaterial({color: 0xFF00FF}),
            new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load(texture)}),
            new THREE.MeshPhongMaterial({color: 0xFF00FF})
        ],
        cylinder = new THREE.Mesh(geometry, material);

    cylinder.position.x = config.positionX;
    cylinder.position.y = offset;
    cylinder.rotation.x = Math.PI / 2;

    parent.add(cylinder);

    cylinder.setCustomAngle = function (displacement) {
        //getting the angle in radians:
        this.rotation.y = -displacement / (2 * radius);
    };

    cylinder.castShadow = true;
    cylinder.castShadow = true;

    return cylinder;
};

/**
 * On each frame recalculates car's position and wheels angle
 */
Car.prototype.update = function () {
    var newPosition = this.group.position.x + this.game.speed;

    this.group.position.x = newPosition;

    this.wheels.forEach(function (wheel) {
        wheel.setCustomAngle(newPosition);
    });
};