const WEBSOCKETS = {};

function useWebsocket() {
  function save(name, ws) {
    WEBSOCKETS[name] = ws;
  }

  function send(name, data) {
    if (!WEBSOCKETS[name]) {
      throw new Error("Websocket not found: " + name);
    }

    WEBSOCKETS[name].send(JSON.stringify(data));
  }

  return { WEBSOCKETS, save, send };
}

module.exports = { useWebsocket };
