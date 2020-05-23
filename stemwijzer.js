const stellingTitle = document.getElementById("stellingTitle");
const stellingStatement = document.getElementById("stellingStatement");
const stellingParties = document.getElementById('parties');
const buttons = document.getElementById('buttons');
const buttonBack = document.getElementById('buttonBack');
const multiply = document.getElementById('multiply');
var questionCount = 0;

var  answers = [];

parties.forEach(element =>element.points = 0)

document.getElementById("start").addEventListener("click", function start(){
    document.getElementById("titles").style.display = 'none';
    document.getElementById("footer").style.display = 'none';

    stellingStatement.classList.remove('invisible');
    buttons.classList.remove('invisible');
    buttonBack.classList.remove('invisible');

    getStelling()
});

function getStelling(){
    console.log('ANSWERS LENGTH:' + answers.length);
    console.log('SUBJECTS LENGTH:' + subjects.length);
    console.log('Answers array' + answers);
    multiply.checked = false;
    if(answers.length !== subjects.length){
        stellingTitle.innerHTML = questionCount + 1 + '. ' + subjects[questionCount].title
        stellingStatement.innerHTML = subjects[questionCount].statement
    } else{
        results();
    }
}

function changeStelling(opinion) {
    var newAnswers = {
        question_id: questionCount,
        opinion: opinion,
        heavy: multiply.checked,
    }
    if(answers.length === 0){
        answers[questionCount] = newAnswers;
        questionCount++;

        // Loops through all parties
        for (let i = 0; i < subjects[questionCount].parties.length; i++) {
            //  Checks if your opinion is the same as one of the parties
            if (subjects[questionCount].parties[i].position === newAnswers.opinion) {
                // Finds the party from the parties array with name
                const party = parties.find(element => element.name === subjects[questionCount].parties[i].name);
                //Add points
                if (newAnswers.heavy){
                    party.points += 2;
                } else {
                    party.points +=1;
                }
            }
        }
    }
    else{
        // Searches your answers and finds your old answer that matches the current questioncount
        const item = answers.find(element => element.question_id === questionCount)
        // Sets opinion if your old answer could not be found
        if(item === undefined){
            answers.push(newAnswers);
            for (let i = 0; i < subjects[questionCount].parties.length; i++) {
                //  Checks if your opinion is the same as one of the parties
                if (subjects[questionCount].parties[i].position === newAnswers.opinion) {
                    // Finds the party from the parties array with name
                    const party = parties.find(element => element.name === subjects[questionCount].parties[i].name);
                    //Add points
                    if (newAnswers.heavy) {
                        party.points += 2;
                    } else {
                        party.points += 1;
                    }
                }
            }
        }else{
            item.opinion = opinion;
            item.heavy = multiply.checked;
        }
        questionCount++;
    }
    getStelling();
}

function results(){
    var div = document.getElementById("results")
    var result = document.createElement("span")
    var length = 100/subjects.length
    for (let i = 0; i < parties.length;  i++) {
        var lengthbar = length * parties[i].points
        // gives percentage of party
        result.innerHTML += '<p class="mb-0 mt-1">' + parties[i].name + '</p>' + '<div style="max-width:1000px;width:'+ lengthbar +'%">'+ Math.round(lengthbar) + '%</div>';
    }
    div.appendChild(result)
}

function goBack(){
    if(questionCount === 0){
        location.reload();
    } else{
        questionCount--;
        getStelling();
    }
}
























