import React from 'react'
import {shallow} from 'enzyme';

import {findByAttr, checkProps} from "../test/testUtils";
import Congrats from "./Congrats";

const defaultProps = {
    success: false
};

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @return {ShallowWrapper}
 */
const setup = (props={}) => {
    const setUpProps = {...defaultProps, ...props};
    return shallow(<Congrats {...setUpProps} />);
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when `success` prop is false', () => {
    const wrapper = setup({success: false});
    const component = findByAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders non-empty congrats message when `success` prop is true', () => {
    const wrapper = setup({success: true});
    const message = findByAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
});

test('does not throw warning with expected props', () => {
    const expectedProps = {success: false};
    checkProps(Congrats, expectedProps);
});