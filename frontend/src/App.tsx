import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import ChatComponent from './components/ChatComponent';
import SplashScreen from './components/SplashScreen';
import { FiMenu } from 'react-icons/fi';
import { Button } from './components/ui/button';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
  };

  if (!userName) {
    return <SplashScreen onNameSubmit={handleNameSubmit} />;
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground transition-colors duration-300">
        <NavBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className={`flex-grow flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <header className="p-4 bg-light-secondary-background dark:bg-dark-secondary-background border-b border-light-border dark:border-dark-border flex items-center">
            <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-2 text-light-foreground dark:text-dark-foreground bg-transparent hover:bg-light-border dark:hover:bg-dark-border rounded-full p-2">
              <FiMenu size={24} />
            </Button>
            <h1 className="text-xl font-bold">ChatGPT Clone</h1>
          </header>
          <ChatComponent />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;