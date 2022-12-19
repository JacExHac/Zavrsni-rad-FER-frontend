import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SendPosterRequestForm = () => {

  const [studentComment, setStudentComment] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //lastEditedBy is set to 0 because a student is making the request
    const posterRequest = { numOfChange : 0, managerComment: "", lastEditedBy : 0, studentComment : studentComment, studentID : id};

    axios.post("http://localhost:8080/student/sendposterrequest/", posterRequest) //, {headers}
    .then( (res) => {
        navigate("/mydata/" + id);
    })
    .catch( (res) => {
      console.log(res);
    }) 
  }

  return ( 
    <div className="poster-request">
      <h2> Ispunite ovaj obrazac kako biste poslali zahtjev voditelju izložbe da prihvati vaš poster.</h2>
      <form onSubmit={handleSubmit}>
        <p> Unesite komentar koji želite da vidi voditelj (max 300 znakova):</p>
        <div className="textfieldforstudentcomment">
          <textarea onChange={(e) => setStudentComment(e.target.value)} id="studentcomment" name="studentcomment" maxLength={300}></textarea>
        </div>
        <button>Pošalji zahtjev</button>
      </form>
    </div>
   );
}
 
export default SendPosterRequestForm;