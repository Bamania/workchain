
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
import DeveloperLogin from './pages/DeveloperLogin.jsx';
import ClientLogin from './pages/ClientLogin.jsx';
import DeveloperSignup from './pages/DeveloperSignup .jsx';
import ClientSignup from './pages/ClientSignup.jsx';
import ClientProfile from './pages/Clientprofile.jsx';
import DeveloperProfile from './pages/Developerprofile.jsx';
import AuthWrapper from './components/Authwrapper.jsx';
import ProposalPage from './components/ProposalPage.jsx';
import Devsentproposal from './pages/Devsentproposal.jsx';
import ReceivedProposals from './pages/RecievedProposal.jsx';
import OngoingProposals from './pages/Ongoingproposal.jsx';
import CompletedProposals from './pages/CompletedProjects.jsx';
import ModifyingProposal from './pages/ModifyingProposal.jsx';
import Status from './components/status.jsx';
import OngoingForClient from './pages/ClientOngoing.jsx';
import ProposalDetails from './components/clientProposalDetails.jsx';
function App() {

  const developerData = {
    username: 'dev1',
    displayName: 'Developer One',
    skills: ['JavaScript', 'React', 'Node.js'],
  };
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/clientLogin" element={<ClientLogin  />}></Route>
          <Route path="/DeveloperSignup" element={<DeveloperSignup  />}></Route>
          <Route path="/clientSignup" element={<ClientSignup  />}></Route>
          <Route path="/Devprofile" element={<DeveloperProfile developer={developerData}  />}></Route>
          <Route path="/Clientprofile" element={<ClientProfile  />}></Route>
        {/* to create project  */}
          <Route path="/createproject" element={<JobForm />}></Route>
          <Route path="/clientHome" element={<AuthWrapper> <ClientHomePage /></AuthWrapper>}></Route>
          {/* <Route path="/profile" element={<FreelancerForm />}></Route> */}
          <Route path="/progress" element={<OngoingForClient />}></Route>
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/freelancer" element={<JobList />}></Route>
          <Route path="/availableJob" element={<FreelancherJobList />}></Route>
          <Route path="/chat" element={<Chat  />}></Route>
          <Route path="/chat2" element={<ChatWithDeveloperPage  />}></Route>
          <Route path="/DeveloperLogin" element={<DeveloperLogin  />}></Route>
          <Route path="/createProposal" element={<ProposalPage  />}></Route>
          <Route path="/getProposal" element={<Devsentproposal  />}></Route>
          <Route path="/recievedProposals" element={<ReceivedProposals  />}></Route>
          <Route path="/ongoing-projects" element={<OngoingProposals  />}></Route>
          <Route path="/completed-projects" element={<CompletedProposals  />}></Route>
          <Route path="/Modify" element={<ModifyingProposal  />}></Route>
          <Route path="/statusupdate" element={<Status  />}></Route> t
          {/* <Route path="/statusupdate" element={<Status  />}></Route> //for client */}
          <Route path="/viewdetails" element={<ProposalDetails  />}></Route>


          </Routes>
          </Router>
     
    </>
  );
}

export default App;
