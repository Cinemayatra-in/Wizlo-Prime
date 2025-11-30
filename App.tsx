import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { DailySentences } from './pages/DailySentences';
import { Games } from './pages/Games';
import { Tasks } from './pages/Tasks';
import { Dashboard } from './pages/Dashboard';
import { AudioPractice } from './pages/AudioPractice';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Contact } from './pages/Contact';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/daily" element={<DailySentences />} />
              <Route path="/games" element={<Games />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/audio" element={<AudioPractice />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;