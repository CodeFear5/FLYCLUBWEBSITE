// ProtectedSchedule.js
import React from "react";
import withAuth from "./withAuth";



import Header from "../Header";

const ProtectedSchedule = () => {
  return(
    <div>
      
    <Header/>
    </div>
   



  )
};

export default withAuth(ProtectedSchedule);
