import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentsListForExhManager = ({studentsList, description}) => {

  const [errorMsg, setErrorMsg] = useState("");

  const numOfStudents = studentsList.length;

  const numOfStudentsComing = studentsList.filter( (student) => student.studentStatus === "coming" ).length;

  const numOfConfirmedPostersForComingStudents = studentsList.filter( (student) => student.studentStatus === "coming" && (student.posterStatus === "accepted" || student.posterStatus === "declined")).length;

  const studentsComingList = studentsList.filter((student) => student.studentStatus === "coming");



  

  return ( 

    <>

      <div className="status-indicators">
        <p>Postotak studenata koji imaju potvrđen dolazak na Dan doktorata: {Math.round((numOfStudentsComing/numOfStudents) * 100 * 100) / 100} %</p>
        {numOfStudentsComing === 0 ? 
          <p>Niti jedan student nije u potpunosti potvrđen da dolazi na Dan doktorata.</p>
        :
          <p>Postotak postera završeni s obradom u odnosu na broj studenata koji dolaze na Dan doktorata: {Math.round((numOfConfirmedPostersForComingStudents/numOfStudentsComing) * 100 * 100) / 100} %</p>
        }
       
      </div>
        <div className="people-list">
          <h2 className="description">{description}</h2>
          {
            studentsComingList.map( (student) => (
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

                {student.hasStudentPosterRequest ? 
                  <p>Kliknite <Link to={"/exhmanager/studentposterrequest/"+student.studentID}>OVDJE</Link> kako biste detaljnije pregledali zahtjev studenta</p>
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
 
export default StudentsListForExhManager;