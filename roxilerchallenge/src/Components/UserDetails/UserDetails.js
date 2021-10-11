import React, { useState, useEffect } from "react";
import axios from "axios";
import "../UserDetails/UserDetails.css";

function UserDetails(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${props.id}`)
      .then((response) => {
        console.log(response.data)
        setUser(response.data);
        
      })
      .catch((err) => {
        setUser('')
        console.log(err);
      });
  }, [props]);

  return (
    <div className="user-details">
      <ul>
        <li>ToDo ID: {props.id}</li>
        <li>ToDo Title: {props.title} </li>
       {user? 
        <div>
        <li>User ID: {user.id}</li> 
        <li>Name: {user.username}</li>
        <li>Email: {user.email}</li>
        </div> : ''
       } 
      </ul>
    </div>
  );
}

export default UserDetails;
