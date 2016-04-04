var aqiData = [
  ["北京", 90],
  ["上海", 70],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];
(function() {
  function compare(a,b) {
    return b[1] - a[1];
  }
  aqiData.sort(compare);

  var ulNode = document.getElementById('aqi-list');
  var m = 1;
  for(var i = 0;i < aqiData.length;i++) {
    var liNode = document.createElement("li");
    if(aqiData[i][1] >= 60) {
      liNode.innerHTML = "第" + (m++) +"名:" + aqiData[i][0] + "," + aqiData[i][1];
      ulNode.appendChild(liNode);
    }
  }
})();
