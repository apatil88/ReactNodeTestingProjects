import React from 'react';
import './App.css';
import hookActions from "./actions/hookActions";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

import LanguagePicker from "./LanguagePicker";
import Input from "./Input";
import Congrats from './Congrats';
import GuessedWords from "./GuessedWords";

/**
 * Reducer to update state, called automatically by dispatch
 * @param state {object} - existing state
 * @param action {object} - contains 'type' and 'payload' properties for the state updated
 * @returns {object} - new state
 */
function reducer(state, action){
  switch(action.type) {
    case "setSecretWord":
        return {...state, secretWord: action.payload};
      case "setLanguage":
          return {...state, language: action.payload};
      default:
        throw new  Error(`Invalid action type: ${action.type}`);
  }
}

function App() {

  const [state, dispatch] = React.useReducer(reducer, {secretWord: null, language: 'en'});

  const setSecretWord = (secretWord) => dispatch({type: "setSecretWord", payload: secretWord});
  const setLanguage = (language) => dispatch({type: "setLanguage", payload: language});

  //Only get the secret word once when the app mounts
  React.useEffect(
      () => {hookActions.getSecretWord(setSecretWord())},
      []  //[] indicates do not re-render since no piece of state was changed
  );

  if(!state.secretWord){
    return (
        <div className='container' data-test='spinner'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
          <p>Loading secret word</p>
        </div>
    );
  }

  return (
    <div className='container' data-test='component-app'>
        <h1>Jotto</h1>
        <p> The secret work is {state.secretWord} </p>
        <languageContext.Provider value={state.language}>
            <LanguagePicker setLanguage={setLanguage} />
            <guessedWordsContext.GuessedWordsProvider>
                <successContext.SuccessProvider>
                    <Congrats/>
                    <Input secretWord={state.secretWord} />
                </successContext.SuccessProvider>
                <GuessedWords />
            </guessedWordsContext.GuessedWordsProvider>
        </languageContext.Provider>
    </div>
  );
}

export default App;
