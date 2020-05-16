const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let winContent = null;
let win = null;

function createWindow() {
  win = new BrowserWindow({
    alwaysOnTop: true,
    title: "Coding Webview",
    width: 600,
    height: 400,
    minWidth: 600,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(path.join(__dirname, "src", "index.html"));
  winContent = win.webContents;
  win.setMenuBarVisibility(false);
  setMenu();
}

app.whenReady().then(() => {
  createWindow();
});

function resize(width, height) {
  win.setSize(width, height);
}

function setMenu() {
  const menuTemplate = [
    {
      label: "Window",
      submenu: [
        {
          label: "Toggle Dev Tools",
          accelerator: "Ctrl+D",
          role: "toggleDevTools",
        },
        {
          label: "Toggle Menu View",
          accelerator: "Ctrl+M",
          click() {
            win.setMenuBarVisibility(!win.isMenuBarVisible());
          },
        },
        {
          label: "Reload",
          role: "reload",
          accelerator: "Ctrl+R",
        },
        {
          type: "separator",
        },
        {
          label: "Exit",
          accelerator: "Ctrl+W",
          role: "quit",
        },
      ],
    },
    {
      label: "Port",
      submenu: [
        {
          label: "5500",
          sublabel: "Live Server",
          accelerator: "F1",
          click() {
            win.loadURL("http://localhost:5500/");
          },
        },
        {
          label: "8080",
          sublabel: "Nodemon",
          accelerator: "F2",
          click() {
            win.loadURL("http://localhost:8080/");
          },
        },
        {
          label: "8000",
          sublabel: "Lite Server",
          accelerator: "F3",
          click() {
            win.loadURL("http://localhost:8000/");
          },
        },
      ],
    },
    {
      label: "Resize",
      submenu: [
        {
          label: "600x400",
          click() {
            resize(600, 400);
          },
        },
        {
          label: "640x480",
          click() {
            resize(640, 480);
          },
        },
        {
          label: "800x600",
          click() {
            resize(800, 600);
          },
        },
        {
          label: "1024x768",
          click() {
            resize(1024, 768);
          },
        },
        {
          label: "1280x720",
          click() {
            resize(1280, 720);
          },
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
