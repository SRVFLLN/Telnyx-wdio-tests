import auSipTrunkingPage from "../pageobjects/au-sip-trunking.page";
import mainPage from "../pageobjects/main.page";
import sipTrunkingPage from "../pageobjects/sip-trunking.page";

describe("AU SIP Trunking page ", () => {
    it("should contain correct working network selector", async () => {
        await (await mainPage.Header.hoverOnProductsTab()).clickOnSIPLink();
        expect(await sipTrunkingPage.isPageOpen()).toEqual(true);
        await sipTrunkingPage.goToAUSIPTrinkingPage();
        expect(await auSipTrunkingPage.isPageOpen()).toEqual(true);
        await auSipTrunkingPage.clickOnOurNetworkSelector();
        let src = await auSipTrunkingPage.getSrcOfCurrentlyDisplayedImage();
        await auSipTrunkingPage.clickOnCompetitorNetworksSeelector();
        expect(src).not.toEqual(await auSipTrunkingPage.getSrcOfCurrentlyDisplayedImage());
        src = await auSipTrunkingPage.getSrcOfCurrentlyDisplayedImage();
        await auSipTrunkingPage.clickOnOurNetworkSelector();
        expect(src).not.toEqual(await auSipTrunkingPage.getSrcOfCurrentlyDisplayedImage());
    })
})