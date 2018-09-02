function Garage(config) {
    this.group = new THREE.Group();

    var wallsConfig = this.getWallsConfig(config),
        position = config.position;

    this.walls = this.initWalls(wallsConfig, this.group);

    this.insideBox = this.initInsideBox(config, this.group);

    this.group.position.set(position.x, position.y, position.z);

    config.parent.add(this.group);

    //only one wall will receive shadows (since it's a 2d game):
    this.walls.backWall.receiveShadow = true;
}

Garage.prototype.getWallsConfig = function (config) {
    var width = config.width,
        height = config.height,
        depth = config.depth,
        wallThickness = config.wall.thickness,
        roofThickness = config.roof.thickness;

    return {
        top:             {
            position: {x: 0, y: height / 2, z: 0},
            dimentions: {width: width, height: roofThickness, depth: depth},
            texture: config.roof.texture
        },
        back: {
            position: {x: width / 2, y: 0, z: 0},
            dimentions: {width: wallThickness, height: height, depth: depth},
            texture: config.wall.texture
        },
        frontWall: {
            position: {x: 0, y: 0, z: depth / 2},
            dimentions: {width: width, height: height, depth: wallThickness},
            texture: config.wall.texture,
            opacity: config.frontWallOpacity
        },
        backWall: {
            position: {x: 0, y: 0, z: -depth / 2},
            dimentions: {width: width, height: height, depth: wallThickness},
            texture: config.wall.texture
        }
    };
};

Garage.prototype.initWalls = function (wallsConfig, parent) {
    var me = this,
        walls = {};

    for (var key in wallsConfig){
        if(wallsConfig.hasOwnProperty(key)){
            walls[key] = me.initWall(wallsConfig[key], parent);
        }
    }

    return walls;
};

Garage.prototype.initWall = function (config, parent) {
    var dimentions = config.dimentions,
        position = config.position,
        texture = config.texture,
        boxGeometry = new THREE.BoxGeometry(dimentions.width, dimentions.height, dimentions.depth),
        cubeMaterialArray = [
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)}),
            new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load(texture)})
        ];

    //the opacity is added to one side only, so it's better to have a separate condition for it
    if (config.opacity) {
        cubeMaterialArray.forEach(function (sideConfig) {
            sideConfig.transparent = true;
            sideConfig.opacity = config.opacity;
        })
    }

    var box = new THREE.Mesh(boxGeometry, cubeMaterialArray);

    box.position.set(position.x, position.y, position.z);

    parent.add(box);

    return box;
};

/**
 * Creates the box that stands for the internal garage space
 * it's not supposed to be rendered, used only to determine whether car is inside
 *
 * @param config - walls and garage dimensions
 * @param parent - garage group
 * @returns {Raycaster.params.Mesh|Mesh} - empty invisible box of the needed side
 */
Garage.prototype.initInsideBox = function (config, parent) {
    var wallThickness = config.wall.thickness,
        roofThickness = config.roof.thickness,
        width = config.width - wallThickness,
        height = config.height - roofThickness,
        depth = config.height - wallThickness,

        boxGeometry = new THREE.BoxGeometry(width, height, depth),
        marerial = new THREE.MeshBasicMaterial({color: 0xFFFFFF}),
        insideSpace = new THREE.Mesh(boxGeometry, marerial);

    insideSpace.visible = false;
    parent.add(insideSpace);

    return insideSpace;
};