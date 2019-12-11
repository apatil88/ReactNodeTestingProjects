const languageStrings = {
    en: {
        congrats: 'Congratulations! You guessed the word!',
        submit: 'Submit',
        guessPrompt: 'Try to guess the secret word!',
        guessInputPlaceholder: 'enter guess',
        guessColumnHeader: 'Guessed Words',
        guessedWords: 'Guesses',
        matchingLettersColumnHeader: 'Matching Letters',
    },
    emoji: {
        congrats: '🎯🎉',
        submit: '🚀',
        guessPrompt: '🤔🤫🔤',
        guessInputPlaceholder: '⌨️🤔',
        guessedWords: '🤷‍🔤',
        guessColumnHeader: '🤷‍',
        matchingLettersColumnHeader: '✅',
    }
}

function getStringByLanguage(languageCode, stringKey, strings=languageStrings) {
    if(!strings[languageCode] || !strings[languageCode][stringKey]){
        //Fall back to English
        return strings.en[stringKey];
    }

    return strings[languageCode][stringKey];
}

// for future mocking
export default {
    getStringByLanguage,
}