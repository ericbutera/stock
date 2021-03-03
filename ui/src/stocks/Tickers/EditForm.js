import React, { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../../config.js';

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
    }

    const handleSubmit = event => {
        event.preventDefault();
        save(ticker);
        props.setEditing(false);
    };

    const saveSuccess = response => {
        console.log("save response %", response);
        // TODO - indicate refresh ticker list
        debugger;
    }

    const save = ticker => {
        if (ticker.id) {
            axios.put(config.apiUrl + '/tickers/' + ticker.id, ticker)
                .then(saveSuccess);
        } else {
            axios.put(config.apiUrl + '/tickers/' + ticker.id, ticker)
            axios.post(config.apiUrl + '/tickers')
                .then(saveSuccess);
        }
    };

    const cancel = () => {
        props.setEditing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <input type="button" onClick={cancel} value="Cancel" />
            </div>
        </form>
    );
}

export default EditForm;