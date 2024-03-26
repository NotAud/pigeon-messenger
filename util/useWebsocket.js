const WEBSOCKETS = {};

function useWebsocket() {
  function save(name, ws) {
    WEBSOCKETS[name] = ws;
  }

  function send(name, data) {
    WEBSOCKETS[name].send(JSON.stringify(data));
  }

  return { WEBSOCKETS, save, send };
}

module.exports = { useWebsocket };
