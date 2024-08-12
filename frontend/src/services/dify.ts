import axios from 'axios';

const API_KEY = 'app-sKn6LN01spNmFe0FKz1hHjUY';
const API_URL = 'http://10.100.140.232/v1/chat-messages';

export const getChatResponse = async (message: string) => {
  const userName = localStorage.getItem('userName');
  
  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: {},
        query: message,
        response_mode: "blocking",
        conversation_id: "",
        user: userName
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.answer;
  } catch (error) {
    console.error('Error in getChatResponse:', error);
    throw error;
  }
};