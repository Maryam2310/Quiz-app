
let questionInput = document.querySelector('.question-input');
let answer1Input = document.querySelector('.answer1');
let answer2Input = document.querySelector('.answer2');
let answer3Input = document.querySelector('.answer3');
let answer4Input = document.querySelector('.answer4');
let correctAnswer = '';
let saveButton = document.querySelector('.save');
let radioButton1 = document.querySelector('.radio1');
let radioButton2 = document.querySelector('.radio2');
let radioButton3 = document.querySelector('.radio3');
let radioButton4 = document.querySelector('.radio4');
let deleteQuizButton = document.querySelector('.del-quiz');
let showQuizDiv = document.getElementById('show-quiz');
let quizArray = localStorage.getItem('quizItem') ? JSON.parse(localStorage.getItem('quizItem')) : [];
let takeQuizButton = document.querySelector('.take-quiz');
let submitQuizButton = document.querySelector('.submit-quiz');






takeQuizButton.addEventListener('click', () => {

  if (quizArray.length  < 1) {
alert ('"Please create quiz first"');
  }

  if (quizArray.length > 0) {

    takeQuizButton.style.display = 'none';
    submitQuizButton.style.display = 'block';
  }

  resultDiv.innerHTML = '';

});






deleteQuizButton.addEventListener('click', () => {
  localStorage.clear();
  showQuizDiv.innerHTML = '';
  quizArray = [];
  submitQuizButton.style.display = 'none';
  resultDiv.innerHTML = '';
takeQuizButton.style.display='inline-block';
});



saveButton.addEventListener('click', () => {
  validateForm();

});



function checkInputValueNotEmpty() {
  if (questionInput.value !== '' && answer1Input.value !== '' && answer2Input.value !== '' && answer3Input.value !== '' && answer4Input.value !== '') {

    return true;

  } else {
    return false;
  }
}



function radioButtonChecked() {
  if (checkInputValueNotEmpty()) {
    if (radioButton1.checked == true || radioButton2.checked == true || radioButton3.checked == true || radioButton4.checked == true) {

      return true;
    } else {
      return false;
    }
  }
}



function validateForm() {

  if (radioButtonChecked() == true) {
    saveQuizInfo();

  } else {
    alert('"Please complete the form"')
  }

}




function valueOfcheckedRadioButton() {
  if (radioButton1.checked == true) {
    correctAnswer = answer1Input.value;

  } else if (radioButton2.checked == true) {
    correctAnswer = answer2Input.value;
  }
  else if (radioButton3.checked == true) {
    correctAnswer = answer3Input.value;
  }

  else if (radioButton4.checked == true) {
    correctAnswer = answer4Input.value;
  }



  return correctAnswer;

}







saveQuizInfo = () => {
  let questionInputValue = questionInput.value;
  let answer1InputValue = answer1Input.value;
  let answer2InputValue = answer2Input.value;
  let answer3InputValue = answer3Input.value;
  let answer4InputValue = answer4Input.value;



  let quizInfo = {

    'question': questionInputValue,
    'answers': {
      'a': answer1InputValue,
      'b': answer2InputValue,
      'c': answer3InputValue,
      'd': answer4InputValue
    },
    'correctanswer': valueOfcheckedRadioButton()

  }

  quizArray.push(quizInfo);

  localStorage.setItem('quizItem', JSON.stringify(quizArray));
  showQuiz();


  questionInput.value = '';
  answer1Input.value = '';
  answer2Input.value = '';
  answer3Input.value = '';
  answer4Input.value = '';

  radioButton1.checked = false;
  radioButton2.checked = false;
  radioButton3.checked = false;
  radioButton4.checked = false;

}


showQuiz = () => {

  let quizItem = '';

  for (let i = 0; i < quizArray.length; i++) {

    let options = quizArray[i].answers;

    quizItem += `
  <div class='quiz-item'>
    <div class='question'>Q: ${quizArray[i].question} ?</div>
  <div class='option-a'><input type="radio" name="option${i}"  class="radio-button radio-1" value='${options.a}'>
  ${options.a}. </div>
  <div class='option-b'><input type="radio" name="option${i}"  class="radio-button radio-2" value='${options.b}'> ${options.b}. </div>
  <div class='option-c'><input type="radio" name="option${i}"  class="radio-button radio-3" value='${options.c}'>
  ${options.c}. </div>
  <div class='option-d'><input type="radio" name="option${i}"  class="radio-button radio-4" value='${options.d}'>
  ${options.d}. </div>
  <button class='del-quiz-item' type='button' onclick='delQuizItem(${i})'><i class="fa-solid fa-x"></i></button>
  </div>
  `

  }

  showQuizDiv.innerHTML = quizItem;

}

delQuizItem = (index) => {
  quizArray.splice(index, 1);
  localStorage.setItem('quizItem', JSON.stringify(quizArray));
  showQuiz();
  submitQuizButton.style.display = 'none';
  if (quizArray.length == 0) {
    resultDiv.innerHTML = '';
  }

}




submitQuizButton.addEventListener('click', () => {
  showResults();

});




isRadioBtnChecked = () => {
  let radioBtn1 = document.querySelector('.radio-1');
  let radioBtn2 = document.querySelector('.radio-2');
  let radioBtn3 = document.querySelector('.radio-3');
  let radioBtn4 = document.querySelector('.radio-4');



  if (radioBtn1.checked == true || radioBtn2.checked == true || radioBtn3.checked == true || radioBtn4.checked == true) {

    return true;
  } else { alert('"Please select an answer"') }
}

let resultDiv = document.querySelector('.show-results');

showResults = () => {
  if (isRadioBtnChecked()) {

    let quizContainer = document.querySelectorAll('.quiz-item');
    let userAnswer = [];

    let numCorrect = 0;


    for (let i = 0; i < quizContainer.length; i++) {
      let radiobuttons = quizContainer[i].querySelectorAll('.radio-button');
      for (let b = 0; b < radiobuttons.length; b++) {
        if (radiobuttons[b].checked == true) {
          userAnswer.push(radiobuttons[b].value);
        }
      }
    }


    for (let j = 0; j < quizArray.length; j++) {
      if (userAnswer[j] == quizArray[j].correctanswer) {
        numCorrect++;

      }
    } resultDiv.innerHTML = `Result: ${numCorrect} / ${quizArray.length} correct answers. `;

    takeQuizButton.style.display = 'inline-block';
    submitQuizButton.style.display = 'none';

    for (let i = 0; i < quizContainer.length; i++) {
      let radiobuttons = quizContainer[i].querySelectorAll('.radio-button');
      for (let b = 0; b < radiobuttons.length; b++) {
        radiobuttons[b].checked = false;
      }
    }


  }
}


quizArray.forEach(showQuiz);
