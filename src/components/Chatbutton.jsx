import { useNavigate } from 'react-router-dom';

const ChatButton = ({ roomId }) => {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/chat/${roomId}`);
  };

  return <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleChat}>Chat</button>;
};

export default ChatButton;
