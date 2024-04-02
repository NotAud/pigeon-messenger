const { useWebsocket } = require("../util/useWebsocket");
const { getChatrooms, createChatroom } = require("../api/chatrooms.api");

const websocket = useWebsocket();
const CHATROOMS = new Set();

function useChatroomStore() {
  async function init() {
    try {
      const chatrooms = await getChatrooms();
      chatrooms.forEach((chatroom) => {
        CHATROOMS.add(chatroom);
      });
    } catch (err) {
      throw err;
    }
  }

  async function create(token, data) {
    try {
      const chatroomData = await createChatroom(token, data);

      CHATROOMS.add(chatroomData);
      update();

      return chatroomData;
    } catch (err) {
      throw err;
    }
  }

  async function update() {
    websocket.send("chatrooms", {
      type: "chatroom",
      action: "new-chatroom",
      data: Array.from(CHATROOMS),
    });
  }

  return { init, create };
}

module.exports = { useChatroomStore };
