import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/signUpPage"; // or rename file to SignUpPage.jsx
import LogInPage from "./pages/logInPage";   // or rename file to LogInPage.jsx

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      
      <Routes>
        <Route path="/" element={<div className="text-white">Home</div>} /> 
        <Route path="/signUp" element={<SignUpPage />} /> 
        <Route path="/logIn" element={<LogInPage />} />  
      </Routes>
    </div>
  );
}