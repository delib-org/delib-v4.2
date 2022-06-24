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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
