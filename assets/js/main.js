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

const main = document.getElementById("main-screen");
const mainHeight = document.getElementById("main-height");
const mainWidth = document.getElementById("main-width");

mainHeight.value = main.clientHeight;
mainWidth.value = main.clientWidth;

const form = document.querySelector("form");
