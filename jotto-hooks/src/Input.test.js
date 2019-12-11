import React from 'react';
import { mount} from 'enzyme';
import Input from './Input';
import {findByTestAttr, checkProps} from "../test/testUtils";
import languageContext from "./contexts/languageContext";

/**
 * Create ReactWrapper for Input component for testing
 * @param {object} testValues - Context and props values for this specific test
 * @returns {ReactWrapper} -  Wrapper for Input component and providers
 */
const setup = ({language, secretWord}) => {
    language = language || 'en';
    secretWord = secretWord || 'party';

    return mount(
        <languageContext.Provider value={language}>
            <Input secretWord={secretWord}/>);
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
