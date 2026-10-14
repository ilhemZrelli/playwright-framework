import { finalePageLocators } from "../locators/finalPageLocators";
import { Page } from "@playwright/test";
export class FinalePage{
    constructor (private page:Page){

    }
    async getFinalPageElements(){
        return {
            pageInfo:this.page.locator(finalePageLocators.pageInfo),
            successMsg: this.page.locator(finalePageLocators.successMSG),
            backHomeBtn: this.page.locator(finalePageLocators.backHomeButton)

        }
    }
    async getSuccessMsgText(){
        const text=this.page.locator(finalePageLocators.successMSG);
        return text;
    }
    async clickOnBackHome(){
        await this.page.locator(finalePageLocators.backHomeButton).click();
    }
}