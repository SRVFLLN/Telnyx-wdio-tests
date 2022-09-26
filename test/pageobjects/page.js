const defaultTimeout = 1500;
export default class Page {
    get FAQSections() { return browser.$$("//h2/following-sibling::dl/div"); }
    get UseCaseLnks() { return browser.$$("//span[contains(text(),'Learn')]/ancestor::a"); }
    FAQSectionButton(indexOfAnswer) { return browser.$(`//h2/following-sibling::dl/div[${indexOfAnswer+1}]//button`); }
    AnswerText(indexOfAnswer) { return browser.$(`[data-faq-answer='${indexOfAnswer}'] p`); }
    AnswerBlock(indexOfAnswer) { return browser.$(`[data-faq-answer='${indexOfAnswer}']`); }
    AnswerTextLinks(indexOfAnswer) { return browser.$$(`[data-faq-answer='${indexOfAnswer}'] p a`); }
    AnswerTextLink(indexOfAnswer, indexOfLink) { return browser.$(`[data-faq-answer='${indexOfAnswer}'] p a:nth-child(${indexOfLink+1})`); }

    async getFAQSectionsLength() {
        return await this.FAQSections.length;
    }

    async getUseCaseLinksLength() {
        return await this.UseCaseLnks.length;
    }

    async getUseCaseLinkHref(index) {
        return await this.getElementHref(await this.UseCaseLnks[index]);
    }

    async clickOnUseCaseLink(index) {
        await this.click(await this.UseCaseLnks[index]);
    }

    async clickOnSectionButton(index) {
        await this.scrollToElement(this.FAQSectionButton(index))
        await this.click(this.FAQSectionButton(index));
    }

    async isAnswerTextDisplayed(index) {
        return await this.isElementDisplayed(await this.AnswerText(index));
    }

    async isAnswerTextNotDisplayed(index) {
        await this.waitUntiNotDisplayed(this.AnswerText(index));
        return !await this.isElementDisplayed(await this.AnswerText(index));
    }

    async isAnswerBlockOpened(index) {
        return await this.getElementAttribute(await this.AnswerBlock(index), 'data-is-open') == 'true' ? true : false;
    }

    async isAnswerBlockClosed(index) {
        await this.waitUntiNotDisplayed(this.AnswerBlock(index));
        return await this.getElementAttribute(await this.AnswerBlock(index), 'data-is-open') == 'false' ? true : false;
    }

    async getAnswerTextLinksLength(index) {
        return await this.AnswerTextLinks(index).length;
    }

    async getAnswerTextLinkHref(index, indexOfLink) {
        return await this.getElementHref(await this.AnswerTextLink(index, indexOfLink));
    }

    open(path) {
        return browser.url(path);   
    }

    async isPageOpen(element) {
        await this.waitUntiPageIsLoaded();
        try {
            return await this.isElementExist(element);
        }
        catch {
            return false;
        }
    }

    async isElementDisplayed(element) {
        return await element.isDisplayed();
    }

    async isElementExist(element) {
        return await element.isExisting();
    }

    async waitUntilClickable(element, timeout = defaultTimeout) {
        await element.waitForClickable({timeout: timeout});
    }

    async waitUntiDisplayed(element, timeout = defaultTimeout) {
        await element.waitForDisplayed({timeout: timeout});
    }

    async waitUntiNotDisplayed(element, timeout = defaultTimeout) {
        await element.waitForDisplayed({timeout: timeout, reverse:true});
    }

    async waitUntiPageIsLoaded() {
        await browser.waitUntil(
            async () => await browser.execute(() => document.readyState === 'complete'), { timeout: defaultTimeout});
    }

    async click(element) {
        await this.waitUntilClickable(element);
        await element.click();
    }

    async hoverOn(element) {
        await this.unfocus();
        await this.waitUntiDisplayed(element);
        await element.moveTo();
    }

    async unfocus() {
        await browser.$("//html").click();
    } 

    async getElementText(element) {
        await this.waitUntiDisplayed(element);
        return await element.getText();
    }

    async getElementHref(element) {
        await this.waitUntiDisplayed(element);
        return await element.getAttribute('href');
    }

    async getElementAttribute(element, attribute) {
        try {
            this.waitUntiDisplayed(element);
        }
        finally {
            return await element.getAttribute(attribute);
        }
    }

    async scrollToElement(element) {
        await this.waitUntiDisplayed(element);
        await element.scrollIntoView({block:'center'});
    }

    async getPageUrl() {
        await this.waitUntiPageIsLoaded();
        return await browser.getUrl();
    }
}