import React, { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../../config.js';

// mimic https://github.com/taniarascia/react-hooks/blob/d2ebfa066db3f829ed4f3b9f38d5f72f17600b82/src/forms/EditUserForm.js#L3
// - React docs on forms: https://reactjs.org/docs/forms.html#controlled-components
// - Formik https://formik.org/docs/tutorial

const EditForm = props => {
    const [ticker, setTicker] = useState(props.ticker);

    useEffect(() => {
        // same as component did mount
        setTicker(props.ticker);
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
        props.showForm(false);
    };

    const saveSuccess = response => {
        // theres probably a better way to refresh...
        if (props.onSave)
            props.onSave();
    }

    const save = ticker => {
        if (ticker.id > 0) {
            axios.put(config.apiUrl + '/tickers/' + ticker.id, ticker)
                .then(saveSuccess);
        } else {
            axios.post(config.apiUrl + '/tickers', ticker)
                .then(saveSuccess);
        }
    };

    const cancel = () => {
        // todo confirm
        props.showForm(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input className="form-control" type="text" id="txtName" name="name" placeholder="Name"
                        value={ticker.name} onChange={handleInputChange} maxLength="50" required="required" />
                    <label htmlFor="txtName">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" type="text" id="txtSymbol" name="symbol" placeholder="Symbol"
                        value={ticker.symbol} onChange={handleInputChange} maxLength="50" required="required" />
                    <label htmlFor="txtSymbol">Symbol</label>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-outline-danger" type="button" onClick={cancel}>Cancel</button>
                    <button className="btn btn-primary" type="submit">{ticker.id ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div >
    );
}

export default EditForm;