const { useWebsocket } = require("../util/useWebsocket");
const { getChatrooms, createChatroom } = require("../api/chatrooms.routes");

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

  async function create({ name, owner_id }) {
    try {
      const chatroomData = await createChatroom({ name, owner_id });

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
