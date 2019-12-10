import React from 'react';
import PropTypes from 'prop-types';

/**
 * Function react component for congratulatory message
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is passed)
 */
const Congrats = (props) => {
        if(props.success){
            return (
                <div data-test='component-congrats' className="alert alert-success">
                    <span data-test='congrats-message'>
                        Congratulations! You guess the word!
                    </span>
                </div>
            );
        } else {
            return (
                <div data-test='component-congrats' />
            );
        }
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
};

export default Congrats;