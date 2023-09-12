import "./index.css"

const Notification = ({ message, type }) => {

  if (message === null) {
    return null;
  }
  if (type === "error") {
    console.log("error")
    return <div className="error">{message}</div>;
  }
  console.log("notification")
  return <div className="notification">{message}</div>;
}; 

export default Notification;