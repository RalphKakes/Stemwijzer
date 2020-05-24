const stellingTitle = document.getElementById("stellingTitle");
const stellingStatement = document.getElementById("stellingStatement");
const stellingParties = document.getElementById('parties');
const buttons = document.getElementById('buttons');
const buttonBack = document.getElementById('buttonBack');
const multiply = document.getElementById('multiply');
const onlySecular = document.getElementById('onlySecular')
const onlyBig = document.getElementById('onlyBig')
const minSize = 18;
var questionCount = 0;


var  answers = [];

parties.forEach(element =>element.points = 0)

document.getElementById("start").addEventListener("click", function start(){
    document.getElementById("buttons").style.display = 'block';
    document.getElementById("titles").style.display = 'none';
    document.getElementById("footer").style.display = 'none';

    stellingStatement.classList.remove('invisible');
    buttonBack.classList.remove('invisible');

    getStelling()
});

function getStelling(){
    // console.log('ANSWERS LENGTH:' + answers.length);
    // console.log('SUBJECTS LENGTH:' + subjects.length);
    // console.log('Answers array' + answers);
    multiply.checked = false;
    if(answers.length !== subjects.length){
        stellingTitle.innerHTML = questionCount + 1 + '. ' + subjects[questionCount].title
        stellingStatement.innerHTML = subjects[questionCount].statement
    } else{
        document.getElementById("buttons").style.display = 'none';
        calculateResult();
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

// Calculates the results based on the settings you entered 
function calculateResult(){
    // Looks if both big parties and secular is turned on
    if(onlyBig.checked && onlySecular.checked){
        showResult(getBigAndSecular())
    }
    // checks if only Big
    else if(onlyBig.checked){
        showResult(getBigParty())
    }    //checks if only secular
   
    else if(onlySecular.checked){
        showResult(getSecular())
    } else{
        showResult(parties)
    }
}


// Shows result from the showResult() function
function showResult(part){
    var div = document.getElementById("results")
    var result = document.createElement("span")
    var length = 100/subjects.length
    for (let i = 0; i < part.length; i++) {
        var lengthbar = length * part[i].points
        result.innerHTML += '<p class="mb-0 mt-1">' + part[i].name + '</p>' + '<div style="max-width:1000px;width:'+ lengthbar +'%">'+ Math.round(lengthbar) + '%</div>'; 
    }
    div.appendChild(result)
}



// Gets parties where secular is true
function getSecular(){
    var arr = []
    for (let i = 0; i < parties.length; i++) {
        if(parties[i].secular === true){
            arr.push(parties[i])
        }
    }
    return arr
}


// Gets parties where big party is is higer than the minsize
function getBigParty(){
    var arr = []
    for (let i = 0; i < parties.length; i++) {
        if(parties[i].size > minSize){
            arr.push(parties[i])
        }
    }
    return arr
}


// Gets parties where secular is true and the parties is bigger than the minsize
function getBigAndSecular(){
    var arr = []
    for (let i = 0; i < parties.length; i++) {
        if(parties[i].secular === true && parties[i].size > minSize){
            arr.push(parties[i])
        }
    }
    return arr
}


// Go back ;)
function goBack(){
    if(questionCount === 0){
        location.reload();
    } else{
        questionCount--;
        getStelling();
    }
}
























