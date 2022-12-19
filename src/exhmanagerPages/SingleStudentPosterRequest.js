import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleStudentPosterRequest = () => {

  const [studentPosterRequest, setStudentPosterRequest] = useState("");
  const {id} = useParams();
  const [managerCommentNew, setManagerCommentNew] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();


  useEffect( () => {
    axios.get("http://localhost:8080/student/posterrequest/"+id)
    .then( (res)=> {
      setStudentPosterRequest(res.data);
      console.log(res.data);
    } )
    .catch( (err) => {
      console.log(err);
    } ) 
  }, [])


  const modifyPosterRequest = (e) => {
    	e.preventDefault();


     if(e.nativeEvent.submitter.name === "accept" || e.nativeEvent.submitter.name ==="decline") {
       let finalPosterStatus = "";
       e.nativeEvent.submitter.name === "accept" ? finalPosterStatus="accepted" : finalPosterStatus="declined";

       const finalizeStudentPosterRequestData = {studentID:studentPosterRequest.studentID, posterStatus:finalPosterStatus};
      axios.post("http://localhost:8080/exhmanager/finalizestudentposterrequest", finalizeStudentPosterRequestData)
      .then( (res) => {
        
        navigate("/home");

      } )
      .catch( (err) => {
        console.log(err);
      } )
     }

     if(e.nativeEvent.submitter.name === "alter") {
       const alteredStudentPosterRequestData = {numOfChange : (studentPosterRequest.numOfChange + 1), managerComment : managerCommentNew, lastEditedBy : 1, studentComment : studentPosterRequest.studentComment, studentID : studentPosterRequest.studentID, jmbag : studentPosterRequest.jmbag };
      	axios.put("http://localhost:8080/exhmanager/alterstudentposterrequest", alteredStudentPosterRequestData)
        .then( (res)=> {
          
          if(res.data === "null") {
            setErrorMsg("Nesto je poslo po krivu");
            return;
          }
  
          navigate("/home");


        } )
        .catch( (err) => {
          console.log(err);
        } )
    }

  }



  return ( 
    <>
    {errorMsg != "" ? <p>{errorMsg}</p> : <></>}
      <div className="exh-poster-request" key={studentPosterRequest.studentid}>
        {/* <h2 className="jmbag-exh-manager-view">JMBAG: {studentPosterRequest.jmbag}</h2> */}
        <h2 className="jmbag-exh-manager-view">{studentPosterRequest.name} {studentPosterRequest.surname}</h2> {/* dodano za potrebe preze */}
        <p>Link na Google Drive: <a href={studentPosterRequest.posterURL}>{studentPosterRequest.posterURL}</a></p>
        {studentPosterRequest.lastEditedBy === 0 ? 
          <>
            <p className="posterRequestResponse">Student je odgovorio na poruku s odgovorom: {studentPosterRequest.studentComment}</p>
            <p className="managerComment">Vaš je komentar bio: {studentPosterRequest.managerComment}</p>

            <form onSubmit={modifyPosterRequest}>
              <p className="textForManagerComment">Upišite svoj novi komentar, ako smatrate da student nije dobro modificirao svoj poster</p>
              <textarea type="text" onChange={(e) => setManagerCommentNew(e.target.value)} id="managercomment" name="managercomment" maxLength={300}></textarea>
              <button type="submit" name="accept" className="exh-accept">PRIHVATI POSTER</button>
              <button type="submit" name="alter" className="exh-alter">ZATRAŽI IZMJENU POSTERA</button>
              <button type="submit" name="decline" className="exh-decline">ODBIJ POSTER ZA STALNO</button>
            </form>
          </>
        :
          <p className="invitationNoResponse">Student nije odg</p>       
        }
      </div>
    </>
   );
}
 
export default SingleStudentPosterRequest;