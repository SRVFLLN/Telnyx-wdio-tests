import Page from "./page";
import Header from "./header";

class MainPage extends Page {
    get acceptCookieButton() { return browser.$("button[aria-label^='close'] ~ div button"); }

    get Header() {
        return Header.instance;
    }

    async acceptCookie() {
        await this.click(this.acceptCookieButton);
    }

    
}

export default new MainPage();