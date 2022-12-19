import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReplyToInvitationForm = () => {

  const [invitationData, setInvitationData] = useState([]);

  const [studentComment, setStudentComment] = useState("");

  const [studentResponse, setStudentResponse] = useState("coming");

  const navigate = useNavigate("");

  const handleInvitationAnswer = (e) => {
    e.preventDefault();

  

    const invitationStudentResponse = {studentResponse : studentResponse, studentText : studentComment, studentInvitationID : invitationData.studentInvitationID};

    console.log(invitationData);

     axios.post("http://localhost:8080/student/sendinvitationanswer", invitationStudentResponse)
    .then( (res) => {
      navigate("/home");
    } )
    .catch((err)=> {
      console.log(err);
    })

  }



  useEffect(()=>{
    axios.get("http://localhost:8080/student/invitation/" + localStorage.getItem("studentID"))
    .then(res=>{
      setInvitationData(res.data);
      console.log(invitationData);
      
    }).catch(err=>{
      console.log(err);
    })
  },[])

  return ( 
    <div className="invitation-request">
      <h2> Pozvani ste na Dan doktorata! Molimo Vas ispunite sljedeći obrazac kako biste odgovorili.</h2>
      <form onSubmit={handleInvitationAnswer}>
        <p> Unesite komentar koji želite da vidi član studentske službe (max 300 znakova):</p>
        <div className="textfieldforstudentcomment">
          <textarea type="text" onChange={(e) => setStudentComment(e.target.value)} id="studentcomment" name="studentcomment" maxLength={300}></textarea>
        </div>

        <div className="radio-div-student-response">
          <select value={studentResponse} onChange = { (e) => setStudentResponse(e.target.value) }>
            <option value="coming">Dolazim</option>
            <option value="excused">Htio/htjela bih biti ispričan/a</option>
          </select>
        </div>
        <button>Pošalji zahtjev</button>
      </form>
    </div>
   );
}
 
export default ReplyToInvitationForm;