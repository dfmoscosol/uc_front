import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//STYLES
import "./App.scss";

// app router
import RoutesApp from "./routes/routes";

// pages
import LoginPage from "./pages/login/LoginPage";

//firebase
import { initializeApp } from "firebase/app";
import { config } from "./services/firebase/config";
import AuthRoute from "./shared/auth/AuthRoute";
import Error404 from "./pages/errors/error404.page";
import Error401 from "./pages/errors/error401.page";

initializeApp(config.firebaseConfig)

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path='/404' element={<Error404 />} />
      <Route path='/401' element={<Error401 />} />
      <Route path="/*" element={<AuthRoute><RoutesApp /></AuthRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
