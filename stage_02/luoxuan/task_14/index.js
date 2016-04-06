(function() {
    const aqiData = [
        ["北京", 90],
        ["上海", 50],
        ["福州", 10],
        ["广州", 50],
        ["成都", 90],
        ["西安", 100]
    ];
    const unordreList = document.getElementById("aqi-list");

    for (var i = 0; i < aqiData.length; i++) {
        if (aqiData[i][1] >= 60) {
            let element = document.createElement("li");
            element.textContent = aqiData[i][0];
            unordreList.appendChild(element);
        }
    }
})();
