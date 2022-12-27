import "./App.css";
import { Login, Register, UserList } from "./pages";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/sign-in" element={<Login />} />
            <Route exact path="/sign-up" element={<Register />} />
            <Route exact path="/user-info" element={<UserList />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
