import Page from "./page";

class SIPTrunkingPage extends Page {
    get pageHeader() { return browser.$("//h1//strong[contains(text(),'SIP')]"); }
    get regionSwitch() { return browser.$("[aria-haspopup]"); }
    get regionListAUElement() { return browser.$("//header//span[text()='AU']"); }
    get ourNetworkSelector() { return browser.$("[aria-label*='Our']>button"); }
    get competitorNetworksSelector() {return browser.$("[aria-label*='Comp']>button"); }
    get newtworkImage() { return browser.$("//div[@aria-hidden='false']//img[not(ancestor::header) and contains(@src,'Net')]"); }
    get effortlessLinks() { return browser.$$("//h2[contains(text(),'Effortless')]/ancestor::div/following-sibling::div//ul/li//a"); }
    async effortlessLink(index) { return await this.effortlessLinks[index]; }

    async isPageOpen() {
        return await super.isPageOpen(this.pageHeader);
    }

    async goToAUSIPTrinkingPage() {
        await this.scrollToElement(this.regionSwitch);
        await this.click(this.regionSwitch);
        await this.click(this.regionListAUElement);
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

    async getEffortlessLinksLength() {
        return await this.effortlessLinks.length;
    }

    async getEffortlessLinkHref(index) {
        return await this.getElementHref(await this.effortlessLink(index));
    }

    async clickOnEffortlessLink(index) {
        await this.click(await this.effortlessLink(index));
    }
}

export default new SIPTrunkingPage();