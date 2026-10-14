import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { CartPage } from "../../pages/CartPage";
import { ProductsPage } from "../../pages/Productspage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { checkoutData } from "../../test-data/checkoutData";
import { BASE_URL, USERNAME, PASSWORD } from "../../utils/envConfig";
import { FinalePage } from "../../pages/FinalPage";
import { CheckoutOverviewPage } from "../../pages/CheckouOverviewPage";

test.describe('Final page validation', () => {
    let loginPage:LoginPage;
    let cartPage:CartPage;
    let productsPage:ProductsPage;
    let checkoutPage:CheckoutPage;
    let finalPage:FinalePage;
    let checkoutOverview:CheckoutOverviewPage;
   test.beforeEach(async ({ page }) => {
      loginPage=new LoginPage(page);
      productsPage=new ProductsPage(page);
      checkoutPage=new CheckoutPage(page);
      cartPage=new CartPage(page);
      checkoutOverview=new CheckoutOverviewPage(page);
      finalPage=new FinalePage(page);
      // Go to the starting url before each test.
      await page.goto(BASE_URL);
      await loginPage.login(USERNAME,PASSWORD);
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await productsPage.addFirstproductToCart();
      await productsPage.clickOnCartLink();
      await cartPage.clickCheckout();
      await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
      await checkoutPage.clickContinue();
      await checkoutOverview.clickOnFinish();
  
    });
    test("validate checkout overview page UI and url ", async({page})=>
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        const elemnts=await finalPage.getFinalPageElements();
        await expect(elemnts.backHomeBtn).toBeVisible();
        await expect(elemnts.pageInfo).toBeVisible();
        await expect(elemnts.successMsg).toBeVisible();

    });
    test("validate the success msg", async({page})=>{
        const mesg=await finalPage.getSuccessMsgText();
        expect(mesg).toBe("Thank you for your order!");
    });
    test("validate the back home button",async({page})=>{
        await finalPage.clickOnBackHome();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })

  

})