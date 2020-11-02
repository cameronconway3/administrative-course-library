import React from 'react';

const Form = props => {
    const {
        cancel,
        submit,
        submitButtonText,
        errors,
        details,
    } = props;

    const handleSubmit = e => {
        e.preventDefault();
        submit();
    }

    const handleCancel = e => {
        e.preventDefault();
        cancel();
    }

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