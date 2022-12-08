// General import
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components/pages import
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Homepage } from './pages/Homepage';
import { Trade } from './pages/Trade';
import { ProjectDetails } from './pages/ProjectDetails';
import { Parameters } from './pages/Parameters';
import { NotFound } from './pages/NotFound';

// CSS import
import './css/App.css';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/trade" element={<Trade />} />
					<Route path="/project_details" element={<ProjectDetails />} />
					<Route path="/parameters" element={<Parameters />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
