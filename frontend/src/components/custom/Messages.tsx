import Message from './Message';

const Messages = () => {
  return (
    <div className="flex flex-col justify-end h-[calc(100vh-185px)] gap-2 pb-4">
      {Array.from({ length: 1 }, (_, i) => (
        <Message key={i} />
      ))}
    </div>
  );
};

export default Messages;
