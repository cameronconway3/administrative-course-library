import React from 'react';

const Form = props => {
    const {
        cancel,
        submit,
        submitButtonText,
        errors,
        details,
    } = props;

    // Handle submit of form, prevent the default submit and call the 'submit' function passed as props
    const handleSubmit = e => {
        e.preventDefault();
        submit();
    }

    // Handle cancel of form, prevent the default cancel and call the 'cancel' function passed as props
    const handleCancel = e => {
        e.preventDefault();
        cancel();
    }

    // Build the JSX with the details provided, display and errors using the 'ErrorsDisplay' function
    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {
                    details()
                }
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

// If the errors array contains any errors then build the JSX and map over each error and build a list item containing the error with a key
function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
        <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
                <ul>
                    {
                        errors.map((error, index) => <li key={index.toString()}>{error}</li>)
                    }
                </ul>
            </div>
        </div>
        );
    }

    return errorsDisplay;
}

export default Form;