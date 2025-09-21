import { ref, onValue } from "firebase/database";
import { database } from "../firebase"; // Adjust path to your Firebase configuration

const getMessages = (path, callback) => {
  if (typeof callback !== 'function') {
    console.error('Callback is not a function');
    return;
  }

  const messagesRef = ref(database, path);

  onValue(messagesRef, (snapshot) => {
    const messages = [];
    snapshot.forEach((childSnapshot) => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    callback(messages);
  }, (error) => {
    console.error('Error fetching messages:', error);
  });
};

export default getMessages;
