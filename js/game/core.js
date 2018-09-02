var gameWidth = 100,
    screenRatio = 0.5625,
    scene = initScene(),
    camera = initCamera(screenRatio, scene),
    renderer = initRenderer(screenRatio),
    composer = new THREE.EffectComposer(renderer),
    renderPass = new THREE.RenderPass(scene, camera),
    renderCallbacs = [];

composer.addPass(renderPass);
renderPass.renderToScreen = true;

/**
 * Initializes the game scene with background
 * @returns {Scene}
 */
function initScene() {
    var scene = new THREE.Scene();

    scene.background = new THREE.TextureLoader().load("img/Back.png");

    return scene;
}

/**
 *
 * @param screenRatio
 * @param scene
 * @returns {OrthographicCamera}
 */
function initCamera(screenRatio, scene) {
    var camera = new THREE.OrthographicCamera(
        -gameWidth / 2,
        gameWidth / 2,
        gameWidth / 2 * screenRatio,
        -gameWidth / 2 * screenRatio
        , 100, 1000);

    camera.position.z = 230;

    scene.add(camera);

    return camera;
}

/**
 *
 * @param {number} screenRatio - coef. that sets dependency of height on width
 * @returns {WebGLRenderer}
 */
function initRenderer(screenRatio) {
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerWidth * screenRatio);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", function () {
        renderer.setSize(window.innerWidth, window.innerWidth * screenRatio);
    });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    return renderer
}


/**
 * iterates through all the "update" functions on every frame
 */
function update(){
    renderCallbacs.forEach(function (callback) {
        callback();
    });
}

/**
 *
 * @param {function} callback - function that is to be called on every frame
 */
function addToRenderLoop(callback) {
    renderCallbacs.push(callback);
}

function render(){
    composer.render(scene, camera);
}

function gameLoop(){
    requestAnimationFrame(gameLoop);

    update();
    render();
}

gameLoop();

//var control = new THREE.OrbitControls(camera, renderer.domElement);