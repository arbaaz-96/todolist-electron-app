const {app, BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

/*function createWindow() {
   const mainWindow = new BrowserWindow({ width: 1100, height: 680 });
    mainWindow.loadURL('http://localhost:3000');
        
    //mainWindow.on("closed", () => (mainWindow = null));
}*/

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1100,
      height: 680
      /*webPreferences: {
        nodeIntegration: true,
      },*/
    })
  
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
      /*isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`,
    )*/
  
    /*mainWindow.on('closed', () => {
      mainWindow = null
    })*/
  }

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});