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

initializeApp(config.firebaseConfig)

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<AuthRoute><RoutesApp /></AuthRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
