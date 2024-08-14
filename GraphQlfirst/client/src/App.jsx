import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Chat } from "./Components/pages/Chat/Chat";
import Home from "./Components/pages/Home/Home";
import Footer from "./Components/pages/Footer/Footer";

export default function App() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(uuid());
  const [startChat, setStartChat] = useState(false);

  if (startChat) {
    return <Chat userName={userName} userId={userId} />;
  }
  return (
    <>
      <Home
        userName={userName}
        setUserName={setUserName}
        setStartChat={setStartChat}
        userId={userId}
      />
      <Footer />
    </>
  );
}
