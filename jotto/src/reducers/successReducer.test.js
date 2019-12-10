import {actionTypes} from "../actions";
import successReducer from './successReducer';

test('returns default initial state of `false` when no action is passed', () => {
    const newState = successReducer(undefined, {}); //IMPORTANT to pass this, otherwise reducers throw an error
    expect(newState).toBe(false);
});

test('returns state of true upon receiving an action of type `CORRECT_GUESS`', () => {
    const newState = successReducer(undefined, {type: actionTypes.CORRECT_GUESS});
    expect(newState).toBe(true);
});