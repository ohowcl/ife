// the city and school information
var DATA = {
    "北京": ["北京邮电大学", "北京师范大学"],
    "上海": ["上海交通大学", "复旦大学"]
};

(function() {
    const radios = document.getElementsByName("status");
    // bind the event for select
    for (var i = 0; i < radios.length; i++) {
        radios[i].onchange = function() {
            const studentContainer = document.getElementById("student-container");
            const nostudentContainer = document.getElementById("nostudent-container");
            if (this.value == "student") {
                studentContainer.style.display = "block";
                nostudentContainer.style.display = "none";
            } else {
                studentContainer.style.display = "none";
                nostudentContainer.style.display = "block";
            }
        }
    }

    const citySelector = document.getElementById("city");
    citySelector.innerHTML = "";

    // init the city seletor
    for (var key in DATA) {
        let option = document.createElement("option");
        option.textContent = key;
        citySelector.appendChild(option);
    }

    // init the city selector callback
    citySelector.onchange = function() {
        const key = this.value;
        const schoolSelector = document.getElementById("school");
        schoolSelector.innerHTML = "";
        for (var i = 0; i < DATA[key].length; i++) {
            let option = document.createElement("option");
            option.textContent = DATA[key][i];
            schoolSelector.appendChild(option);
        }
    }
    var event = document.createEvent("HTMLEvents");
    event.initEvent("change", false, true);
    citySelector.dispatchEvent(event);
})();
