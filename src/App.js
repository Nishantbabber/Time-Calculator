import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import CalculationResult from './components/CalculationResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:calculationPath" element={<CalculationResult />} />
        </Routes>
    </Router>
  );
}

export default App;
