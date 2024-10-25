import CreatePopUp from "./components/PopUp/CreatePopUp";
import HomePage from "./pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import PlayingPage from "./pages/Game/PlayingPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/test/' element={<PlayingPage/>}></Route>
      <Route path='*' element={<HomePage/>}></Route>
    </Routes>
  )
}

export default App
