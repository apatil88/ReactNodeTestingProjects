import React from 'react';
import {shallow} from 'enzyme';

import {findByAttr, storeFactory} from "../test/testUtils";
import Input, {UnconnectedInput} from "./Input";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
    const store = storeFactory(initialState)
    const wrapper = shallow(<Input store={store}/>).dive().dive();
    //console.log(wrapper.debug());
    return wrapper;
};

//setup();

describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(()=>{
            const initialState = {success: false};
            wrapper = setup(initialState);
        });
        test('renders component without error', ()=> {
            const component = findByAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('renders input box', () => {
            const inputBox = findByAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(1);
        });

        test('renders the submit button', () => {
            const submitButton = findByAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(1);
        });
    });

    describe('word has been guessed', () => {
        let wrapper;
        beforeEach(()=>{
            const initialState = {success: true};
            wrapper = setup(initialState);
        });

        test('renders component without error', ()=> {
            const component = findByAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('does not render input box', () => {
            const inputBox = findByAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(0);
        });

        test('does not render the submit button', () => {
            const submitButton = findByAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(0);
        });
    });
});

describe('redux props', () => {
    test('has success piece of state', () => {
       const success = true;
       const wrapper = setup({success});
       const successProp = wrapper.instance().props.success;
       expect(successProp).toBe(success);
    });

    test('`guessWord` action creator is a function prop', () => {
       const wrapper = setup();
       const guessWordProp = wrapper.instance().props.guessWord;
       expect(guessWordProp).toBeInstanceOf(Function);
    });
});

describe('`guessWord` action creator call', () => {
    let guessWordMock;
    let wrapper;

    const guessedWord = 'train';
    beforeEach(()=>{
        guessWordMock = jest.fn();

        const props = {
            guessWord: guessWordMock
        }

        //set up Input component with guessWordMock as the guessWord prop
        wrapper = shallow(<UnconnectedInput {...props} />);

        //add value to input box
        wrapper.setState({currentState: guessedWord});

        //simulate clicked
        const submitButton = findByAttr(wrapper, 'submit-button');
        submitButton.simulate('click', {preventDefault(){}});
    });

    test('calls `guessWord` when button is clicked', () => {
        // check to see if mock ran
        const guessWordCallCount = guessWordMock.mock.calls.length;
        expect(guessWordCallCount).toBe(1);
    });

    test('calls `guessWord` with input value as argument', ()=> {
        const guessedWordArg = guessWordMock.mock.calls[0][0];
        expect(guessedWordArg).toBe(guessedWord);
    });

    test('input box clears on submit', () => {
       expect(wrapper.state('currentGuess')).toBe('');
    });



});