const stellingTitle = document.getElementById("stellingTitle");
const stellingStatement = document.getElementById("stellingStatement");
const stellingParties = document.getElementById('parties');
const buttons = document.getElementById('buttons');
const buttonBack = document.getElementById('buttonBack');
var questionCount = 0;

var  answers = [];


    document.getElementById("start").addEventListener("click", function start(){
    document.getElementById("titles").style.display = 'none';
    document.getElementById("footer").style.display = 'none';

    stellingStatement.classList.remove('invisible');
    buttons.classList.remove('invisible');
    buttonBack.classList.remove('invisible');

        getStelling()
});

function getStelling(){
    if(answers.length !== subjects.length){
        stellingTitle.innerHTML = questionCount + 1 + '. ' + subjects[questionCount].title
        stellingStatement.innerHTML = subjects[questionCount].statement

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


function changeStelling(opinion) {
    var newAnswers = {
        question_id: questionCount,
        opinion: opinion,
    }
    var yeet = parties.forEach(element =>element.points = 0)
    console.log(yeet)




    questionCount++;
    getStelling();
    }




function matchOpinions(){
    // starting points are my answers
    // loop through my answers for current  subject
        // loop through parties
            // compare my answer for current subject
            // add score to the party that has the same opinion
}
























