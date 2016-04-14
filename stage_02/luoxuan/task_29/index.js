(function() {
    const button = document.getElementById("verify");
    const input = document.getElementById("name");

    // remove the error or correct hint
    input.onfocus = function() {
        const input = document.getElementById("name");
        const hint = document.getElementById("name-hint");
        input.classList.remove("error-input");
        hint.classList.remove("error-hint");
        input.classList.remove("correct-input");
        hint.classList.remove("correct-hint");
    };

    // add the hint for different result
    button.onclick = function(e) {
        e.preventDefault();
        const input = document.getElementById("name");
        const hint = document.getElementById("name-hint");
        const value = input.value;
        
        // get the number chinese characters
        const regex = /[\u4e00-\u9fa5]/g;
        const number = value.match(regex);
        let len = 0;
        if (number != null) {
            len = value.length + number.length;
        } else {
            len = value.length;
        }

        // verify the result
        if (len >= 4 && len <= 16) {
            input.classList.add("correct-input");
            hint.classList.add("correct-hint");
        } else {
            input.classList.add("error-input");
            hint.classList.add("error-hint");
        }
    };
})();
