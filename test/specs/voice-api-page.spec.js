import mainPage from "../pageobjects/main.page"
import voiceApiPage from "../pageobjects/voice-api.page";
import sliderTests from "../resources/voiceSlidersSet.json";

describe("Voice API page", () => {
    it("should contain correctly working use case selectors", async ()=>{
        await(await mainPage.Header.hoverOnProductsTab()).clickOnVoiceAPILink();
        expect(await voiceApiPage.isPageOpen()).toEqual(true);
        let length =  await voiceApiPage.getUseCaseSelectorsCount();
        for(let i = 0; i < length - 1; i++) {
            await voiceApiPage.clickOnUseCaseSelector(i);
            let src = voiceApiPage.getSrcOfCurrentlyCaseImage();
            await voiceApiPage.clickOnUseCaseSelector(i+1);
            expect(src).not.toEqual(await voiceApiPage.getSrcOfCurrentlyCaseImage());
        }
    })

    sliderTests.forEach(({from, make, receive, programm, cost})=>{
        let name = "should contains correctly working slider at the bottom of the page if selected "+ from +" numbers and "+ (programm?"":"non-")+"programmable voice";
        it(name, async ()=> {
            await(await mainPage.Header.hoverOnProductsTab()).clickOnVoiceAPILink();
            expect(await voiceApiPage.isPageOpen()).toEqual(true);
            if(from == 'local') await voiceApiPage.selectLocalNumbers();
            else if(from == 'tollfree') await voiceApiPage.selectTollFreeNumbers();
            await voiceApiPage.setMakeCallsSlider(make);
            await voiceApiPage.setReceiveCallsSlider(receive);
            programm ? await voiceApiPage.EnableProgrammVoice() : await voiceApiPage.DisableProgrammVoice();
            expect(await voiceApiPage.getTelnyxCost()).toBeGreaterThanOrEqual(cost);
        })
    })
})