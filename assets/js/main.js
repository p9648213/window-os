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
    contextMenu.classList.add(
      "w-50",
      "h-50",
      "p-2",
      "flex",
      "flex-col",
      "g-3",
      "rounded-md",
      "bg-white",
      "absolute"
    );
    contextMenu.style.left = `${event.x}px`;
    contextMenu.style.top = `${event.y}px`;

    for (const itemText of CONTEXT_SCREEN_MENU) {
      let menuItems = document.createElement("form");
      let id = itemText.replace(/\s/g, "").toLowerCase();
      let itemsType = "txt";

      if (itemText === "Create folder") {
        itemsType = "folder";
      }

      menuItems.textContent = itemText;
      menuItems.style.cursor = "pointer";
      menuItems.setAttribute("id", id);

      let input_token = document.createElement("input");
      input_token.setAttribute("type", "hidden");
      input_token.setAttribute("name", "authenticity_token");
      input_token.setAttribute("value", authorization_token);

      menuItems.appendChild(input_token);

      if (itemsType === "txt") {
        menuItems.addEventListener("mouseup", () => {
          let targetId = checkEmptySpace();
          if (targetId) {
            htmx.ajax("POST", `/create-txt`, {
              target: `#${targetId}`,
              source: `#${id}`,
            });
          }
        });
      } else if (itemsType === "folder") {
        menuItems.addEventListener("mouseup", () => {
          let targetId = checkEmptySpace();
          if (targetId) {
            htmx.ajax("POST", `/create-folder`, {
              target: `#${targetId}`,
              source: `#${id}`,
            });
          }
        });
      }

      contextMenu.appendChild(menuItems);
    }

    document.body.appendChild(contextMenu);
  });
}

function checkEmptySpace() {
  const totalRows = document.getElementById("screen-rows")?.value;
  const totalCols = document.getElementById("screen-cols")?.value;

  if (totalRows && totalCols) {
    for (let i = 0; i < totalCols; i++) {
      for (let j = 0; j < totalRows; j++) {
        const item = document.getElementById(`item-${j}-${i}`);
        if (item && item.innerHTML == "") {
          return `item-${j}-${i}`;
        }
      }
    }
  } else {
    return null;
  }
}
