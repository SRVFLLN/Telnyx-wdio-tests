import mainPage from "../pageobjects/main.page"
import sipTrunkingPage from "../pageobjects/sip-trunking.page";

describe("SIP Trunking page ", () => {
    it("should contain correct working network selector", async () => {
        await (await mainPage.Header.hoverOnProductsTab()).clickOnSIPLink();
        expect(await sipTrunkingPage.isPageOpen()).toEqual(true);
        await sipTrunkingPage.clickOnOurNetworkSelector();
        let src = await sipTrunkingPage.getSrcOfCurrentlyDisplayedImage();
        await sipTrunkingPage.clickOnCompetitorNetworksSeelector();
        expect(src).not.toEqual(await sipTrunkingPage.getSrcOfCurrentlyDisplayedImage());
        src = await sipTrunkingPage.getSrcOfCurrentlyDisplayedImage();
        await sipTrunkingPage.clickOnOurNetworkSelector();
        expect(src).not.toEqual(await sipTrunkingPage.getSrcOfCurrentlyDisplayedImage());
    })

    it("should contain working links in 'Effortless integration' section", async () => {
        await (await mainPage.Header.hoverOnProductsTab()).clickOnSIPLink();
        expect(await sipTrunkingPage.isPageOpen()).toEqual(true);
        let linksLength = await sipTrunkingPage.getEffortlessLinksLength();
        let i, link;
        for(i = 0; i< linksLength; i++) {
            link = await sipTrunkingPage.getEffortlessLinkHref(i);
            await sipTrunkingPage.clickOnEffortlessLink(i);
            expect(await sipTrunkingPage.getPageUrl()).toContain(link);
            await browser.back(); 
        }
    })
})