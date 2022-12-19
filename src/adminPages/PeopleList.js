import axios from "axios"

const PeopleList = ( {dataList, role, description} ) => {


  const triggerDelete = (id, event) => {
    if(role ==="student") {
      axios.delete("http://localhost:8080/student/delete/"+id)
      .then( (res) => {

      } )
      .catch( (err) => {
        console.log(err);
      })
    }

    if(role ==="stu-slu-member") {
      axios.delete("http://localhost:8080/stuslu/delete/"+id)
      .then( (res) => {

      } )
      .catch( (err) => {
        console.log(err);
      })
    }

    if(role === "exhibition-manager") {
      axios.delete("http://localhost:8080/exhmanager/delete/"+id)
      .then( (res) => {

      } )
      .catch( (err) => {
        console.log(err);
      })
    }

    window.location.reload(false);
  }

  return ( 
    <div className="people-list">
      <h2 className="description">{description}</h2>
      {
        dataList.map( (personInstance) => (
          <div className="person" key={personInstance.studentID || personInstance.stusluMemberID || personInstance.exhibitionManagerID}>
            <p className="personName">IME: {personInstance.name}</p>
            <p className="personSurname">PREZIME: {personInstance.surname}</p>
            <p className="personUsername">KORISNIČKO IME: {personInstance.username}</p>
            {role === "student" ? 
              <p className="personJmbag">JMBAG: {personInstance.jmbag}</p>
            :
              <></>
            }
            <button className="deletePerson" onClick={ (e) => triggerDelete(personInstance.studentID || personInstance.stusluMemberID || personInstance.exhibitionManagerID, e)}>DELETE</button>
          </div>
         ) )
      }
    </div>
   );
}
 
export default PeopleList;