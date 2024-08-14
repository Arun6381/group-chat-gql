import { useEffect, useRef } from "react";

const Messages = ({ messages, uId, user }) => {
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="text-center text-gray-500">No messages available.</div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-150px)] space-y-4">
      {messages.map(({ id, userId, user: messageUser, content, fileUrl }) => (
        <div
          key={id}
          className={`flex items-start ${
            messageUser === user ? "justify-end" : "justify-start"
          }`}
        >
          {userId !== uId && (
            <div className="flex items-center justify-center bg-gray-500 text-white rounded-full w-10 h-10 mr-3">
              {messageUser.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div
            className={`max-w-[70%] ${
              userId === uId
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } p-4 rounded-lg`}
          >
            <h5 className="font-bold">{messageUser}</h5>
            {fileUrl && (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={fileUrl}
                  alt="Uploaded File"
                  className="max-w-full mt-2"
                />
              </a>
            )}
            <p className="mt-2 break-words">{content}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
