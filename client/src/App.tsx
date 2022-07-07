import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Main from "./view/pages/Main";

import Consultations from "./view/pages/consultations/Consultations";
import Consultation from "./view/pages/consultations/Consultation";
import NewConsultation from "./view/pages/consultations/NewConsultation";

import Home from "./view/pages/Home";
import NotFound from "./view/pages/NotFound";


//style
import "./view/styles/app.scss";
import ConsultationAsk from "./view/pages/consultations/ConsultationAsk/ConsultationAsk";
import ConsultationDontExist from "./view/pages/consultations/ConsultationDontExist";
import ConsultationAdmin from "./view/pages/consultations/consultationAdmin/ConsultationAdmin";
import ConsultationAdminMembers from "./view/pages/consultations/consultationAdmin/ConsultationAdminMembers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/consultations" element={<Main />}>
          <Route index element={<Consultations />} />
          <Route path=":consultationId" element={<Consultation />} />
          <Route path="new-consultation" element={<NewConsultation />} />
          <Route path='consultation-not' element={<ConsultationDontExist/>}/>
          <Route path='admin/:consultationId' element={<ConsultationAdmin />}>
            <Route index element={<NewConsultation />} />
            <Route path='members' element={<ConsultationAdminMembers />}/>
          </Route>
        </Route>
        <Route path='/consultation-ask/:consultationId' element={<ConsultationAsk />} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
