import chatImag from "../../../assets/cute.avif";
import message from "../../../assets/message.webp";

export default function Home({ userName, setUserName, setStartChat, userId }) {
  const startChat = () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }
    const data = {
      userName,
      userId,
    };
    sessionStorage.setItem("user", JSON.stringify(data));
    setStartChat(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <nav className="absolute top-0 left-0 w-auto text-gray-800 py-4 px-6">
        <h3 className="text-3xl font-extrabold">EliChat</h3>
      </nav>

      <div className="flex flex-col md:flex-row gap-5 mt-8 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden animate-slide-up">
        <div className="flex-1 p-6">
          <h3 className="text-xl font-bold mb-4">Eli Community</h3>
          <p className="text-gray-700 mb-6">
            Welcome to EliChat! Please enter your name to start chatting.
          </p>
          <div className="flex flex-col md:flex-row items-center">
            <input
              type="text"
              value={userName}
              placeholder="Enter your name"
              onChange={(e) => setUserName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-4 md:mb-0 md:mr-4 w-full md:w-64"
            />
            <button
              onClick={startChat}
              className="bg-blue-600 text-white rounded-lg p-2 flex items-center justify-center"
            >
              <img src={message} alt="Start" className="w-6 h-6" />
            </button>
          </div>
        </div>
        <button
          onClick={startChat}
          className="flex items-center justify-center w-full md:w-[400px] md:h-[400px]"
        >
          <img src={chatImag} alt="" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
}
