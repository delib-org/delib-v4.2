import React from "react";
import { Outlet } from "react-router-dom";

//components
import ConsultationAdminTabs from "./ConsultationAdminTabs";

const ConsultationAdmin = () => {
  return (
    <div>
      <h1>ניהול הקבוצה</h1>
      <ConsultationAdminTabs />
      <Outlet />
    </div>
  );
};

export default ConsultationAdmin;
