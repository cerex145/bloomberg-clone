import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import StockDetail from './pages/StockDetail';
import Portfolio from './pages/Portfolio';
import Screener from './pages/Screener';
import News from './pages/News';
import EconomicCalendar from './pages/EconomicCalendar';
import Crypto from './pages/Crypto';
import CommandBar from './components/terminal/CommandBar';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/markets" element={<ProtectedRoute><Markets /></ProtectedRoute>} />
                        <Route path="/stock/:ticker" element={<ProtectedRoute><StockDetail /></ProtectedRoute>} />
                        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
                        <Route path="/screener" element={<ProtectedRoute><Screener /></ProtectedRoute>} />
                        <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
                        <Route path="/calendar" element={<ProtectedRoute><EconomicCalendar /></ProtectedRoute>} />
                        <Route path="/crypto" element={<ProtectedRoute><Crypto /></ProtectedRoute>} />
                    </Routes>
                    <CommandBar />
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
