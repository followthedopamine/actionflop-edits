// ==/UserScript==

(function () {
  "use strict";

  console.log("ActionFlop edits loaded");

  WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
    apply: function (target, scope, args) {
      if (typeof args[0] === "string") {
        let json = JSON.parse(args[0]);
        console.log(json);
      }
      let data = target.apply(scope, args);
      return data;
    },
  });

  const sockets = [];
  const nativeWebSocket = window.WebSocket;
  window.WebSocket = function (...args) {
    const socket = new nativeWebSocket(...args);
    sockets.push(socket);
    return socket;
  };

  setTimeout(() => {
    sockets[0].onmessage = function (msgevent) {
      var msg = JSON.parse(msgevent.data);
      getPlayerMessages(msg);
    };
  }, 1000);

  function getPlayerMessages(msg) {
    msg.PlayState.users.forEach((user) => {
      if (user.username == "jolly-panda-42376") {
        console.log(msg.PlayState);
        drawTable(msg.PlayState);
      }
    });
  }

  function resetTable() {
    const main = document.getElementsByTagName("main")[0];
    const table =
      main.children[0].children[0].children[0].children[0].children[0]
        .children[0];
    table.innerHTML = "";
    return table;
  }

  function drawTable(PlayState) {
    const table = resetTable();
    table.style.backgroundImage = "images/table.jpg";
    table.style.minHeight = "500px";
  }
})();
