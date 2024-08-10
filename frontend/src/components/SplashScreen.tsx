import React, { useState } from 'react';
import { Input } from './ui/input';

interface SplashScreenProps {
  onNameSubmit: (name: string) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name);
      onNameSubmit(name);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-light-background to-light-secondary-background dark:from-dark-background dark:to-dark-secondary-background">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome!</h1>
        <p className="mb-4 text-center">Please enter your name to continue:</p>
        <div className="relative mb-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SplashScreen;