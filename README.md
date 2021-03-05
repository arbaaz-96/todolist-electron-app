TodoList app which is created in React and then hosted inside Electron framework

# Steps to run the app
1. Clone the app
2. Open the app with Code Editor (eg. Visual Studio code)
3. Run the following commands in order:
  - npm install
  - npm run build
  - npm run estart

const Application = require("spectron").Application;
const electronPath = require("electron");
const path = require("path");

jest.setTimeout(80000);
let app;

describe('Ag Grid E2E testing with spectron', function () {
    
    app = new Application({
        path:electronPath,
        args:[path.join(__dirname,'../')]
    });

    //Start the electron app before all tests
    beforeAll(async() => {
        app=await app.start()
        return app;
    });

    //Stop the electron app after completion of all tests
    afterAll(() =>{
        if(app && app.isRunning())
            return app.stop();
    });

    const testColHeader=['Id','Name','Age','Address','City','Salary','Department','Dummy1','Dummy2','Dummy3'
    ,'Dummy4','Dummy5','Dummy6','Dummy7','Dummy8','Dummy9','Dummy10'];

    const testRowData=['1','Arbaaz','24','Powai','Mumbai','5000','IT','d1','d2','d3','d4','d5','d6','d7','d8','d9','d10'];

    it('display the electron app window', async () => {
        const count = await app.client.getWindowCount();       
        expect(count).toBe(1);
    });

    it('displays the correct title', async () => {
        const title = await app.client.getTitle();
        expect(title).toBe('Ag Grid Demo');
    });

    it('should have expected column headers count', async () => {
        let headersCnt= await app.client.$$(".ag-header-cell");
        expect(headersCnt.length).toBe(17);
    });

    /*it('should have expected column headers text',async () => {
        const headers=await app.client.$$(".ag-header-cell-text");
        const headerVal= headers.map(async cell => {
            const headerCellVal= await cell.getText();
            return headerCellVal;
        });
        const headerVals= await Promise.all(headerVal);
        expect(headerVals).toEqual(testColHeader);
    });*/

    it('should have expected row count', async () => {
        const rowMain= await app.client.$(".ag-center-cols-container");
        let rowCnt= await rowMain.$$(".ag-row");
        expect(rowCnt.length).toBe(50);
    });

    it('sorting name column in ascending order', async () => {
        let headers= await app.client.$$(".ag-header-cell");
        await headers[1].click();
    });

    it('sorting name column in descending order', async () => {
        let headers= await app.client.$$(".ag-header-cell");
        await headers[1].click();
    });

    it('fetching first row values', async () => {
        const rowMain= await app.client.$(".ag-center-cols-container");
        const rows= await rowMain.$$(".ag-row");
        const firstRow= await rows[0].$$(".ag-cell-value");
        const rowVal= firstRow.map(async cell => {
            const cellVal= await cell.getText();
            return cellVal;
        });
        const rowVals= await Promise.all(rowVal);
        expect(rowVals).toStrictEqual(testRowData);

    });

    it('setting filter value for id column', async () => {
        let headers= await app.client.$$(".ag-header-cell");
        let filterIconBtn= await headers[0].$(".ag-header-icon");
        await filterIconBtn.click();

        const filter= await app.client.$("#960-display"); //(".ag-filter-select");
        await filter.click();
        //await filter.selectByIndex(2);

        const filterText=await app.client.$("#ag-962-input");
        await filterText.setValue("1");


    });

    /*it('', async () => {

    });*/

});
