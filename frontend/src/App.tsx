import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import GamePage from "./pages/Game/GamePage";
import AboutPage from "./pages/Home/AboutPage";
import WatchRoomPage from "./pages/Join/WatchRoomPage";
import LoungeJoin from "./components/Lounges/JoinLounge";
import CreateRoomPage from "./pages/Join/CreateRoomPage";
import LoginPage from "./pages/Join/LoginPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/create+room/' element={<CreateRoomPage/>}></Route>
      <Route path='/watch+room/' element={<WatchRoomPage/>}></Route>
      <Route path='/about/' element={<AboutPage/>}></Route>
      <Route path='/play/' element={<GamePage/>}></Route>
      <Route path='/join/:roomId' element={<LoungeJoin/>}></Route>
      <Route path='/watch/' element={<GamePage/>}></Route>
      <Route path='/login/' element={<LoginPage/>}></Route>
      <Route path='*' element={<HomePage/>}></Route>
    </Routes>
  )
}

export default App;
