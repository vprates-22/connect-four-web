import CreatePopUp from "./components/PopUp/CreatePopUp";
import HomePage from "./pages/Home/HomePage";
import CreateLobby from "./components/Lobby/CreateLobby";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<HomePage/>}></Route> */}
      <Route path='/' element={<CreateLobby height={6} width={7}/>}></Route>
    </Routes>
  )
}

export default App
