//AMBIENT LIGHT
var light = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(light);

//GARAGE LIGHT
var spotLight = new THREE.SpotLight(0xffffff, 1, 200, Math.PI / 3, 0, 1);
spotLight.position.set(30, -5, 25);

spotLight.target.position.set(10, 0, -20);
spotLight.target.updateMatrixWorld();

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;

scene.add(spotLight);


