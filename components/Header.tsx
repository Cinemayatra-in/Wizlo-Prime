import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Flame, Trophy, Languages } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { progress, currentLevel } = useUser();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Daily', path: '/daily' },
    { name: 'Games', path: '/games' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Audio', path: '/audio' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive
        ? 'bg-wizlo-600 text-white'
        : 'text-gray-700 hover:bg-wizlo-100 hover:text-wizlo-700'
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-wizlo-600 p-2 rounded-lg">
                 <Languages className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">Wizlo</span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-wizlo-600 font-bold' : 'text-gray-500 hover:text-wizlo-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* User Stats (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
              <Flame className="h-4 w-4 mr-1" fill="currentColor" />
              <span className="font-bold text-sm">{progress.streak}</span>
            </div>
            <div className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
              <Trophy className="h-4 w-4 mr-1" />
              <span className="font-bold text-sm">Lvl {currentLevel}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
             <div className="flex items-center text-orange-500">
                <Flame className="h-5 w-5" fill="currentColor" />
                <span className="font-bold text-xs ml-1">{progress.streak}</span>
             </div>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={linkClass}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};