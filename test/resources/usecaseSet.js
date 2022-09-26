import smsAPIPage from "../pageobjects/sms-api.page";
import mainPage from "../pageobjects/main.page";
import sipTrunkingPage from "../pageobjects/sip-trunking.page"
import voiceApiPage from "../pageobjects/voice-api.page"

let pages = [
    {pageName: 'SMS API', pageObject: smsAPIPage, 
    mainNavigateFunc:async () => {await (await mainPage.Header.hoverOnProductsTab()).clickOnSMSAPILink()}},
    {pageName: 'SIP Trunking', pageObject: sipTrunkingPage, 
    mainNavigateFunc:async() => {await (await mainPage.Header.hoverOnProductsTab()).clickOnSIPLink()}},
    {pageName: 'Voice API', pageObject: voiceApiPage, 
    mainNavigateFunc: async() => {await(await mainPage.Header.hoverOnProductsTab()).clickOnVoiceAPILink()}}
]

export default pages;