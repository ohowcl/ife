function matchwords() {
  var text = document.getElementById("text").value;
  var word = document.getElementById("word").value;
  document.getElementById("result").innerHTML = text.replace(new RegExp(word,"g"), "<font color=red><strong>" + word + "</strong></font>");
}
function init() {
  document.getElementById("submit").onclick = matchwords;
}
init();
