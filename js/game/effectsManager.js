function EffectsManager() {
    this.winPass = new THREE.ShaderPass(THREE.SepiaShader);
    this.losePass = new THREE.ShaderPass(THREE.VerticalBlurShader);

    composer.addPass(this.winPass);
    composer.addPass(this.losePass);

    this.reset();
}

EffectsManager.prototype.reset = function () {
    this.winPass.enabled = false;
    this.losePass.enabled = false;

    renderPass.renderToScreen = true;
    this.losePass.renderToScreen = false;
    this.winPass.renderToScreen = false;
};

EffectsManager.prototype.applyLosingEffect = function () {
    renderPass.renderToScreen = false;
    this.losePass.enabled = true;
    this.losePass.renderToScreen = true;
};

EffectsManager.prototype.applyWinningEffect = function () {
    renderPass.renderToScreen = false;
    this.winPass.enabled = true;
    this.winPass.renderToScreen = true;
};
