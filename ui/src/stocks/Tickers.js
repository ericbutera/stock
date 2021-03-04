import React, { useEffect, useState } from 'react';
import axios from 'axios';

import config from '../config.js';
import EditForm from './Tickers/EditForm.js';

const Tickers = () => {
    const initialFormState = { name: '', symbol: '' };

    const [tickers, setTickers] = useState([]); // load tickers
    const [ticker, setTicker] = useState(initialFormState);
    const [editing, showForm] = useState(false); // seems like this should be in the edit component?

    const edit = ticker => {
        setTicker(ticker);
        showForm(true);
    };

    const add = () => {
        setTicker({ ...initialFormState }); // clone
        showForm(true);
    }

    /**
     * Fetch tickers from server
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

    const onSave = () => {
        load();
    }

    useEffect(() => { // analog componentDidMount
        load();
    }, []);

    return (
        <div className="container-fluid">
            <h2>Tickers</h2>
            <i className="bi bi-arrow-clockwise" onClick={load}></i>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Symbol</th>
                        <th scope="col"><i className="bi bi-plus-circle" onClick={add}></i></th>
                    </tr>
                </thead>
                <tbody>
                    {tickers.map(ticker =>
                        <tr key={ticker.id}>
                            <td>{ticker.name}</td>
                            <td>{ticker.symbol}</td>
                            <td onClick={() => edit(ticker)}>
                                <i className="bi bi-pen"></i>
                            </td>
                        </tr>)}
                </tbody>
            </table>

            <ul>
            </ul>

            {editing &&
                <EditForm
                    showForm={showForm}
                    onSave={onSave}
                    ticker={ticker} />}
        </div>
    );
};

export default Tickers;