import React from 'react';
import { mount} from 'enzyme';
import Input from './Input';
import {findByTestAttr, checkProps} from "../test/testUtils";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

/**
 * Create ReactWrapper for Input component for testing
 * @param {object} testValues - Context and props values for this specific test
 * @returns {ReactWrapper} -  Wrapper for Input component and providers
 */
const setup = ({language, secretWord, success}) => {
    language = language || 'en';
    secretWord = secretWord || 'party';
    success = success || false;

    return mount(
        <languageContext.Provider value={language}>
            <guessedWordsContext.GuessedWordsProvider>
                <successContext.SuccessProvider value={[success, jest.fn()]}>
                    <Input secretWord={secretWord}/>);
                </successContext.SuccessProvider>
            </guessedWordsContext.GuessedWordsProvider>
        </languageContext.Provider>
    );
}

test('Input renders without error', () =>{
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(Input, {secretWord: 'party'});
});

describe('state controlled input field', ()=> {

    let mockSetCurrentGuess = jest.fn();
    let wrapper;

    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        //replacement function
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
        wrapper = setup({});
    })

   test('state updates with value of input box upon change', ()=> {
       const inputBox = findByTestAttr(wrapper, 'input-box');

       //simulate inputbox getting a value of train
       const mockEvent = {target: {value: 'train'}};
       inputBox.simulate('change', mockEvent);

       expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
   });

   test('input field is cleared upon submit button click', ()=>{
       const submitButton = findByTestAttr(wrapper, 'submit-button');

       submitButton.simulate('click', {preventDefault() {}});

       expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
   });

});

describe('languagePicker', () => {
    test('correctly renders submit string in english', () => {
        const wrapper = setup({language: 'en'});
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('Submit');
    });

    test('correctly renders submit string in emoji', () => {
        const wrapper = setup({language: 'emoji'});
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('🚀');
    })
});

test('input component does not show when success is true', () => {
    const wrapper = setup({secretWord: 'party', success: true});
    expect(wrapper.isEmptyRender()).to.equal(true);
});
