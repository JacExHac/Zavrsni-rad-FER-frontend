import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvitationsList from "./InvitationsList";

const MyInvitations = () => {

  const [invitationsList, setInvitationsList] = useState([]);

  useEffect( () => {
    axios.get("http://localhost:8080/stuslu/allinvitations")
    .then( (res) => {
      setInvitationsList(res.data);
      console.log(res.data);
    })
    .catch( (err) => {
      console.log(err);
    })
  },[])

  return ( 
    <div className="my-invitations">
      <h2 className="my-inviations-description">Ovdje možete pregledavati pozivnice koje ste poslali</h2>
      <InvitationsList invitations={invitationsList.filter( (invitation) => invitation.stusluMemberID == localStorage.getItem("stusluMemberID"))} stuSluMemberID={localStorage.getItem("stusluMemberID")} />
    </div>
   );
}
 
export default MyInvitations;