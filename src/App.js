import imgForm from './img/Papi copie 1.png'
import arrowWhite from './img/arrow-white.png'
import arrowGrey from "./img/arrow-grey.png"

import Questions from './components/Questions';

import { useState, useEffect } from 'react';

function App() {

  const questionsForm = {
    question1 : {question : "Combien de chambres avez-vous dans votre hôtel ?", answer : ["1-10", "10-50", "50-100", "100-200", "200+"]},
    question2 : {question : "Avez-vous un restaurant ?", answer : ["oui", "non"]},
    question3 : {question : "Combien de places assises avez-vous au restaurant ?", answer : ['1-10', "10-25", "25-50", "50+"]}
  }

  const [userAnswers, setUserAnswers] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [inputClicked, setInputClicked] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [canValidate, setCanValidate] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [colorArrow, setColorArrow] = useState(arrowGrey);

  const inputsOnClick = (e, index) => {

    if(index == questionIndex)
    {
      // Récupère tout les inputs du block de question correspondant
      const inputs = document.querySelectorAll(`.inputList${questionIndex}`);

      // Reset l'affichage de tout les inputs en non-selectioné
      inputs.forEach(element => {
        element.className = `inputList${questionIndex}`;
      });

      setAnswerSelected(true);

      // Ajoute la class Selected de l'input selectionné
      e.target.className = `inputList${questionIndex} inputButtonSelected`;

      // Fait pour garder les choix du User
      const userAnswersArray = [...userAnswers];

      // Si il n'y a pas de choix : push le choix en fonction du block de question,  sinon le remplace
      if(userAnswersArray.length == questionIndex)
      {
        userAnswersArray.push(e.target.value);
      }
      else if(userAnswersArray[questionIndex] != e.target.value)
      {
        userAnswersArray[questionIndex] = e.target.value;
      }
      setUserAnswers(userAnswersArray);

      // Vérification des choix utilisateurs (à retirer)
      console.log(userAnswersArray);
    }
    
  }

  // Regarde si on selectionne une réponse pour changer l'affichage du button next ou validate
  useEffect(() => {

    const buttonSubmite = document.querySelector('button');

    if(answerSelected)
    {
      buttonSubmite.className = "submitBtn canSubmite";
      setColorArrow(arrowWhite);
    }
    else
    {
      buttonSubmite.className = "submitBtn";
      setColorArrow(arrowGrey);
    }

}, [answerSelected]);

  // Regarde les réponses du User pour afficher le bouton validate si la réponse est Non ou si il a fini le questionnaire
  useEffect(() => {

    if(userAnswers[1] == "non" || userAnswers.length > 2)
    {
      setCanValidate(true);
    }
    else
    {
      setCanValidate(false);
    }

  }, [userAnswers]);


  const nextStepButton = () => {
    if(!canValidate)
    {
      if(answerSelected)
      {
        setQuestionIndex(questionIndex + 1);
      }
      setAnswerSelected(false)
    }
  }

  const backButton = () => {
    if(questionIndex > 0)
    {
      setQuestionIndex(questionIndex - 1);
      const userAnswersArray = [...userAnswers];
      userAnswersArray.pop();
      setUserAnswers(userAnswersArray);
      setCanValidate(false);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmit(true);
  }

  return (
    <div className="App">

      <div className="left-block">
        <header>
            <h1>🛌 Votre établissement</h1>
            <span>Ces informations importantes serviront à mieux connaître votre établissement et à adapter notre communication en fonction de vos réponses.</span>
        </header>

        {!formSubmit && <form onSubmit={onSubmit}>
          
          <div className='question-block'>
            <Questions
            content={questionsForm.question1}
            func={(e) => {inputsOnClick(e, 0)}}
            />
          </div>

          {questionIndex >= 1  && <div className='question-block'>
            <Questions
            content={questionsForm.question2}
            func={(e) => {inputsOnClick(e, 1)}}
            />
          </div>}

          {questionIndex >= 2 && <div className='question-block'>
            <Questions
            content={questionsForm.question3}
            func={(e) => {inputsOnClick(e, 2)}}
            />
          </div>}

          {canValidate ?
            <button className='submitBtn' type='submit'>Valider</button>
           :
            <button className='submitBtn' type='button' onClick={nextStepButton}>Étape suivante <img className='arrow-right' src={colorArrow} alt="flèche vers la droite"/></button>}
  
          {questionIndex > 0 && <button className='backBtn' type='button' onClick={backButton}><img className='arrow-left' src={arrowGrey} alt="flèche vers la droite"/> Retour</button>}
        </form>}

        {formSubmit && <h2>Nous vous remercions pour tous ces renseignements 🙂</h2>}
      </div>
      
      <img className='left-img' src={imgForm} alt="Image pub d'hôtel" />
    </div>
  );
}

export default App;
