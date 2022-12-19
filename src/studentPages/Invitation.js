import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Invitation = ({studentID}) => {

  const [userData, setUserData] = useState([]);

  const [invitationData, setInvitationData] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/student/mydata/" + studentID)
    .then(res=>{
      setUserData(res.data);
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[])

  useEffect(()=>{
    axios.get("http://localhost:8080/student/invitation/" + studentID)
    .then(res=>{
      setInvitationData(res.data);
      console.log(invitationData.studentResponse == null);
      
    }).catch(err=>{
      console.log(err);
    })
  },[])



  return ( 
    <>
      {userData.studentStatus === "coming" ? 
        <div className="welcome-msg">
          <h2 className="studentMessage">Službeno ste potvrdili svoj dolazak na Dan doktorata! </h2>
        </div>
      :
        <></>
     }

     {userData.studentStatus === "excused" ? 
        <div className="welcome-msg">
          <h2 className="studentMessage">Ispričani ste s dolaska na Dan Doktorata. Ne morate koristiti ovu aplikaciju.</h2>
        </div>
     :
        <></>
      }

      {userData.studentStatus === "created" ? 
        <div className="welcome-msg">
          <h2 className="studentMessage">Dobrodošli na stranicu Dan doktorata!</h2>
          <p>Član studentske službe će Vas uskoro službeno pozvati na dolazak</p>
        </div>
      :
        <></>
      }

      {userData.studentStatus === "invited" && invitationData.studentResponse == null ? 
      <div className="welcome-msg">
        <h2 className="studentMessage">Službeno ste pozvani na dan doktorata! Kliknite <Link to="/replytoinvitation">OVDJE</Link> da biste odgovorili</h2>
      </div>
     :
        <></>
      }

      {userData.studentStatus === "invited" && invitationData.studentResponse != null ? 
        <div className="welcome-msg">
          <h2 className="studentMessage">Odgovorili ste na pozivnicu! Član studentske službe će Vam uskoro potvrditi zahtjev </h2>
        </div>
     :
        <></>
      }


    </>

   );
}
 
export default Invitation;