import React from 'react';
import { FiPlus, FiMessageSquare, FiMoon, FiSun } from 'react-icons/fi';
import { Button } from './ui/button';
import { useTheme } from '../context/ThemeContext';

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const chatHistory = [
    { id: '1', title: 'Previous Chat 1' },
    { id: '2', title: 'Previous Chat 2' },
    { id: '3', title: 'Previous Chat 3' },
  ];

  return (
    <nav className={`w-64 h-screen flex flex-col bg-light-secondary-background dark:bg-dark-secondary-background text-light-foreground dark:text-dark-foreground fixed left-0 top-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <Button className="w-full justify-start bg-light-accent dark:bg-dark-accent text-white hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover">
          <FiPlus className="mr-2" /> New Chat
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {chatHistory.map((chat) => (
          <div key={chat.id} className="flex items-center p-3 hover:bg-light-border dark:hover:bg-dark-border cursor-pointer">
            <FiMessageSquare className="mr-2" />
            <span className="text-sm truncate">{chat.title}</span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-light-border dark:border-dark-border">
        <Button onClick={toggleDarkMode} className="w-full justify-start bg-transparent hover:bg-light-border dark:hover:bg-dark-border">
          {isDarkMode ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;