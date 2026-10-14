import { Page } from "@playwright/test";
import { CheckoutLocators } from "../locators/CheckoutLocators";
export class CheckoutPage{
      constructor (private page: Page)
        {
    
        }
        async getChckoutElements(){
            return{
                pageInfo:this.page.locator(CheckoutLocators.pageInfo),
                cancel:this.page.locator(CheckoutLocators.cancelButton),
                continue:this.page.locator(CheckoutLocators.continueButton)
            }
        }
        async fillCheckoutDetails(firstName:string,lastName:string,postalCode:string){
            await this.page.fill(CheckoutLocators.firstName,firstName);
            await this.page.fill(CheckoutLocators.lastName,lastName);
            await this.page.fill(CheckoutLocators.zipCode,postalCode);
        }
        async clickCancel(){
            await this.page.click(CheckoutLocators.cancelButton);
        }
        async clickContinue(){
            await this.page.click(CheckoutLocators.continueButton);
        }
        async getErrorMsg(){
         return await this.page.locator(CheckoutLocators.errormessage);
        }
}