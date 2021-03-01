import React, { useState, useEffect } from 'react';

// mimic https://github.com/taniarascia/react-hooks/blob/d2ebfa066db3f829ed4f3b9f38d5f72f17600b82/src/forms/EditUserForm.js#L3

// TODO edit form
// - changing ticker discards edits and reverts to base state
// - React docs on forms: https://reactjs.org/docs/forms.html#controlled-components
// - Formik https://formik.org/docs/tutorial

const EditForm = props => {
    const [ticker, setTicker] = useState(props.currentTicker);

    useEffect(() => {
        // same as component did mount
        setTicker(props.currentTicker);
    }, [props]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
        // [name]: value  is  partialState[name] = value;
        setTicker({ ...ticker, [name]: value });
        debugger;
    }

    const submit = event => {
        event.preventDefault();
        debugger;
        //props.updateTicker(ticker.id, ticker);
    };

    return (
        <form onSubmit={onsubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={ticker.name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Symbol</label>
                <input type="text" name="symbol" value={ticker.symbol} onChange={handleInputChange} />
            </div>
            <div>
                <button>Update</button>
            </div>
            <div>
                <button onClick={() => props.setEditing(false)}>Cancel</button>
            </div>
        </form>
    );
}

export default EditForm;