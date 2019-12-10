import React from 'react'
import {shallow} from 'enzyme';

import {findByAttr, checkProps} from "../test/testUtils";

import GuessedWords from "./GuessedWords";

const defaultProps = {
    guessedWords: [{
        guessedWord: 'train',
        letterMatchCount: 3
    }]
};

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props={}) => {
    const setUpProps = {...defaultProps, ...props};
    return shallow(<GuessedWords {...setUpProps} />);
};

test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
    let wrapper

    beforeEach(()=> {
        wrapper = setup({guessedWords: []});
    });

    test('renders without error', () => {
        const component = findByAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders instructions to guess a word', () => {
        const instructions = findByAttr(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    });
});

describe('if there are words guessed', () => {
    let wrapper;

    const guessedWords = [
        {guessedWord: 'train', letterMatchCount: 3},
        {guessedWord: 'agile', letterMatchCount: 1},
        {guessedWord: 'party', letterMatchCount: 5},
    ];

    beforeEach(()=> {
        wrapper = setup({guessedWords});
    });

    test('renders without error', () => {
        const component = findByAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders "guessed words" section', () => {
        const guessedWordsNode = findByAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });

    test('correct number of guessed words', () => {
        const guessedWordsNodes = findByAttr(wrapper, 'guessed-word');
        expect(guessedWordsNodes.length).toBe(guessedWords.length);
    });
});