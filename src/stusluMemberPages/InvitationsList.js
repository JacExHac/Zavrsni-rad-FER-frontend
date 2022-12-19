import axios from "axios";

const InvitationsList = ({invitations, stusluMemberID}) => { 

  const handleInvitation = (studentID, studentStatus, studentInvitationID, e) => {
    const finalizedInvitationData = {studentID : studentID, studentStatus:studentStatus, studentInvitationID : studentInvitationID};
    axios.post("http://localhost:8080/stuslu/finalizestudentinvitation",finalizedInvitationData)
    .then( (res) => {
      window.location.reload(false);
    })
    .catch( (err) => {
      console.log(err);
    } )
  }




  return ( 
    <>
      <div className="invitations-list">
        <h2 className="invitation-title">Pregledajte pozivnice koje ste poslali</h2>

        {invitations.map( (invitation) => (
          <div className="invitation" key={invitation.studentInvitationID}>
            <h2 className="jmbag">{invitation.jmbag}</h2>
            {invitation.studentResponse === null ? 
              <p className="invitationNoResponse">Student još uvijek nije odgovorio na ovu poruku</p>
            :
              <>
                <p className="invitationHasReponse">Student je odgovorio na poruku s odgovorom: {invitation.studentResponse}</p>
                <p className="invitationStudentText">Njegov dodatni komentar: {invitation.studentText}</p>
                <button className="invitation-confirm" onClick={ (e) => handleInvitation(invitation.studentID, "coming", invitation.studentInvitationID, e)}>POTVRDI DOLAZAK</button>
                <button className="invitation-excused" onClick={ (e) => handleInvitation(invitation.studentID, "excused", invitation.studentInvitationID, e)}>ISPRIČAJ</button>
              </>
            }
          </div>
        ) )}
      </div>
    </>
   );
}
 
export default InvitationsList;