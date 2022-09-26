import Page from "./page";

class VoiceAPIPage extends Page {
    get pageHeader() { return browser.$("//h1/span[text()='Voice API']"); }
    useCaseSelector(index) { return browser.$(`#tab-${index}`); }
    get useCaseSelectors() { return browser.$$("//span[@role='tab']"); }
    get useCaseImage() { return browser.$("//div[@role='tabpanel' and @aria-hidden='false']//img"); }
    get elementUnderSliders() {return browser.$("//h2/span[contains(text(),'Pricing')]"); }
    get localNumInput() { return browser.$("#local-numbers"); }
    get tollFreeNumInput() { return browser.$("#toll-free-numbers"); }
    get makeCallsSlider() { return browser.$("//div[contains(text(),'Make')]/following-sibling::div//div[@class='ant-slider-handle']"); }
    get receiveCallsSlider() { return browser.$("//div[contains(text(),'Receive')]/following-sibling::div//div[@class='ant-slider-handle']"); }
    get noVoiceSelector() { return browser.$("#no"); }
    get yesVoiceSelector() { return browser.$("#yes"); }
    get telnyxCost() { return browser.$("//div[text()='Telnyx']/following-sibling::div//span[@class]"); }

    async isPageOpen() {
        return await super.isPageOpen(this.pageHeader);
    }

    async getUseCaseSelectorsCount() {
        return await this.useCaseSelectors.length;
    }

    async clickOnUseCaseSelector(index) {
        await this.scrollToElement(this.useCaseSelector(index));
        await this.click(this.useCaseSelector(index));
    }

    async getSrcOfCurrentlyCaseImage() {
        return await this.getElementAttribute(this.useCaseImage, 'src');
    }

    async _scrollToSliders() {
        await this.scrollToElement(this.elementUnderSliders);
        let yLoc = await this.elementUnderSliders.getLocation('y');
        await browser.execute((yLoc)=>{window.scrollTo(0, yLoc-678)}, yLoc);
        await this.scrollToElement(this.localNumInput);
    }

    async selectLocalNumbers() {
        await this._scrollToSliders();
        await this.click(this.localNumInput);
    }

    async selectTollFreeNumbers() {
        await this._scrollToSliders();
        await this.click(this.tollFreeNumInput);
    }

    async _moveSlider(targetValue, slider) {
        let currValue, minValue, arrows;
        currValue = parseInt(await this.getElementAttribute(slider, 'aria-valuenow'));
        minValue = parseInt(await this.getElementAttribute(slider, 'aria-valuemin'));
        let steps = (currValue-targetValue)/minValue;
        if (steps > 0) arrows = '\uE012'.repeat(steps);
        else arrows = '\uE014'.repeat(steps*(-1));
        slider.addValue(arrows);
    }

    async setMakeCallsSlider(value) { 
        await this._moveSlider(value, this.makeCallsSlider);
    }

    async setReceiveCallsSlider(value) {
        await this._moveSlider(value, this.receiveCallsSlider);
    }

    async EnableProgrammVoice() {
        await this.click(this.yesVoiceSelector);
    }

    async DisableProgrammVoice() {
        await this.click(this.noVoiceSelector);
    }

    async getTelnyxCost() {
        let cost =  await this.getElementText(this.telnyxCost);
        cost = cost.replace('$','');
        cost = cost.replace(',','');
        return parseInt(cost);
    }
}

export default new VoiceAPIPage();