import React from 'react';
import NavigationBar from './NavigationBar';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MyData from './studentPages/MyData';
import ViewPoster from './studentPages/ViewPoster';
import ResendPosterRequest from './studentPages/ResendPosterRequestForm';
import ErrorPageNotFound from './ErrorPageNotFound';
import Login from './Login';
import SendPosterRequestForm from './studentPages/SendPosterRequestForm';
import CreatePoster from './studentPages/CreatePoster';
import MainAdminPage from './adminPages/MainAdminPage';
import PersonAddingForm from './adminPages/PersonAddingForm';
import Students from './stusluMemberPages/Students';
import NotificationAddForm from './stusluMemberPages/NotificationAddForm';
import MyInvitations from './stusluMemberPages/MyInvitations';
import ReplyToInvitationForm from './studentPages/ReplyToInvitationForm';
import SingleStudentPosterRequest from './exhmanagerPages/SingleStudentPosterRequest';


function App() {

  return (
    <Router>
    <div className="App">

        <Routes>
          <Route path="/" element={ <Login /> }></Route>
          <Route element={(
            <>
              <NavigationBar />
              <Outlet />
            </>
          )}>

          <Route path="/home" element={< Home /> }></Route>
          <Route path="/mydata/:id" element={<MyData />}></Route>
          <Route path="/poster/:id" element={<ViewPoster />}></Route>
          <Route path="/resendposterrequest/:id" element={<ResendPosterRequest/>}></Route>
          <Route path="/sendposterrequest/:id" element={<SendPosterRequestForm/>}></Route>
          <Route path="/createposter/:id" element={<CreatePoster />}></Route>
          <Route path="/mainadmin" element={<MainAdminPage />}></Route>
          <Route path="/admin/addpeople" element={<PersonAddingForm />}></Route>

          <Route path="/stuslu/students" element={<Students />}></Route>
          <Route path="/stuslu/myinvitations" element={<MyInvitations />}></Route>
          <Route path="/stuslu/addnotification/:id" element={<NotificationAddForm />}></Route>

          <Route path="/replytoinvitation" element={<ReplyToInvitationForm />}></Route>

          <Route path="/exhmanager/studentposterrequest/:id" element={<SingleStudentPosterRequest />}></Route>

          <Route path="*" element={<ErrorPageNotFound/>}></Route>

          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
