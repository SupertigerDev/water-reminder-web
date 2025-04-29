const { BrowserWindow, app, Menu, Tray } = require("electron");
const path = require("path");

app.whenReady().then(() => {
  const tray = new Tray(path.join(__dirname,'icon.png'))

  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: function () {
        win.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);
  tray.on("click", () => {
    win.show();
  })


  tray.setToolTip('Water Reminder')
  tray.setContextMenu(contextMenu)



  const win = new BrowserWindow({
    width: 400,
    height: 400,
    resizable: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile("./index.html");

  win.on("minimize", function (event) {
    event.preventDefault();
    win.hide();
  });

  win.on("close", function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      win.hide();
    }

    return false;
  });


  if (process.argv.includes("--auto")) {
    win.hide();
  }
  win.webContents.on("did-finish-load", () => {
    win.webContents.click
  })



});
