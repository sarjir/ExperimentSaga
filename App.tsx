import * as React from 'react';
import Heading from './Components/Heading';
import FirstPage from './FirstPage';
import ExperimentPage from './ExperimentPage';
import './style.css';

export default function App() {
  return (
    <div>
      <FirstPage />
      <ExperimentPage />
    </div>
  );
}
