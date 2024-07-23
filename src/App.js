
import './App.css';
import Landing from './pages/Landing.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import WalletInfo from './components/Navbar.jsx';
import JobForm from './pages/JobForm.jsx';
// import FreelancerForm from './pages/FreelancerForm.jsx';
import ClientHomePage from './pages/ClientHome.jsx';
import JobList from './pages/JobList.jsx';
import FreelancherJobList from './pages/FreelancherJobList.jsx';
import NotificationsPage from './pages/NotificationPage.jsx';
import Chat from '../src/pages/Chat.jsx';
import ChatWithDeveloperPage from './pages/chat2.jsx';

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/client" element={<JobForm />}></Route>
          <Route path="/clientHome" element={<ClientHomePage />}></Route>
          {/* <Route path="/profile" element={<FreelancerForm />}></Route> */}
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/freelancer" element={<JobList />}></Route>
          <Route path="/freelanceJob" element={<FreelancherJobList />}></Route>
          <Route path="/chat" element={<Chat  />}></Route>
          <Route path="/chat2" element={<ChatWithDeveloperPage  />}></Route>
          </Routes>
          </Router>
     
    </>
  );
}

export default App;
