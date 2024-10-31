import HomePage from "./pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import PlayingPage from "./pages/Game/PlayingPage";
import LoungeJoin from "./components/Lounges/LoungeJoin";

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/play/' element={<PlayingPage/>}></Route>
      <Route path='/join/:roomId' element={<LoungeJoin/>}></Route>
      <Route path='/create/' element={<HomePage/>}></Route>
      <Route path='/watch/' element={<PlayingPage/>}></Route>
      <Route path='*' element={<HomePage/>}></Route>
    </Routes>
  )
}

export default App
