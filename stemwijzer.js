const stellingTitle = document.getElementById("stellingTitle");
const stellingStatement = document.getElementById("stellingStatement");
const stellingParties = document.getElementById('parties');
const buttons = document.getElementById('buttons');
const buttonBack = document.getElementById('buttonBack');
const multiply = document.getElementById('multiply');

var  answers = [];

var  counter  = 0;

document.getElementById("start").addEventListener("click", function start(){
    document.getElementById("titels").style.display = 'none';
    document.getElementById("footer").style.display = 'none';

    stellingStatement.classList.remove('invisible');
    stellingParties.classList.add('mt-5');
    stellingParties.classList.remove('invisible');
    buttons.classList.remove('invisible');
    buttonBack.classList.remove('invisible');
    document.getElementById('multiplyDiv').classList.remove('invisible');

    for (let i = 0; i < parties.length; i++) {
        if (isNaN(parties[i].points)){
            parties[i].points = 0
        }
    }
    getStelling()
});

function getStelling(){
    if(answers.length !== subjects.length){
        stellingTitle.innerHTML = questionCount + 1 + '. ' + subjects[questionCount].title
        stellingStatement.innerHTML = subjects[questionCount].statement
        document.getElementById("bar").style.width = 14.2857142857 * (questionCount + 1) + "%";

        document.getElementById("eens").innerHTML = "";
        document.getElementById("geen van beide").innerHTML = "";
        document.getElementById("oneens").innerHTML = "";

        subjects[questionCount].parties.forEach(function(element) {
            if (element.position == "pro") {
                document.getElementById("eens").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
            } else if (element.position == "ambivalent") {
                document.getElementById("none").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
            } else if (element.position == "contra") {
                document.getElementById("oneens").innerHTML += "<details class=\"opinion__party\"><summary class=\"party__title\">" + element.name + "</summary><p class=\"party__description\"> " + element.explanation + "</p></details>"
            }
        });
    } else{
        showResult();
    }
}

function goBack(){
    if(questionCount === 0){
        location.href = "/"
    } else{
        questionCount--;
        getStelling();
    }
}
