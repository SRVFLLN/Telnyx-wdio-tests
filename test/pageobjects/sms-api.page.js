import Page from "./page";

class SMSAPIPage extends Page {
    get pageHeader() { return browser.$("//h1/span[text()='SMS API']"); }

    async isPageOpen() {
        return await super.isPageOpen(this.pageHeader);
    }
}

export default new SMSAPIPage();