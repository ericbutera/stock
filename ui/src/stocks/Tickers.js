import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.js';

import EditForm from './Tickers/EditForm.js';

const Tickers = () => {
    const initialFormState = { id: null, name: '', symbol: '' };

    // tinkering with https://github.com/taniarascia/react-hooks/blob/d2ebfa066db3f829ed4f3b9f38d5f72f17600b82/src/App.js
    // using hooks seems to be an interesting approach. i like the functional aspect, but it is a little
    // difficult to manage where all this data comes from. that's one benefit of using an entire state
    // object.
    const [tickers, setTickers] = useState([]); // load tickers
    const [currentTicker, setCurrentTicker] = useState(initialFormState);
    const [editing, setEditing] = useState(false);

    const add = ticker => {
        debugger;
        //send to server
        setTickers([...tickers, ticker])
    };

    const edit = ticker => {
        setEditing(true);
        setCurrentTicker(ticker);
    };

    /**
     * @returns {Promise}
     */
    const load = () => {
        const apiUrl = config.apiUrl + '/tickers';
        return axios.get(apiUrl)
            .then(response => {
                setTickers(response.data);
            })
            .catch(error => {
                //error.response
            });
    };

    const updateTicker = (id, ticker) => {
        debugger;
        setEditing(false);
        setCurrentTicker({ id: ticker.id, name: ticker.name, symbol: ticker.symbol });
        // send to server
        debugger;
    };

    useEffect(() => {
        // same as componentDidMount
        load();
    });

    return (
        <div>
            <div>
                <h2>Tickers</h2>
                <ul>
                    {tickers.map(ticker =>
                        <Ticker
                            key={ticker.id}
                            ticker={ticker}
                            edit={edit} />)}
                </ul>
            </div>
            <div>
                <button onClick={load}>refresh</button>
            </div>

            <div>
                <EditForm
                    editing={editing}
                    setEditing={setEditing}
                    currentTicker={currentTicker}
                    updateTicker={updateTicker} />
            </div>
        </div>
    );
};

function Ticker(props) {
    return (
        <li onClick={() => props.edit(props.ticker)}>
            {props.ticker.name}
        </li>
    )
}

export default Tickers