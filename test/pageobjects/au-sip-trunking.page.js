import Page from "./page";

class AUSIPTrunkingPage extends Page {
    get pageHeader() { return browser.$("//h1//strong[contains(text(),'Australia')]"); }
    get ourNetworkSelector() { return browser.$("[aria-label*='Our']>button"); }
    get competitorNetworksSelector() {return browser.$("[aria-label*='Comp']>button"); }
    get newtworkImage() { return browser.$("//div[@aria-hidden='false']//img[not(ancestor::header) and contains(@src,'Net')]"); }

    async isPageOpen() {
        return await super.isPageOpen(this.pageHeader);
    }
    
    async clickOnOurNetworkSelector() {
        await this.click(this.ourNetworkSelector);
    }

    async clickOnCompetitorNetworksSeelector() {
        await this.click(this.competitorNetworksSelector);
    }

    async getSrcOfCurrentlyDisplayedImage() {
        return await this.getElementAttribute(this.newtworkImage, 'src');
    }
}

export default new AUSIPTrunkingPage();