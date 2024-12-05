import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import UsersList from './pages/Home/userList' // O novo componente
import './index.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<UsersList />} /> {/* Nova rota para a lista de usuários */}

    </Routes>
    </BrowserRouter>
  );
}

export default App;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
