import pages from "../resources/usecaseSet"

describe("'Use case' links", () => {

    pages.forEach(({pageName, pageObject, mainNavigateFunc}) => {
        it("should work on" + pageName + " page", async () => {
            await mainNavigateFunc();
            expect(await pageObject.isPageOpen()).toEqual(true);
            const linksLength = await pageObject.getUseCaseLinksLength();
            let mainWindow = await browser.getWindowHandle();
            let link, i;
            for(i=0; i< linksLength; i++) {
                link = await pageObject.getUseCaseLinkHref(i);
                await browser.newWindow(link,{windowName:'newWindow'})
                let windows = await browser.getWindowHandles();
                await expect(windows.length).toEqual(2);
                await browser.switchToWindow(windows[windows.length - 1]);
                await expect(browser).toHaveUrlContaining(link);
                await browser.closeWindow();
                await browser.switchToWindow(mainWindow);
            }
        });
    })
})