import React from "react";
import imgC from "../../assets/img C.svg";
import imgX from "../../assets/img X.svg";
import Chat from "./Chat";

function EmailChat({ onClose }) {
    const [email, setEmail] = React.useState("");
    const [modal, setModal] = React.useState(false);
  const handleSubmit =  () => {
    if(email){
        setModal(true);
    }
}
  return (
    <>
    <div className="fixed inset-0 z-50 flex justify-end items-start">
      {/* Black background overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      {/* LiveChat Modal */}
      <div className="relative w-[400px] lg:w-[500px] md:w-[400px] h-auto rounded-lg overflow-hidden bg-white shadow-xl m-10">
        {/* Header Section */}
        <div className="w-full h-[185px] bg-div">
          <div className="p-4 flex justify-between">
            <img src={imgC} alt="Chat Logo" />
            <img
              onClick={onClose} // Close the modal on click
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
          </div>
        </div>
        <div>
            <input type="email" placeholder="Email" className="w-full p-2 border-2 border-gray-300 rounded-lg my-2" onChange={(e)=>{setEmail(e.target.value)}} />
            <button className="w-full p-2 bg-[#0D082C] text-white rounded-lg" onClick={handleSubmit}>Submit</button>
        </div>
</div>

</div>
{modal && <Chat email={email} onClose={onClose} />}
     </>  
  );
}

export default EmailChat;
