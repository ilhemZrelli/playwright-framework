import { Page } from "@playwright/test";
import { CheckoutLocators } from "../locators/CheckoutLocators";
import { checkoutOverviewLocators } from "../locators/checkoutOverviewLocators";
import { cartLocators } from "../locators/CartLocators";
export class CheckoutOverviewPage
{
    constructor(private page:Page){

    }
    async getCheckoutOverviewElements()
    {
        return {
            pageInfo:this.page.locator(checkoutOverviewLocators.pageInfo),
            cancelButton: this.page.locator(checkoutOverviewLocators.cancelButton),
            finishButton: this.page.locator(checkoutOverviewLocators.finishButton)
        }
    }
    async getOverviewProducts(){
        const allNames=await this.page.locator(cartLocators.productNames).allTextContents();
        const allPrices=await this.page.locator(cartLocators.productPrices).allTextContents();
        const allDescriptions=await this.page.locator(cartLocators.productDescription).allTextContents();
        const allProducts=allNames.map((_,i)=>
        ({name:allNames[i].trim(),
            description:allDescriptions[i].trim(),
            price:allPrices[i].trim()
    }))
    return allProducts;
    }
    async getItemTotal(){
        const text=await this.page.locator(checkoutOverviewLocators.itemTotal).textContent();
        return parseFloat(text!.replace("Item total:$","").trim());
    }
    async getTax(){
        const text=await this.page.locator(checkoutOverviewLocators.tax).textContent();
        return parseFloat(text!.replace("Tax:$","").trim());
    }
    async getTotal(){
        const text=await this.page.locator(checkoutOverviewLocators.total).textContent();
        return parseFloat(text!.replace("Total:$","").trim());
    }
    async clickCancel(){
        await this.page.locator(checkoutOverviewLocators.cancelButton).click();
    }
    async clickOnFinish(){
        await this.page.locator(checkoutOverviewLocators.finishButton).click();
    }
}