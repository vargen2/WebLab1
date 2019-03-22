var questions
var currentQuestion
var answers
var correct = 0
var current = 0

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

async function loader() {
    var url = 'https://opentdb.com/api.php?amount=10&type=multiple'
    const res = await fetch(url)
    const json = await res.json()
    return json.results
}

function endQuiz() {
    document.getElementById('progress').innerHTML = 'Quiz completed. ' + correct + 'p/10p'
    document.getElementById('question').innerHTML = ''
    document.getElementById('choices').innerHTML = ''
}

function setQuestion(question) {
    currentQuestion = question
    document.getElementById('progressBar').value=current
    document.getElementById('question').innerHTML = question.question
    document.getElementById('progress').innerHTML = 'Question: ' + current + ' / 10'
    answers = question.incorrect_answers
    answers.push(question.correct_answer)
    shuffle(answers)



    document.getElementById('answer1').checked = false
    document.getElementById('answer2').checked = false
    document.getElementById('answer3').checked = false
    document.getElementById('answer4').checked = false

    document.getElementById('label-answer1').innerText = answers[0]
    document.getElementById('label-answer2').innerText = answers[1]
    document.getElementById('label-answer3').innerText = answers[2]
    document.getElementById('label-answer4').innerText = answers[3]

    document.getElementById('button1').innerText = answers[0]
    document.getElementById('button2').innerText = answers[1]
    document.getElementById('button3').innerText = answers[2]
    document.getElementById('button4').innerText = answers[3]
}

function answerFunc(nr) {
    console.log(nr)
    var answer = answers[nr]
    var correct_answer = currentQuestion.correct_answer
    if (answer === correct_answer) {
        correct++
        document.getElementById('response').innerHTML = 'Correct!'
    }else {
        document.getElementById('response').innerHTML = 'Wrong!'
    }
    current++
    if (current < 10)
        setQuestion(questions[current])
    else
        endQuiz()
}


window.addEventListener('load', () => {

    
   

    // document.getElementById('form').addEventListener('submit', function (e) {
    //     e.preventDefault();
    //     var formData = new FormData(e.target)
    //     var answer = answers[formData.get('answer')]
    //     var correct_answer = currentQuestion.correct_answer
    //     if (answer === correct_answer) {
    //         correct++
    //         document.getElementById('response').innerHTML = 'Correct!'
    //     }else {
    //         document.getElementById('response').innerHTML = 'Wrong!'
    //     }
    //     current++
    //     if (current < 10)
    //         setQuestion(questions[current])
    //     else
    //         endQuiz()
    // }, false);

    // document.getElementById('submit').onclick = function () {
    //     document.getElementById('form').submit();
    // }


    loader().then(r => {
        questions = r
        setQuestion(questions[current])
    })


});