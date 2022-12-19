import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentsListForStuSlu = ({studentsList, description}) => {

  const [errorMsg, setErrorMsg] = useState("");


  const navigate = useNavigate("");

  const triggerInvite = (studentID, event) => {
    const studentPosterRequest = {studentID : studentID, stusluMemberID : localStorage.getItem("stusluMemberID")};

    axios.post("http://localhost:8080/stuslu/invitestudent", studentPosterRequest)
    .then( (res) => {

      if(res.data === null) {
        setErrorMsg("Nešto je pošlo po krivu, pokušajte ponovno kasnije");
        return;
      }

      navigate("/stuslu/myinvitations");
    } )
    .catch( (err) => {
      console.log(err);
    } )
  }

  const numOfFinalizedStudents = studentsList.filter( (student) => student.studentStatus === "coming" || student.studentStatus === "excused").length;
  const numOfStudents = studentsList.length;

  const numOfConfirmedPosters = studentsList.filter( (student) => student.posterStatus === "accepted" || student.posterStatus === "denied").length;
  const numOfComingStudents = studentsList.filter( (student) => student.studentStatus === "coming").length;


  return ( 

    <>

      <div className="status-indicators">
        <p>Postotak studenata za koje se zna dolaze li ili ne na Dan doktorata: {Math.round((numOfFinalizedStudents/numOfStudents) * 100 * 100) / 100} %</p>
        {numOfComingStudents === 0 ? 
          <p>Niti jedan student nije u potpunosti potvrđen da dolazi na Dan doktorata.</p>
        :
          <p>Postotak postera završeni s obradom u odnosu na broj studenata koji dolaze na Dan doktorata: {Math.round((numOfConfirmedPosters/numOfComingStudents) * 100 * 100) / 100} %</p>
        }
       
      </div>
        <div className="people-list">
          <h2 className="description">{description}</h2>
          {
            studentsList.map( (student) => (
              <div className="person" key={student.studentID}>
                <p className="personName">IME: {student.name}</p>
                <p className="personSurname">PREZIME: {student.surname}</p>
                <p className="personUsername">KORISNIČKO IME: {student.username}</p> 
                <p className="personJmbag">JMBAG: {student.jmbag}</p>
                <p className="personStudentStatus">STATUS STUDENTA: {student.studentStatus}</p>
                <p>---------------------------------</p>
                {student.posterStatus === null ? 
                  <p className="personPosterStatus">STATUS POSTERA: student nije napravio poster</p>
                :
                <p className="personPosterStatus">STATUS POSTERA: {student.posterStatus}</p>
                }
                
                {student.studentStatus === "created" ? 
                  <button className="invitePerson" onClick={ (e) => triggerInvite(student.studentID, e)}>POZOVI</button>
                :
                  <></>
                }
                
              </div>
            ) )
          }
        </div>
      </>  
     
   );
}
 
export default StudentsListForStuSlu;