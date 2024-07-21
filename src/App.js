
import './App.css';
import Landing from './pages/Landing.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import WalletInfo from './components/Navbar.jsx';
import JobForm from './pages/JobForm.jsx';
import FreelancerForm from './pages/FreelancerForm.jsx';
import ClientHomePage from './pages/ClientHome.jsx';
import JobList from './pages/JobList.jsx';
import FreelancherJobList from './pages/FreelancherJobList.jsx';

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/client" element={<JobForm />}></Route>
          <Route path="/clientHome" element={<ClientHomePage />}></Route>
          <Route path="/freelancer" element={<FreelancerForm />}></Route>
          <Route path="/allprojects" element={<JobList />}></Route>
          <Route path="/freelanceJob" element={<FreelancherJobList />}></Route>
          </Routes>
          </Router>
     
    </>
  );
}

export default App;
