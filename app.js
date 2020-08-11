const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const h=document.getElementById('h')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  h.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'RAM stands for?',
    answers: [
      { text: 'Random Access Memory', correct: true },
      { text: 'Random Account Memory', correct: false },
    ]
  },
  {
    question: 'Who is father of computer?',
    answers: [
      { text: 'Nikola Tesla', correct: false },
      { text: 'Charles Babbage', correct: true },
      { text: 'Isaac Newton', correct: false },
      { text: 'John Newman', correct: false }
    ]
  },
  {
    question: 'What is 12 * 12?',
    answers: [
      { text: '168', correct: false },
      { text: '144', correct: true }
    ]
  },
  {
    question: 'What is 13 * 13?',
    answers: [
      { text: '169', correct: true },
      { text: '182', correct: false }
    ]
  },
  {
    question: 'Who is the founder of Pakistan?',
    answers: [
      { text: 'Muhammad Ali Jinnah', correct: true },
      { text: 'Sir Aga Khan 3', correct: false },
      { text: 'Allama Iqbal', correct: false }
    ]
  },
  {
    question: 'Who is the CEO of Tesla Motors?',
    answers: [
      { text: 'Nikola Tesla', correct: false },
      { text: 'Elon Musk', correct: true }
    ]
  },


]