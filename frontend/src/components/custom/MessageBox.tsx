const MessageBox = () => {
  return (
    <div className="absolute bottom-0 w-full">
      <input
        type="text"
        className="h-full w-full p-4 bg-neutral-900 rounded-lg text-neutral-100 focus:outline-none focus:ring-0 "
        placeholder="Type a message..."
      />
    </div>
  );
};

export default MessageBox;
