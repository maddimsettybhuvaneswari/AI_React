import React, { useState, useEffect } from "react";
import API from "../../Services/api";
import Dashboard from "../Dashboard";
const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const storageuserid = localStorage.getItem("userId");
  const [chattingid, setChattingid] = useState("");
  const [conversationdata, setConversationdata] = useState([]);
  const [chatwithid, setChatwithid] = useState([]);

  useEffect(() => {
    getChattingList();
  }, []);
  const getChattingList = async () => {
    const res = await API.post("/api/get_chatting/", {
      user_id: storageuserid,
    });
    setConversationdata(res.data);
    console.log("conversationdata:", conversationdata);
    console.log("Dataa", res);
  };

  const getPreviousChatting = async (id) => {
    try {
      const res = await API.post("/api/get_previouschatting/", {
        conversationId: id, //  use the clicked id
      });
      setConversationId(id);
      console.log("API RESPONSE:", res.data);
      const formattedChat = res.data.map((msg) => ({
        type: msg.sender,
        text: msg.content,
      }));
      setChatwithid(res.data); // optional (raw data)
      setChat(formattedChat);
    } catch (error) {
      console.error(error);
    }
  };
  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { type: "user", text: message };
    console.log("messages");
    setChat((prev) => [...prev, userMsg]);
    try {
      const res = await API.post("/api/chat/", {
        message: message,
        conversation_id: conversationId,
        user_id: storageuserid,
      });
      const botMsg = { type: "bot", text: res.data.reply };
      setChat((prev) => [...prev, botMsg]);
      if (!conversationId) {
        setConversationId(res.data.conversation_id);
      }
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dashboard />
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/6 bg-white border-r p-2">
          <h3 className="font-semibold text-lg mb-3">Search Insights</h3>

          {loading ? (
            <div className="animate-pulse text-gray-500">Fetching data...</div>
          ) : (
            <div className="text-sm text-gray-700">
              <button
                onClick={() => {
                  setChat([]);
                  setConversationId(null);
                }}
                className="mb-2 bg-gray-200 px-3 py-1 rounded"
              >
                + New Chat
              </button>
            </div>
          )}
          <div>
            {conversationdata?.map((doc) => (
              <div key={doc.id} onClick={() => getPreviousChatting(doc.id)}>
                <p
                  style={{
                    cursor: "pointer",
                    borderRadius: "15px",
                    padding: "8px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                  }}
                  className="mb-4 titlehover"
                >
                  {doc.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/4 flex flex-col">
          <div className="p-4 bg-white shadow">
            <h2 className="text-xl font-bold">AI Healthcare Chatbot</h2>
          </div>

          <div className="flex-1 bg-white p-4 overflow-y-auto mb-8">
            {chat.map((msg, i) => (
              <div key={i} className="mb-3">
                <b>{msg.type === "user" ? "You: " : "AI: "}</b>
                {msg.text || msg.response}
              </div>
            ))}
            {/* {chatwithid &&
              formattedChat.map((msg, i) => (
                <div key={i} className="mb-3">
                  <b>{msg.type === "user" ? "You: " : "AI: "}</b>
                  {msg.text || msg.response}{" "}
                </div>
              ))} */}
            {loading && (
              <div className="animate-pulse text-gray-500"> Searching...</div>
            )}
          </div>

          <div className="p-4 bg-white border-t flex searchbox">
            <input
              className="flex-1 border rounded-full px-4 py-2 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your health question..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white px-4 rounded-full"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
