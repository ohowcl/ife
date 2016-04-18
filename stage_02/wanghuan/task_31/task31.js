var form = document.getElementsByTagName('form')[0],
    fieldsets = document.getElementsByTagName('fieldset'),
    Unis = [
        ["北京大学","清华大学","北京邮电大学","北京师范大学"],
        ["复旦大学","同济大学","上海交通大学","上海大学"],
        ["青岛大学","山东大学","烟台大学","济南大学"]
    ],
    city = document.getElementById('city'),
    school = document.getElementById('school'),
    choice = document.getElementsByName("people");



init();

function init() {
    // initialize the show and hide
    fieldsets[1].setAttribute("class","show");
    fieldsets[2].setAttribute("class","hide");

    choice[0].addEventListener("change",showChoice);
    choice[1].addEventListener("change",showChoice);

    city.addEventListener("change",changeSchool);
}

function changeSchool() {

    var uniOfCity = Unis[city.selectedIndex],
        i;

    // clear unis which is selected just
    school.length = 0;

    // modify the unis of selected city
    for(i = 0; i < uniOfCity.length;i++) {
        var option = document.createElement("option");
        option.innerHTML = uniOfCity[i];
        school.appendChild(option);
    }
}

function showChoice() {
    var i,
        checkedNum;

    for (i = 0; i < choice.length; i++) {
        if(choice[i].checked) {
            checkedNum = i;
            break;
        }
    }

    if(checkedNum === 1) {
        // fieldsets[2].style.display = "display";
        // fieldsets[1].style.display = "none";
        // 将css和js分离
        fieldsets[1].setAttribute("class","hide");
        fieldsets[2].setAttribute("class","show");
    } else {
        fieldsets[1].setAttribute("class","show");
        fieldsets[2].setAttribute("class","hide");
    }
}
