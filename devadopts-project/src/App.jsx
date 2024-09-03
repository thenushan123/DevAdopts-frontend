import "./App.css";
import {
  RegisterPage,
  NotFoundPage,
  LoginPage,
  HomePage,
  LandingPage,
  DogsDisplay,
  DogDetailsPage,
  AboutPage,
  DonatePage,
  UserProfilePage,
} from "./pages";
import { PageWrapper } from "./components";
import { UserProvider } from "./contexts/UserContext";
import { DogsProvider } from "./contexts/DogsContext";
import { Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function App() {
  return (
    <UserProvider>
      <DogsProvider>
        <Routes>
          <Route path="/" element={<PageWrapper />}>
            <Route index element={<LandingPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/DogsDisplay">
              <Route index element={<DogsDisplay />} />
              <Route path=":id" element={<DogDetailsPage />} />
            </Route>
            <Route path="/AboutUs" element={<AboutPage />} />
            <Route path="/Donate" element={<DonatePage />} />
            <Route path="/UserProfile" element={<UserProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </DogsProvider>
    </UserProvider>
  );
}

export default App;
