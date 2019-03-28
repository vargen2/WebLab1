var questions, currentQuestion, answers
var correct = 0
var current = 0

async function createApiUrl (url) {
  let number = url.searchParams.get('n')
  number = Math.max(1, Math.min((number) || 10, 50))

  let category = url.searchParams.get('c')

  let difficulty = url.searchParams.get('d')
  difficulty = (difficulty) || ''

  return 'https://opentdb.com/api.php?amount=' + number + '&type=multiple&category=' + category + '&difficulty=' + difficulty
}

async function parse (response) {
  return JSON.parse(response).results
}

function endQuiz () {
  document.getElementById('progressBar').value = questions.length
  document.getElementById('progress').innerHTML = 'Quiz completed'
  document.getElementById('question').innerHTML = correct + ' correct answers out of ' + questions.length
  document.querySelectorAll('.answerButton').forEach(b => { b.style.display = 'none' })
}

function setQuestion (question) {
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

function answerFunc (nr) {
  if (!answers) { return }

  if (answers[nr] === currentQuestion.correct_answer) {
    correct++
    document.getElementById('response').innerHTML = 'Correct!'
    document.getElementById('response').style.color = 'rgb(113,233,113)'
  } else {
    document.getElementById('response').innerHTML = 'Wrong!'
    document.getElementById('response').style.color = 'rgb(233,113,113)'
  }

  current++
  if (current < questions.length) { setQuestion(questions[current]) } else { endQuiz() }
}

function restartSame () {
  document.querySelectorAll('.answerButton').forEach(b => { b.style.display = 'inline-block' })
  current = 0
  correct = 0
  setQuestion(questions[current])
}

async function initEventListeners () {
  document.getElementById('button1').addEventListener('click', () => answerFunc(0))
  document.getElementById('button2').addEventListener('click', () => answerFunc(1))
  document.getElementById('button3').addEventListener('click', () => answerFunc(2))
  document.getElementById('button4').addEventListener('click', () => answerFunc(3))
  document.getElementById('restartSame').addEventListener('click', restartSame)
}

window.addEventListener('load', () => {
  var loading = setInterval(() => {
    document.getElementById('question').innerHTML += '.'
  }, 100)

  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (xhr.status === 200) {
        parse(this.responseText).then(r => {
          clearInterval(loading)
          questions = r
          setQuestion(questions[current])
        }).then(initEventListeners)
          .catch(err => {
            document.getElementById('question').innerHTML = 'Error ' + err.message
          })
      } else {
        // todo add some error message xhr.status
      }
    }
  }

  createApiUrl(new URL(window.location.href)).then(apiUrl => {
    xhr.open('GET', apiUrl, true)
    xhr.send()
  })
})
