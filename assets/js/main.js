//....................................................
//.HHHH...HHHH..TTTTTTTTTTTMMMMM...MMMMMMMXXXX..XXXX..
//.HHHH...HHHH..TTTTTTTTTTTMMMMM...MMMMMM.XXXX..XXXX..
//.HHHH...HHHH..TTTTTTTTTTTMMMMM...MMMMMM.XXXXXXXXXX..
//.HHHH...HHHH.....TTTT...TMMMMMM.MMMMMMM..XXXXXXXX...
//.HHHH...HHHH.....TTTT...TMMMMMM.MMMMMMM...XXXXXX....
//.HHHHHHHHHHH.....TTTT...TMMMMMM.MMMMMMM...XXXXXX....
//.HHHHHHHHHHH.....TTTT...TMMMMMMMMMMMMMM...XXXXX.....
//.HHHHHHHHHHH.....TTTT...TMMMMMMMMMMMMMM...XXXXXX....
//.HHHH...HHHH.....TTTT...TMMMMMMMMMMMMMM..XXXXXXXX...
//.HHHH...HHHH.....TTTT...TMMM.MMMMM.MMMM..XXXXXXXX...
//.HHHH...HHHH.....TTTT...TMMM.MMMMM.MMMM.XXXX.XXXXX..
//.HHHH...HHHH.....TTTT...TMMM.MMMMM.MMMMMXXXX..XXXX..
//.HHHH...HHHH.....TTTT...TMMM.MMMMM.MMMMMXXX....XXX..
//....................................................
htmx.config.defaultSettleDelay = 0;

window.addEventListener("htmx:historyRestore", (_) => {
  window.location.reload();
});

window.addEventListener("htmx:configRequest", function (evt) {
  if (evt.detail.verb !== "get") {
    evt.detail.headers["X-Csrf-Protection"] = "1";
  }
});

//...................................
//.III..NNNN....NNN..III..TTTTTTTTT..
//.III..NNNN....NNN..III..TTTTTTTTT..
//.III..NNNNN...NNN..III..TTTTTTTTT..
//.III..NNNNN...NNN..III......TTT....
//.III..NNNNNN..NNN..III......TTT....
//.III..NNNNNNN.NNN..III......TTT....
//.III..NNN.NNN.NNN..III......TTT....
//.III..NNN.NNNNNNN..III......TTT....
//.III..NNN..NNNNNN..III......TTT....
//.III..NNN..NNNNNN..III......TTT....
//.III..NNN...NNNNN..III......TTT....
//.III..NNN....NNNN..III......TTT....
//.III..NNN....NNNN..III......TTT....
//...................................

const CONTEXT_SCREEN_MENU = ["Create document", "Create folder"];

const main = document.getElementById("main-screen");
const mainHeight = document.getElementById("main-height");
const mainWidth = document.getElementById("main-width");

mainHeight.value = main.clientHeight;
mainWidth.value = main.clientWidth;

export function setupRightClickContextMenu() {
  document.addEventListener("mouseup", (event) => {
    let contextMenuEl = document.getElementById("context-menu");

    if (contextMenuEl && !event.target.contains(contextMenuEl)) {
      switch (event.button) {
        case 0:
          document.body.removeChild(contextMenuEl);
          break;
        default:
          break;
      }
    }
  });

  main.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    let contextMenuEl = document.getElementById("context-menu");
    let authorization_token =
      document.getElementById("authenticity_token")?.value;

    if (contextMenuEl) {
      document.body.removeChild(contextMenuEl);
    }

    let contextMenu = document.createElement("div");

    contextMenu.setAttribute("id", "context-menu");
    contextMenu.style.width = "200px";
    contextMenu.style.height = "200px";
    contextMenu.style.padding = "6px";
    contextMenu.style.display = "flex";
    contextMenu.style.flexDirection = "column";
    contextMenu.style.gap = "8px";
    contextMenu.style.borderRadius = "4px";
    contextMenu.style.background = "white";
    contextMenu.style.position = "absolute";
    contextMenu.style.left = `${event.x}px`;
    contextMenu.style.top = `${event.y}px`;

    for (const itemText of CONTEXT_SCREEN_MENU) {
      let menuItems = document.createElement("form");
      let id = itemText.replace(/\s/g, "").toLowerCase();

      menuItems.textContent = itemText;
      menuItems.style.cursor = "pointer";
      menuItems.setAttribute("id", id);

      let input_token = document.createElement("input");
      input_token.setAttribute("type", "hidden");
      input_token.setAttribute("name", "authenticity_token");
      input_token.setAttribute("value", authorization_token);

      menuItems.appendChild(input_token);

      menuItems.addEventListener("mouseup", () => {
        htmx.ajax("POST", "/create-txt", {
          target: "#item-0-0",
          source: `#${id}`,
        });
      });

      contextMenu.appendChild(menuItems);
    }

    document.body.appendChild(contextMenu);
  });
}
