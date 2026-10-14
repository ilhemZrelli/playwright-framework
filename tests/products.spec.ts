import {test,expect} from '@playwright/test'
import { BASE_URL,USERNAME,PASSWORD } from '../utils/envConfig'
import { ProductsPage } from '../pages/Productspage'
import { LoginPage } from '../pages/LoginPage'
import { LoginLocators } from '../locators/LoginLocators'
import { productsLocators } from '../locators/ProductsLocators'
import {productsToCard} from '../test-data/products'

test.describe('Product page validation', () => {
    let loginPage:LoginPage
    let productsPage:ProductsPage
  test.beforeEach(async ({ page }) => {
    loginPage=new LoginPage(page);
    productsPage=new ProductsPage(page);
    // Go to the starting url before each test.
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME,PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  });

  test('validate logout functionality', async ({ page }) => {
        await productsPage.openAboutPage();
       // await expect(page.locator(productsLocators.requestDemoButton)).toBeVisible();
        await expect(page.locator(productsLocators.tryifFreeButton)).toBeVisible();
        await page.goBack();
        await expect(page.locator(productsLocators.settingsIcon)).toBeVisible();
   
  });
   test("validate about page and validate back",async({page})=>{
        await productsPage.openAboutPage();
        //await expect(page.locator(productsLocators.requestDemoButton)).toBeVisible();
        await expect(page.locator(productsLocators.tryifFreeButton)).toBeVisible();
        await page.goBack();
        await expect(page.locator(productsLocators.settingsIcon)).toBeVisible();


    }
    );
    /*test("validate product page",async({page})=>
    {
        await productsPage.validateAllProductsDisplayed();
    });*/
    test("validate products page",async({page})=>
    {
        await productsPage.validateAllProductsDisplayed();
        await productsPage.addFirstproductToCart();
        await productsPage.addAllProductsToCard();
    });
    test("validate adding specific products to page",async({page})=>
    {
        await productsPage.addSpecificProductsToCard(productsToCard);
    });
    test("filter by name A to Z",async()=>
    {
     await productsPage.filterByNameAZ();   
     const names=await productsPage.getProductNames();
     const sorted=[...names].sort();
     expect(names).toEqual(sorted);

    });
    test("filter by name Z to A",async()=>{
        await productsPage.fliterByNameZA();   
     const names=await productsPage.getProductNames();
     const sorted=[...names].sort().reverse();
     expect(names).toEqual(sorted);
    });
    test("filter by price low ro high ",async()=>{
        await productsPage.filterByPriceLowToHigh();
        const prices =await productsPage.getProductPrice();
        const sorted=[...prices].sort((a,b)=>a-b);
        expect(prices).toEqual(sorted);

    });
    test("filter by price high to low",async()=>{
  await productsPage.filterBYHighToLow();
        const prices =await productsPage.getProductPrice();
        const sorted=[...prices].sort((a,b)=>b-a);
        expect(prices).toEqual(sorted);

    });
});

