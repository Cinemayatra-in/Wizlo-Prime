import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Wizlo. Learn Spanish Daily.</p>
        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
          <Link to="/privacy" className="hover:text-wizlo-600 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-wizlo-600 transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-wizlo-600 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};