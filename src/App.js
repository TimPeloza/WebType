import React from 'react';
import { Helmet } from 'react-helmet'
import './App.css';
import Typing from './components/Typing';
import 'bootstrap/dist/css/bootstrap.min.css';

const TITLE = 'Web Type'

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Typing />
    </React.Fragment>
  );
}

export default App;
