import { Provider } from "react-redux";
import "./App.css";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import OTPVerification from "./components/OTPVerification";
import SignupForm from "./components/SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import PDFViewer from "./components/PDFViwer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="otpverification" element={<OTPVerification />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pdfviwer" element={<PDFViewer />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
