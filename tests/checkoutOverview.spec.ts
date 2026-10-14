import {test,expect} from '@playwright/test'
import { BASE_URL,USERNAME,PASSWORD } from '../utils/envConfig'
import { ProductsPage } from '../pages/Productspage'
import { LoginPage } from '../pages/LoginPage'
import { CheckoutLocators } from '../locators/CheckoutLocators'
import { checkoutData } from '../test-data/checkoutData'
import {CartPage} from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { CheckoutOverviewPage } from '../pages/CheckouOverviewPage'

test.describe('Checkout overview validation', () => {
    let loginPage:LoginPage;
    let cartPage:CartPage;
    let productsPage:ProductsPage;
    let checkoutPage:CheckoutPage;
    let checkoutOverview: CheckoutOverviewPage
  test.beforeEach(async ({ page }) => {
    loginPage=new LoginPage(page);
    productsPage=new ProductsPage(page);
    checkoutPage=new CheckoutPage(page);
    cartPage=new CartPage(page);
    checkoutOverview=new CheckoutOverviewPage(page);
    // Go to the starting url before each test.
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME,PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await productsPage.addFirstproductToCart();
    await productsPage.clickOnCartLink();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
    await checkoutPage.clickContinue();

  });
  test("validate checkout overview page UI and url",async({page})=>
{
    await expect(page).toHaveTitle("https://www.saucedemo.com/checkout-step-two.html");
    const elements = await checkoutOverview.getCheckoutOverviewElements();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.cancelButton).toBeVisible();
    await expect(elements.finishButton).toBeVisible();
});
test("validate cancel button functionality",async({page})=>
{
    await checkoutOverview.clickCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})
test("validate item total calculation",async({page})=>
{
    const overviewProducts=await checkoutOverview.getOverviewProducts();
    const calculatedTotal=overviewProducts.reduce((sum,{price})=>sum+parseFloat(price.replace("$","")),0);
    const UIItemTotal=await checkoutOverview.getItemTotal();
    console.log(calculatedTotal);
    console.log(UIItemTotal);

    expect(calculatedTotal).toBe(UIItemTotal);
})
test("validate final total (item total +tax)", async({page})=>
{
  const itemTotal=await checkoutOverview.getItemTotal();
  const tax =await checkoutOverview.getTax();
  const finalTotal=await checkoutOverview.getTotal();
  const expectedFinalTotal=itemTotal+tax;
  expect(finalTotal).toBe(expectedFinalTotal)
})
})