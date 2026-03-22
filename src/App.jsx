import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Guide from './pages/Guide';

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-slate-900 text-slate-50 font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full relative">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Guide />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
