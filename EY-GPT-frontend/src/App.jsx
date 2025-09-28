import { Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Chat from "./pages/Chat";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro/> } />
      <Route path="/chat" element={<Chat/> } />
    </Routes>
  );
}

export default App
