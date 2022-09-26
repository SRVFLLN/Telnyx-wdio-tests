import pages from "../resources/faq-set"
import auSipTrunkingPage from "../pageobjects/au-sip-trunking.page"

describe("FAQ section", () => {
    pages.forEach(({pageName, pageObject, mainNavigateFunc})=>{
        it("should contain correctly working links inside answer bloks on " + pageName + " page", async () => {
            await mainNavigateFunc();
            expect(await pageObject.isPageOpen()).toEqual(true);
            const blocksLength = await pageObject.getFAQSectionsLength();
            let i, j, link, linksLength, mainWindow;
            mainWindow = await browser.getWindowHandle();
            for (i = 0; i < blocksLength; i++) {
                if(i==0 & pageObject == auSipTrunkingPage) i++;
                if(i > 0 ) await pageObject.clickOnSectionButton(i);
                expect(await pageObject.isAnswerTextDisplayed(i)).toEqual(true);
                linksLength = await pageObject.getAnswerTextLinksLength(i);
                for(j = 0; j < linksLength; j++) {
                    link = await pageObject.getAnswerTextLinkHref(i,j);
                    if(!(link.includes('www.nbnco.com.au')) & link!=mainWindow) {
                        await browser.newWindow(link, {windowName:'newWindow'});
                        link = link.split('/'); 
                        if(link[link.length-1] == 'voice-api-explained') link[link.length-1] = 'what-is-voice-api';
                        if(link[link.length-1] == 'Call-Commands#CallControlSpeak') link[link.length-1] = 'CallControlSpeak';
                        let windows = await browser.getWindowHandles();
                        await expect(windows.length).toEqual(2);
                        await browser.switchToWindow(windows[windows.length - 1]);
                        await expect(browser).toHaveUrlContaining(link[link.length - 1]);
                        await browser.closeWindow();
                        await browser.switchToWindow(mainWindow);
                    }
                }
            }
        });
    })
})