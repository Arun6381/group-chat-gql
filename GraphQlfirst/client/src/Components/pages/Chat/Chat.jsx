import { useState } from "react";
import { useMutation, gql, useSubscription } from "@apollo/client";

import Messages from "../Messages/Message";
import Button from "../../Button";

const POST_MESSAGE = gql`
  mutation($userId: String!, $user: String!, $content: String!) {
    postMessage(userId: $userId, user: $user, content: $content)
  }
`;

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      content
    }
  }
`;

export const Chat = ({ userName, userId }) => {
  const [messages, setMessages] = useState({
    userId: userId,
    user: userName,
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGE);
  const { data } = useSubscription(GET_MESSAGES);

  const onSend = async () => {
    if (messages.content.trim().length > 0) {
      try {
        await postMessage({
          variables: {
            userId: messages.userId,
            user: messages.user,
            content: messages.content,
          },
        });

        setMessages({
          ...messages,
          content: "",
        });
      } catch (error) {
        console.error("Error posting message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen flex-1 w-full max-w-full bg-white shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">EliChat</h1>
      </div>

      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto flex flex-col-reverse">
        <Messages messages={data?.messages || []} uId={messages.userId} user />
      </div>

      <div className="p-4 bg-gray-200 border-t border-gray-300">
        <div className="flex items-center gap-5">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Type your message..."
            onChange={(e) =>
              setMessages((prev) => ({ ...prev, content: e.target.value }))
            }
            value={messages.content}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onSend();
              }
            }}
          />
          <Button onClick={onSend} />
        </div>
      </div>
    </div>
  );
};
