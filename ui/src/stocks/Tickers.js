import React from 'react';
import axios from 'axios';
import config from '../config.js';

class Tickers extends React.Component {
    state = {
        error: null,
        isLoading: true,
        tickers: []
    }

    load() {
        const apiUrl = config.apiUrl + '/tickers';

        axios.get(apiUrl)
            .then(response => {
                this.setState({
                    isLoading: false,
                    tickers: response.data
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: false,
                    error: error.response
                });
            });
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const { error, isLoaded, tickers } = this.state;

        return (
            <div>
                <div>
                    {isLoaded}
                </div>
                <div>
                    {error}
                </div>
                <div>
                    <ul>
                        {tickers.map(ticker =>
                            <Ticker key={ticker.id} ticker={ticker} />)}
                    </ul>
                </div>
                <div>
                    <button onClick={() => this.load()}>refresh</button>
                </div>
            </div>
        )
    }
}

function Ticker(props) {
    return (
        <li>{props.ticker.name}</li>
    )
}

export default Tickers