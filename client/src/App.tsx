import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Room from "./view/pages/Room";
import Main from "./view/pages/Main";
import Rooms from "./view/pages/Rooms";

import {sayHelloTo} from 'test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Rooms />} />
          <Route path=":roomId" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
