import React, { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getChatResponse } from '../services/dify';

interface Message {
  text: string;
  isAI: boolean;
  isLoading?: boolean;
  timestamp?: string;
  avatarUrl?: string;
}

interface ChatComponentProps {
  onNewConversation: (conversationId: string) => void;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", isAI: true, timestamp: new Date().toLocaleTimeString(), avatarUrl: "/src/assets/images/robot.png" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const timestamp = new Date().toLocaleTimeString();
      setMessages(prev => [
        ...prev, 
        { text: input, isAI: false, timestamp, avatarUrl: "/src/assets/images/user.png" }, 
        { text: '', isAI: true, isLoading: true, avatarUrl: "/src/assets/images/robot.png" }
      ]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await getChatResponse(input);
        setMessages(prev => [
          ...prev.filter(msg => !msg.isLoading),
          { text: response, isAI: true, timestamp: new Date().toLocaleTimeString(), avatarUrl: "/src/assets/images/robot.png" }
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages(prev => [
          ...prev.filter(msg => !msg.isLoading),
          { text: "Sorry, I couldn't process your request. Please try again.", isAI: true, timestamp: new Date().toLocaleTimeString(), avatarUrl: "/src/assets/images/robot.png" }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-light-background to-light-secondary-background dark:from-dark-background dark:to-dark-secondary-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isAI ? 'justify-start' : 'justify-end'} animate-fade-in`}>
            <div className="flex items-start space-x-2">
              <img src={message.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full" />
              <div className={`max-w-[75%] p-4 rounded-3xl ${
                message.isAI 
                  ? 'bg-light-secondary-background dark:bg-dark-secondary-background' 
                  : 'bg-gradient-to-r from-light-accent to-light-accent-hover dark:from-dark-accent dark:to-dark-accent-hover text-white'
              } shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out`}>
                {message.isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-light-secondary-background dark:bg-dark-secondary-background border-t border-light-border dark:border-dark-border">
        <div className="flex items-center bg-light-background dark:bg-dark-background rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-transparent border-none focus:ring-0 rounded-l-full px-4 py-2 text-sm"
              disabled={isLoading}
            />
            <div className="absolute bottom-0 left-0 h-0.5 bg-light-accent dark:bg-dark-accent transition-all duration-300 focus-within:w-full w-0"></div>
          </div>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-light-accent to-light-accent-hover dark:from-dark-accent dark:to-dark-accent-hover text-white rounded-full p-0 m-1 w-8 h-8 flex items-center justify-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
            disabled={isLoading}
          >
            <FiSend size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ChatComponent;