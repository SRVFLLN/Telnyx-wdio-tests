import pages from "../resources/faq-set"

describe("FAQ section", () => {
    pages.forEach(({pageName, pageObject, mainNavigateFunc})=>{
        it("should correctly open answer blocks one by one on " + pageName + " page", async () => {
            await mainNavigateFunc();
            expect(await pageObject.isPageOpen()).toEqual(true);
            const blocksLength = await pageObject.getFAQSectionsLength();
            for (let i=0; i < blocksLength; i++) {
                if(i > 0 ) await pageObject.clickOnSectionButton(i);
                expect(await pageObject.isAnswerBlockOpened(i)).toEqual(true);
                expect(await pageObject.isAnswerTextDisplayed(i)).toEqual(true);
                if(i > 0) {
                    expect(await pageObject.isAnswerBlockClosed(i-1)).toEqual(true);
                    expect(await pageObject.isAnswerTextNotDisplayed(i-1)).toEqual(true);
                }
            }
     });
    })
})