import MessageBox from './MessageBox';
import Messages from './Messages';

const ChatContainer = () => {
  return (
    <div className="rounded-lg h-[calc(100vh-130px)] relative overflow-y-scroll">
      <Messages />
      <MessageBox />
    </div>
  );
};

export default ChatContainer;
