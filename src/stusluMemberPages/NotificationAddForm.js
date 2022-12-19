import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const NotificationAddForm = () => {

  const [title, setTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [errorAfterFetch, setErrorAfterFetch] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const handleNotificationCreate = (e) => {
    e.preventDefault();

    const notificationTBCreated = {title : title, messageBody : messageBody, stusluMemberID : id}

    axios.post("http://localhost:8080/stuslu/addnotif/", notificationTBCreated)
    .then( (res) => {
      if(res.data.errorMessage) {
        setErrorAfterFetch(res.data.errorMessage);
        return;
      }

      navigate("/home");
      
    } )
    .catch( (err) => {
      console.log(err);
    } )
  }

  return ( 
    <div className="notification-add">
      <h2>Ispunite ovaj obrazac kako biste dodali novu obavijest</h2>
      {errorAfterFetch && <h2 className="error-message">{errorAfterFetch}</h2>}
      <form onSubmit={handleNotificationCreate}>

        <div className="title-field">
          <p>Unesite naslov poruke (max 50 znakova)</p>
          <textarea type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} maxLength={50}></textarea>
        </div>

        <div className="message-body-field">
          <p>Unesite tijelo poruke (max 200 znakova)</p>
          <textarea type="text" id="messagebody" name="messagebody" required onChange={(e) => setMessageBody(e.target.value)} maxLength={200}></textarea>
        </div>

        <button className="submit" type="submit">Stvori</button>

      </form>
    </div>
   );
}
 
export default NotificationAddForm;