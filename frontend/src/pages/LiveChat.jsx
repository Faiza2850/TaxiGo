import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import EmailChat from "../components/LiveChat/EmailChat";
import LiveChatAdmin from "../pages/Admin/LiveChat/LiveChatAdmin";
function LiveChatPage() {

  const location = useLocation(); 
  const isAdminPage = location.pathname === '/admin/add-fleet' || location.pathname === '/admin/add-fleet/';
  
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div>
      {isChatOpen && (
        !isAdminPage ? <EmailChat onClose={handleCloseChat} /> : <LiveChatAdmin onClose={handleCloseChat} />
      )}
    </div>
  );
}

export default LiveChatPage;