import './App.css'
import { RegisterPage, NotFoundPage, LoginPage, HomePage, LandingPage} from './pages';
import { PageWrapper } from './components';
import { UserProvider } from './contexts/userContext';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<LandingPage />}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route path="/Login" element={<LoginPage />}/>
          <Route path="/Home" element={<HomePage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
