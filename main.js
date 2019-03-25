var questions
var currentQuestion
var answers
var correct = 0
var current = 0
var loaded = false

async function createApiUrl(url) {
    let number = url.searchParams.get('n')
    number = Math.max(1, Math.min((number) ? number : 10, 50))

    let category = url.searchParams.get('c')
    category = ''

    let difficulty = url.searchParams.get('d')
    difficulty = (difficulty) ? difficulty : ''

    return 'https://opentdb.com/api.php?amount=' + number + '&type=multiple&category=' + category + '&difficulty=' + difficulty
}

async function loader() {
    const apiUrl = await createApiUrl(new URL(window.location.href))
    const res = await fetch(apiUrl)
    const json = await res.json()
    return json.results
}

function endQuiz() {
    document.getElementById('progressBar').value = questions.length
    document.getElementById('progress').innerHTML = 'Quiz completed'
    document.getElementById('question').innerHTML = correct + ' correct answers out of ' + questions.length
    document.getElementById('button1').style.display = 'none'
    document.getElementById('button2').style.display = 'none'
    document.getElementById('button3').style.display = 'none'
    document.getElementById('button4').style.display = 'none'
}

function setQuestion(question) {
    currentQuestion = question
    document.getElementById('progressBar').value = current
    document.getElementById('progressBar').max = questions.length
    document.getElementById('question').innerHTML = currentQuestion.question
    document.getElementById('progress').innerHTML = 'Question: ' + current + ' / ' + questions.length

    answers = currentQuestion.incorrect_answers.slice()
    answers.splice(Math.floor(Math.random() * 4), 0, currentQuestion.correct_answer)

    document.getElementById('button1').innerText = answers[0]
    document.getElementById('button2').innerText = answers[1]
    document.getElementById('button3').innerText = answers[2]
    document.getElementById('button4').innerText = answers[3]
}

function answerFunc(nr) {
    if (!answers)
        return
    var answer = answers[nr]
    var correct_answer = currentQuestion.correct_answer
    if (answer === correct_answer) {
        correct++
        document.getElementById('response').innerHTML = 'Correct!'
        document.getElementById('response').style.color = 'rgb(113,233,113)'
    } else {
        document.getElementById('response').innerHTML = 'Wrong!'
        document.getElementById('response').style.color = 'rgb(233,113,113)'
    }
    current++
    if (current < questions.length)
        setQuestion(questions[current])
    else
        endQuiz()
}

function restartSame() {
    document.getElementById('button1').style.display = 'inline-block'
    document.getElementById('button2').style.display = 'inline-block'
    document.getElementById('button3').style.display = 'inline-block'
    document.getElementById('button4').style.display = 'inline-block'
    current = 0
    correct = 0

    setQuestion(questions[current])
}

window.addEventListener('load', () => {

    var loading = setInterval(() => {
            document.getElementById('question').innerHTML += '.'

    }, 100);

    loader().then(r => {
        clearInterval(loading)
        questions = r
        setQuestion(questions[current])
    })
})
