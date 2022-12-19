import { Link } from "react-router-dom";

const StudentPosterStatus = ({studentPosterRequest, id}) => {

  const pathToResendPosterRequest = "/resendposterrequest/" + id;

  return ( 

      <div className="student-poster-status-data">

        <div className="last-edited-by">
          {studentPosterRequest.lastEditedBy === 0 ? 

          <>
            <p>Vaš ste zahtjev za posterom zadnje uredili Vi!</p>
            <p>Redovito provjeravajte ovu stranicu kako biste vidjeli kad Vam je voditelj izložbe odgovorio.</p>
          </>
          :

          <>
            <div className="manager-edited">
              <p className="manager-responded">Vaš je zahtjev za posterom zadnje uredio voditelj izložbe! Ažurirajte svoj poster i ponovno pošaljite zahtjev za prihvaćanjem postera <Link to = {pathToResendPosterRequest}>OVDJE</Link></p> 
            </div>

            <div className="manager-comment">
              {studentPosterRequest.managerComment ? 
                <div className="manager-comment-area">
                  <p>Voditelj izložbe ostavio je sljedeću povratnu informaciju:</p>
                  <p>{studentPosterRequest.managerComment}</p>
                </div> 
              :
                <p>Voditelj izložbe nije ostavio nikakav komentar</p>
              }
            </div>
            <p>Bili ste zatraženi promijeniti svoj poster: {studentPosterRequest.numOfChange} puta</p>
            </>
            }
          


        
        </div>
      </div>
   );
}
 
export default StudentPosterStatus;