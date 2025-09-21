import React,{useCallback,useEffect} from "react";
import imgC from "../../../assets/img C.svg";
import imgX from "../../../assets/img X.svg";
import { getDatabase, ref, onValue } from "firebase/database";
import Chat from "./Chat";

function LiveChatAdmin({ onClose }) {
  const [usersWithLastMessage, setUsersWithLastMessage] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null); 

  const getAllUsersWithLastMessage = useCallback((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const usersWithLastMessage = Object.keys(data).map(userKey => {
        const userMessages = data[userKey];

        let lastMessage = null;
        let lastTimestamp = null;

        Object.keys(userMessages).forEach(messageKey => {
          const messageData = userMessages[messageKey];
          const messageTimestamp = new Date(messageData.timestamp);

          if (!lastTimestamp || messageTimestamp > lastTimestamp) {
            lastMessage = messageData.message;
            lastTimestamp = messageTimestamp;
          }
        });

        return {
          user: userKey,
          lastMessage: lastMessage || "No messages",
          lastTimestamp: lastTimestamp ? lastTimestamp.toISOString() : "No timestamp",
        };
      });

      console.log("Users with Last Message:", usersWithLastMessage);
      setUsersWithLastMessage(usersWithLastMessage);
    } else {
      console.log("No data available");
    }
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      getAllUsersWithLastMessage(snapshot);
    }, {
      onlyOnce: false, // For real-time updates
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [getAllUsersWithLastMessage]);



  const openUserMessages = (user) => {
    setSelectedUser(user); 
  };

  const closeUserMessages = () => {
    setSelectedUser(null); 
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="relative w-[400px] lg:w-[500px] md:w-[400px] h-auto rounded-lg overflow-hidden bg-white shadow-xl m-10">
        <div className="w-full h-[205px] bg-div">
          <div className="p-4 flex justify-between">
            <img src={imgC} alt="Chat Logo" />
            <img
              onClick={onClose} 
              src={imgX}
              alt="Close"
              className="cursor-pointer"
            />
          </div>
          <div className="mx-8">
            <h1 className="font-bold text-3xl text-white">Live Chat</h1>
            <p className="text-white my-2">
              Seamless, natural communication and connection.
            </p>
            <h1 className="font-bold text-2xl text-white">All Conversations</h1>
          </div>
        </div>

        <div className="bg-[#0D082C]">
          <div className="h-[450px] overflow-y-auto mt-2">
            {usersWithLastMessage.length > 0 ? (
              usersWithLastMessage.map((chat, index) => (
                <div key={index} className="p-2 cursor-pointer" onClick={() => {openUserMessages(chat.user)}}>
                  <div className="text-white font-bold">{chat.user}</div>
                  <div className="text-white">{chat.lastMessage}</div>
                  <hr className="my-2 border-gray-600" />
                </div>
              ))
            ) : (
              <div className="text-white text-center p-4">No conversations available</div>
            )}
          </div>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <Chat user={selectedUser} onClose={closeUserMessages} />
        </div>
      )}
    </div>
  );
}

export default LiveChatAdmin;
