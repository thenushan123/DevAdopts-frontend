import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import { Logout, PageWrapper, ProtectedRoute } from "./components";
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
            <Route path="/Login" element={<LoginPage />}/>
            <Route path="/AboutUs" element={<AboutPage />} />
            <Route path="/Donate" element={<DonatePage />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/Logout" element={<ProtectedRoute redirectTo="/login" />}>
              <Route index element={<Logout />}/>
            </Route>
            <Route path="/DogsDisplay" element={<ProtectedRoute redirectTo="/login" />}>
              <Route index element={<DogsDisplay />} />
              <Route path=":id" element={<DogDetailsPage />} />
            </Route>
            <Route path="/Home" element={<ProtectedRoute redirectTo="/login" />}>
              <Route index element={<HomePage />}/>
            </Route>
            <Route path="/UserProfile" element={<ProtectedRoute redirectTo="/login" />}>
              <Route index element={<UserProfilePage />}/>
            </Route>
          </Route>
        </Routes>
      </DogsProvider>
    </UserProvider>
  );
}

export default App;
