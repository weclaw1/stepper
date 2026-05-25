import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import SurveyPage from './pages/SurveyPage';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'px-4 py-2 border-b-2 transition-colors',
    isActive
      ? 'text-blue-600 font-semibold border-blue-600'
      : 'text-gray-700 border-transparent hover:text-blue-600',
  ].join(' ');

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex gap-4 shadow-sm">
        <NavLink to="/" end className={navLinkClass}>🏠 Strona główna</NavLink>
        <NavLink to="/registration" className={navLinkClass}>📝 Rejestracja</NavLink>
        <NavLink to="/survey" className={navLinkClass}>📊 Ankieta</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/survey" element={<SurveyPage />} />
      </Routes>
    </div>
  );
}