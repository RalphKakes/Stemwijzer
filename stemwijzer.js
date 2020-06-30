const stellingTitle = document.getElementById("stellingTitle");
const stellingStatement = document.getElementById("stellingStatement");
const stellingParties = document.getElementById('parties');
const buttons = document.getElementById('buttons');
const buttonBack = document.getElementById('buttonBack');
// doubles the answer if checkbox is clicked
const multiply = document.getElementById('multiply');
const onlySecular = document.getElementById('onlySecular');
const onlyBig = document.getElementById('onlyBig');
// shows the minimum size the party must be to be a big party when sorting
const minSize = 18;
var questionCount = 0;


var answers = [];

parties.forEach(element =>element.points = 0);

/*
* This function just starts the app, adds the buttons and removes the titles and footer
 */
 function start(){
    document.getElementById("buttons").style.display = 'block';
    document.getElementById("titles").style.display = 'none';
    document.getElementById("footer").style.display = 'none';
    stellingStatement.classList.remove('invisible');
    buttonBack.classList.remove('invisible');

    getStatement()
};

/*
* This function sets the correct title and statement for the current questioncount
 */
function getStatement(){
    multiply.checked = false;
    // If questioncount isnt equal to ammount of questions then sets the question in the title
    if(answers.length !== subjects.length){
        stellingTitle.innerHTML = questionCount + 1 + '. ' + subjects[questionCount].title;
        stellingStatement.innerHTML = subjects[questionCount].statement;
    } else{
        document.getElementById("buttons").style.display = 'none';
        document.getElementById("filterbuttons").style.display = 'block';
    }
}
/*
*  This function looks for your answer and then adds points based on your opinion
 */
function changeStatement(opinion) {
    //  Saves your yourAnswer in a new answers object
    var yourAnswer = {
        question_id: questionCount,
        opinion: opinion,
        heavy: multiply.checked,
    }
    if(answers.length === 0){
        answers[questionCount] = yourAnswer;
        addPoints(yourAnswer)
    } else{
        const item = answers.find(element => element.question_id === questionCount);
        if(item === undefined){
            answers.push(yourAnswer)
            addPoints(yourAnswer)
        } else{
            item.opinion = opinion;
            item.heavy = multiply.checked;
            addPoints(yourAnswer)
        }
    }
    questionCount++;
    getStatement();
}

/*
* This function adds points to parties
*/
function addPoints(yourAnswer){
    // Loops through all parties
    for (let i = 0; i < subjects[questionCount].parties.length; i++) {
        //  Checks if your opinion is the same as one of the parties
        if (subjects[questionCount].parties[i].position === yourAnswer.opinion) {
            // Finds the party from the parties array with name
            const party = parties.find(element => element.name === subjects[questionCount].parties[i].name);
            //Add points
            if (yourAnswer.heavy) {
                party.points += 2;
            } else {
                party.points += 1;
            }
        }
    }
}

/*
* Calculates the results based on the settings you entered
 */
function calculateResult(){
    document.getElementById("filterbuttons").style.display = 'none';
    // Looks if both big parties and secular is turned on
    if(onlyBig.checked && onlySecular.checked){
        showResult(getBigAndSecular());
    }
    // Checks if only Big
    else if(onlyBig.checked){
        showResult(getBigParty());
    }    //Checks if only secular
   
    else if(onlySecular.checked){
        showResult(getSecular());
    } else{
        showResult(parties);
    }
}


/*
* Shows result from the showResult() function
 */
function showResult(part){
    var div = document.getElementById("results");
    var result = document.createElement("span");
    var length = 100/subjects.length;
    for (let i = 0; i < part.length; i++) {
        var lengthbar = length * part[i].points;
        result.innerHTML += '<p class="mb-0 mt-1" >' + part[i].name + '</p>' + '<div style="max-width:1000px;">'+ Math.round(lengthbar) + '%</div>';
    }
    div.appendChild(result)
}



/*
* Gets parties where secular is true
 */
function getSecular(){
    var arr = [];
    for (let i = 0; i < parties.length; i++) {
        if(parties[i].secular === true){
            arr.push(parties[i])
        }
    }
    return arr
}


/*
* Gets parties where big party is is higer than the minsize
 */
function getBigParty(){
    var arr = [];
    for (let i = 0; i < parties.length; i++) {
        if(parties[i].size > minSize){
            arr.push(parties[i])
        }
    }
    return arr
}


/*
* Gets parties where secular is true and the parties is bigger than the minsize
 */
function getBigAndSecular(){
    var arr = [];
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
        getStatement();
    }
}