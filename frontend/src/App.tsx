import CreatePopUp from './components/PopUp/CreatePopUp'
import HomePage from './pages/Home/HomePage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<HomePage/>}></Route> */}
      <Route path='/' element={<CreatePopUp/>}></Route>
    </Routes>
  )
}

export default App
