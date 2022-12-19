import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const ResendPosterRequestForm = () => {

  
  const { id } = useParams();

  const [studentCommentNew, setStudentCommentNew] = useState("");

  const [posterRequestData, setPosterRequestData] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  //initial posterrequest data loading
  useEffect( () => {
    axios.get("http://localhost:8080/student/posterrequest/"+id)
    .then((res)=> {
      setPosterRequestData(res.data);
      console.log(res.data);
    })
  }, []) 


  //submit function
   const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPosterRequestData = {
      jmbag : posterRequestData.jmbag,
      lastEditedBy : 0,
      managerComment : posterRequestData.managerComment,
      numOfChange : posterRequestData.numOfChange,
      studentComment : studentCommentNew,
      studentID : posterRequestData.studentID

    };
    
     axios.put("http://localhost:8080/student/updateposterrequest/", updatedPosterRequestData)
    .then( (res) => {

      if(res.data === null) {
        setErrorMessage("Nešto je pošlo po krivu...");
      }
        navigate("/poster/" + id);
    })
    .catch( (err) => {
      console.log(err);
    }) 
  } 

   return ( 
    <div className="resend-poster-request">
      <h2> Molim Vas, ažurirajte poster na poveznici Google Drivea</h2>
      <p>Ukoliko ste to učinili, ostavite komentar na promjene i podnesite obrazac</p>
      {errorMessage !== "" ?  <p>{errorMessage}</p>: <></>}
      <form onSubmit={handleSubmit}>
        <p> Napišite novi komentar kako bi voditelj izložbe vidio da ste poslušali savjete</p>
        <div className="textfieldforstudentcomment">
          <textarea type="text" onChange={(e) => setStudentCommentNew(e.target.value)} id="studentcomment" name="studentcomment" maxLength={300}></textarea>
        </div>
        <button>Ažuriraj zahtjev</button>
      </form>
    </div>
   );

}
 
export default ResendPosterRequestForm;