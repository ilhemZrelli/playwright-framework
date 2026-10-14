import { cartLocators } from "../locators/CartLocators";
import { productsLocators } from "../locators/ProductsLocators";
import { Page } from "@playwright/test";
export class ProductsPage {
  constructor(private page: Page) {}
  async logout() {
    await this.page.click(productsLocators.settingsIcon);
    await this.page.click(productsLocators.logoutLink);
  }
  async openAboutPage() {
    await this.page.click(productsLocators.settingsIcon);
    await this.page.click(productsLocators.aboutLink);
  }
  async validateAllProductsDisplayed() {
    const names = await this.page
      .locator(productsLocators.prouctTitle)
      .allTextContents();
    const productDescription = await this.page
      .locator(productsLocators.productDescription)
      .allTextContents();
    const productProce = await this.page
      .locator(productsLocators.productPrice)
      .allTextContents();
    const addToCardButton = await this.page
      .locator(productsLocators.addToCardButton)
      .count();
    if (names.length === 0) throw new Error("no products found");

    if (
      names.length !== productDescription.length ||
      names.length !== productProce.length ||
      names.length !== addToCardButton
    )
      throw new Error("Mismatch between the product details ");
  }
  async addFirstproductToCart() {
    await this.page.locator(productsLocators.addToCardButton).first().click();
  }
  async addAllProductsToCard() {
    const buttons = this.page.locator(productsLocators.addToCardButton);
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await this.page.waitForTimeout(3000);
    }
  }
  async addSpecificProductsToCard(productName: string[]) {
    const addProducts = this.page.locator(productsLocators.prouctTitle);
    const count = await addProducts.count();
    for (let i = 0; i < count; i++) {
      const name = await addProducts.nth(i).textContent();
      if (name && productName.includes(name.trim())) {
        await this.page
          .locator(productsLocators.addToCardButton)
          .nth(i)
          .click();
        await this.page.waitForTimeout(3000);
      }
    }
  }
  async filterByNameAZ() {
    await this.page.selectOption(productsLocators.filterDropDown, "az");
  }
  async fliterByNameZA() {
    await this.page.selectOption(productsLocators.filterDropDown, "za");
    await this.page.waitForTimeout(3000);
  }
  async filterByPriceLowToHigh() {
    await this.page.selectOption(productsLocators.filterDropDown, "lohi");
    await this.page.waitForTimeout(3000);
  }
  async filterBYHighToLow() {
    await this.page.selectOption(productsLocators.filterDropDown, "hilo");
    await this.page.waitForTimeout(3000);
  }
  async getProductNames() {
    return await this.page
      .locator(productsLocators.prouctTitle)
      .allTextContents();
  }
  async getProductPrice() {
    const prices = await this.page
      .locator(productsLocators.filterDropDown)
      .allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  }
  async clickOnCartLink() {
    await this.page.locator(productsLocators.cartLink).click();
  }
  async getFirstProduct() {
    const productName = await this.page
      .locator(productsLocators.prouctTitle)
      .first()
      .textContent();
    const description = await this.page
      .locator(productsLocators.productDescription)
      .first()
      .textContent();
    const price = await this.page
      .locator(productsLocators.productPrice)
      .first()
      .textContent();
    return {
      name: productName?.trim(),
      desc: description?.trim(),
      price: price?.trim(),
    };
  }
  async getAllProducts() {
    const productALLNames = await this.page
      .locator(productsLocators.prouctTitle)
      .allTextContents();
    const productALLdescriptions = await this.page
      .locator(productsLocators.productDescription)
      .allTextContents();
    const productALLprices = await this.page
      .locator(productsLocators.productPrice)
      .allTextContents();
    const allProducts = productALLNames.map((_, i) => ({
      name: productALLNames[i].trim(),
      desc: productALLdescriptions[i].trim(),
      price: productALLprices[i].trim(),
    }));
    return allProducts;
  }
  async getSpecificProductDetails(productName: string[]) {
    const productALLNames = await this.page
      .locator(productsLocators.prouctTitle)
      .allTextContents();

    const productALLdescriptions = await this.page
      .locator(productsLocators.productDescription)
      .allTextContents();
    const productALLprices = await this.page
      .locator(productsLocators.productPrice)
      .allTextContents();
    const allProducts = productALLNames.map((_, i) => ({
      name: productALLNames[i].trim(),
      desc: productALLdescriptions[i].trim(),
      price: productALLprices[i].trim(),
    }));
    return allProducts.filter(p=>productName.includes(p.name));
  }
}
