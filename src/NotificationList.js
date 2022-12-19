import axios from "axios";

const NotificationList = ({notifications, title, roleOfViewer}) => {

  const deleteNotification = (notificationID, e) => {
    axios.delete("http://localhost:8080/stuslu/deletenotif/"+notificationID)
    .then( (res) => {
    } )
    .catch( (err) => {
      console.log(err);
    } )
    window.location.reload(false);
  }


  return ( 
    <div className="notification-list">
      <h2 className="notification-title">{title}</h2>
    {notifications.map((notification) => (
      <div className="notification" key={notification.notificationID}>
        <h2 className="notificationTitle">Title: {notification.title}</h2>
        <p className="notificationMessage">Message: {notification.messageBody}</p>
        <p className="notificationAuthor">Autor: {notification.messageAuthor}</p>
        {roleOfViewer === "stu-slu-member" ?
          <button className="deletePerson" onClick={ (e) => deleteNotification(notification.notificationID, e)}>DELETE</button>
        :
        <></>
        }
      </div>
  ))}
  </div>
   );
}
 
export default NotificationList;