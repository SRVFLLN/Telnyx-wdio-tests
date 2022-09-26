import Page from "./page";

export default class Header extends Page {
    static form = null;
    get productsTab() { return browser.$("//header//span/span[contains(text(),'Product')]"); }
    get SIPLink() { return browser.$("//header//a[contains(@href, 'products/sip')]"); }
    get VoiceAPILink() { return browser.$("//header//a[contains(@href,'products/voice')]"); }
    get SMSAPILink() {return browser.$("//header//a[contains(@href,'products/sms')]"); }

    static get instance() {
        if(!Header.form) {
            Header.form = new Header();
        }
        return Header.form;
    }

    async hoverOnProductsTab() {
        await this.hoverOn(this.productsTab);
        return {
            async clickOnSIPLink() {
                await Header.prototype.click(Header.prototype.SIPLink);
            },
            async clickOnVoiceAPILink() {
                await Header.prototype.click(Header.prototype.VoiceAPILink);
            },
            async clickOnSMSAPILink() {
                await Header.prototype.click(Header.prototype.SMSAPILink);
            }
        }
    }
}