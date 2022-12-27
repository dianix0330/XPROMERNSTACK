import React from "react";

export default ({ data }) => {
  return (
    <div className="container">
      <p>User Name: {data.username}</p>
      <p>First Name: {data.firstname}</p>
      <p>Last Name: {data.lastname}</p>
      <p>Address: {data.address}</p>
      <p>Phone: {data.phone}</p>
    </div>
  );
};
