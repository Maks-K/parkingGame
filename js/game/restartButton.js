function RestartButton(onClickCallback) {
    this.button = document.getElementById("restartButton");
    this.onClickCallback= onClickCallback;
    this.width = 150;
    this.height = 50;

    this.button.style.width = this.width + "px";
    this.button.style.height = this.height + "px";
    this.button.style.display = "none";

    this.refresh();
    this.listenToResize();

    this.button.onclick = this.reset.bind(this);
}

RestartButton.prototype.listenToResize = function () {
    window.addEventListener("resize", this.refresh.bind(this));
};

/**
 * Keeps the button positioned in the center of the screen size changes
 */
RestartButton.prototype.refresh = function () {
    var halfWidth = this.width / 2,
        halfHeight = this.height / 2,
        windowHalfWidth = window.innerWidth / 2,
        windowHalfHeight = window.innerWidth * screenRatio / 2;

    this.button.style.left = windowHalfWidth - halfWidth + "px";
    this.button.style.top = windowHalfHeight - halfHeight + "px";
};

RestartButton.prototype.updateText = function (newText) {
    this.button.innerText = newText;
};

RestartButton.prototype.show = function () {
    this.button.style.display = "block";
};

RestartButton.prototype.reset = function () {
    this.button.style.display = "none";
    this.onClickCallback();
};