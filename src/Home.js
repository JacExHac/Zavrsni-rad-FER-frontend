import { useState, useEffect } from 'react'
import NotificationList from './NotificationList';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Invitation from './studentPages/Invitation';
import StudentsForManager from './exhmanagerPages/StudentsForManager';

const Home = () => {
  
  const [stuSluNotifications, setStuSluNotifications] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    useEffect(()=>{
      axios.get("http://localhost:8080/student/home")
      .then(res=>{
        setStuSluNotifications(res.data);
      }).catch(err=>{
        setErrorMessage(err.message);
      })
    },[])

    if(stuSluNotifications == "") {
      return (
        <div className="no-notifications">
          {localStorage.getItem("role") === "student" ? 
            <Invitation studentID = {localStorage.getItem("studentID")}/>
          :
            <></>}
          <h2>Nažalost, nemate nikakvih obavijesti</h2>
          {localStorage.getItem("role") === "stu-slu-member" ? 
            <Link id='add-notification-link' to={"/stuslu/addnotification/"+localStorage.getItem("stusluMemberID")}>Dodajte obavijest</Link>
          :
            <></>
          }

        </div>
      );
    }

  return (
    <div className="home">
      {localStorage.getItem("role") === "student" ? 
        <Invitation studentID = {localStorage.getItem("studentID")}/>
      :
       <></>}

      {localStorage.getItem("role") === "student" ?
        <NotificationList notifications={stuSluNotifications} title="Popis obavijesti studentske službe" />
      :
       <></>}

      {localStorage.getItem("role") === "stu-slu-member" ?
      <>
        <Link to={"/stuslu/addnotification/"+localStorage.getItem("stusluMemberID")}>Dodajte obavijest</Link>
        <NotificationList notifications={stuSluNotifications.filter( (notification) => notification.stusluMemberID == localStorage.getItem("stusluMemberID"))} title="Moje poruke!" roleOfViewer = "stu-slu-member"/>
      </>
      :
       <></>}

        {localStorage.getItem("role") === "exhibition-manager" ? 
          <StudentsForManager />
        :
          <></>
        }
       
    </div>
   );
}
 
export default Home;