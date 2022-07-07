import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
    const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event: any) => {
        event.preventDefault();
        navigate(event.target.pathname)
      }}
      {...props}
    />
  );
}

export default function ConsultationAdminTabs() {

  const { consultationId } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab
          label="הגדרות"
          href={`/consultations/admin/${consultationId}`}
        />
        <LinkTab
          label="חברים"
          href={`/consultations/admin/${consultationId}/members`}
        />
      </Tabs>
    </Box>
  );
}
