import React from 'react';
import {shallow} from 'enzyme';
import Input from './Input';
import {findByTestAttr, checkProps} from "../test/testUtils";

/**
 * Setup function for app component
 * @returns {ShallowWrapper}
 */
const setup = (secretWord='party') => {
    return shallow(<Input secretWord={secretWord}/>);
}

test('Input renders without error', () =>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(Input, {secretWord: 'party'});
});

describe('state controlled input field', ()=> {
   test('state updates with value of input box upon change', ()=> {
       const mockSetCurrentGuess = jest.fn();
       //replacement function
       React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
       const wrapper = setup();
       const inputBox = findByTestAttr(wrapper, 'input-box');

       //simulate inputbox getting a value of train
       const mockEvent = {target: {value: 'train'}};
       inputBox.simulate('change', mockEvent);

       expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');


   }) ;
});
