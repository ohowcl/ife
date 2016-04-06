(function() {
    const button = document.getElementById("button");

    // click action
    const clickAction = function() {
        const value = document.getElementById("aqi-input").value;
        const span = document.getElementById("aqi-display");
        span.textContent = value;
    };
    // one
    // button.addEventListener("click", clickAction);

    // another
    button.onclick = clickAction;
})();
