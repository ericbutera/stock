import { Route, Link } from 'react-router-dom';

import './App.css';
import Tickers from './stocks/Tickers';

function Header() {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Stocks</a>

      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="/logout">Sign out</a>
        </li>
      </ul>
    </header>
  )
}

function Navigation() {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/tickers">Tickers</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

function Dashboard() {
  return (
    <h1>Home</h1>
  )
}

function App() {
  return (
    <div className="App">
      <Header />

      <div className="container-fluid">
        <div className="row">
          <Navigation />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

            <Route path="/" component={Dashboard} />
            <Route path="/tickers" component={Tickers} />

          </main>
        </div>
      </div>

    </div>
  );
}

export default App;
