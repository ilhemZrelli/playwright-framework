import { Page } from "@playwright/test";
import { cartLocators } from "../locators/CartLocators";
export class CartPage
{
    constructor(private page:Page){

    }
    async clickOnContinueShopping(){
        await this.page.locator(cartLocators.continueShopping).click();

    }
    async getCartPageElements(){
        return {
            cartTitle:this.page.locator(cartLocators.cartTitle),
            shoppingCart:this.page.locator(cartLocators.continueShopping),
            checkout:this.page.locator(cartLocators.checkoutButton),
        }
    }
    async getCartProducts(){
        const productALLNames = await this.page
              .locator(cartLocators.productNames)
              .allTextContents();
            const productALLdescriptions = await this.page
              .locator(cartLocators.productDescription)
              .allTextContents();
            const productALLprices = await this.page
              .locator(cartLocators.productPrices)
              .allTextContents();
            const allProducts = productALLNames.map((_, i) => ({
              name: productALLNames[i].trim(),
              desc: productALLdescriptions[i].trim(),
              price: productALLprices[i].trim(),
            }));
            return allProducts;
        }
      async removeFirstProduct(){
        await this.page.locator(cartLocators.removeButton).first().click();
      }
      async clickCheckout(){
        await this.page.locator(cartLocators.checkoutButton).click();
      }
    }
    
    
