import './App.css'
import { RegisterPage, NotFoundPage, LoginPage} from './pages';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />}/>
      <Route path="/Login" element={<LoginPage />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
