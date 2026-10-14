import {test,expect} from '@playwright/test'
import { BASE_URL,USERNAME,PASSWORD } from '../utils/envConfig'
import { ProductsPage } from '../pages/Productspage'
import { LoginPage } from '../pages/LoginPage'
import { CheckoutLocators } from '../locators/CheckoutLocators'
import { checkoutData } from '../test-data/checkoutData'
import {CartPage} from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
test.describe('Product page validation', () => {
    let loginPage:LoginPage;
    let cartPage:CartPage;
    let productsPage:ProductsPage;
    let checkoutPage:CheckoutPage;
  test.beforeEach(async ({ page }) => {
    loginPage=new LoginPage(page);
    productsPage=new ProductsPage(page);
    checkoutPage=new CheckoutPage(page);
    cartPage=new CartPage(page);
    // Go to the starting url before each test.
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME,PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await productsPage.addFirstproductToCart();
    await productsPage.clickOnCartLink();

  });
  test("validate checkout url elements",async({page})=>{
    await cartPage.clickCheckout();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    const elements=await checkoutPage.getChckoutElements();
    await expect(elements.cancel).toBeVisible();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.continue).toBeVisible();
  });
  test("validate cancel functionality",async({page})=>{
    await cartPage.clickCheckout();
    await checkoutPage.clickCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
});
test("validate continue button",async({page})=>{
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
    await checkoutPage.clickContinue();
});
test.only("validate error when clicking continue with no data",async({page})=>{
    await cartPage.clickCheckout();
    await checkoutPage.clickContinue();
    const error=await checkoutPage.getErrorMsg();
    expect(error?.trim()).toBe("Error: First Name is required");
});
})