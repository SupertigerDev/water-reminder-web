const {BrowserWindow, app} = require("electron");


app.whenReady().then(() => {
  const win = new BrowserWindow();

  win.loadFile("./index.html")
})