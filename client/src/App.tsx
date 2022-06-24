import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Decision from "./view/pages/Decison";
import Main from "./view/pages/Main";
import Decisions from "./view/pages/Consultations";
import Home from "./view/pages/Home";

//style
import './view/styles/app.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consultations" element={<Main />}>
          <Route index element={<Decisions />} />
          <Route path=":consultationId" element={<Decision />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
