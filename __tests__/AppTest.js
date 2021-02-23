const Application = require("spectron").Application;
const electronPath = require("electron");
const path = require("path");

jest.setTimeout(50000);

describe('TodoList E2E testing with spectron', function () {
    
    const app = new Application({
        path:electronPath,
        args:[path.join(__dirname,'../')]
    });

    //Start the electron app before all tests
    beforeAll(async() => await app.start());

    //Stop the electron app after completion of all tests
    afterAll(async() => await app.stop());

    const strtest="testval";

    it('display the electron app window', async () => {
        const count = await app.client.getWindowCount();       
        expect(count).toBe(1);
    });

    it('displays the correct title', async () => {
        const title = await app.client.getTitle();
        expect(title).toBe('Todo List App');
    });

    it('enter some value in textbox', async() => {
        const myTextBox =await app.client.$('#listInput')
        await myTextBox.setValue(strtest); 
        var tval=await myTextBox.getValue();
        expect(tval).toBe(strtest);
    });

    it('button text displayed proper', async () => {
        const inputElement = await app.client.$('#addBtn');
        var value = await inputElement.getText();
        expect(value).toBe('Add Item');
    })

    it('button should be clicked', async() => {
        const myButton = await app.client.$('#addBtn')
        await myButton.click();
        
    });

    //add item working properly
    it('Check if element is added in list with proper value',async () => {
        const divelement = await app.client.$('#todolists');
        var innerdiv=await divelement.$$('.list');
        //expect(innerdiv.length).toBe(1);

        var inputElem=await innerdiv[0].$('input');
        var val=await inputElem.getValue();
        expect(val).toBe(strtest);
    })

    //update item working properly
    it('Check if element is updated in list',async () => {
        const divelement = await app.client.$('#todolists');
        var innerdiv=await divelement.$$('.list');

        var inputElem=await innerdiv[0].$('input');
        await inputElem.setValue("new test val"); 
        var nval=await inputElem.getValue();
        expect(nval).toBe("new test val");
    })

    //delete working properly
    it('Check if element is deleted from list',async () => {
        const divelement = await app.client.$('#todolists');
        var innerdiv=await divelement.$$('.list');

        //actual deletion
        const innerBtn=await innerdiv[0].$('.faicons');
        await innerBtn.click();

        //checking again the list is empty or not
        innerdiv=await divelement.$$('.list');
        expect(innerdiv.length).toBe(0);

    })

});