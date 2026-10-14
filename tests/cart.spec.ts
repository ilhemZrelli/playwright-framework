import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { ProductsPage } from "../pages/Productspage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productsLocators } from "../locators/ProductsLocators";
import { productsToCard } from "../test-data/products";
import { CartPage } from "../pages/CartPage";

test.describe("Product page validation", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    // Go to the starting url before each test.
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("validate cart page URL and UI elements", async ({ page }) => {
    await productsPage.addFirstproductToCart();
    await productsPage.clickOnCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    const ui = cartPage.getCartPageElements();
    await expect((await ui).shoppingCart).toBeVisible();
    expect((await ui).shoppingCart).toBeVisible();
    expect((await ui).shoppingCart).toBeVisible();
  });
  test("validate continue shopping functionality", async ({ page }) => {
    await productsPage.addFirstproductToCart();
    await productsPage.clickOnCartLink();
    await cartPage.clickOnContinueShopping();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
  test("Validate first product in the cart page", async ({ page }) => {
    const firstProduct=await productsPage.getFirstProduct();
    await productsPage.addFirstproductToCart();
    await productsPage.clickOnCartLink();
    await page.waitForTimeout(2000);
    const cartproduct= await cartPage.getCartProducts();
    expect (cartproduct[0]).toEqual(firstProduct);
});

   test("validate all products added to the cart", async ({ page }) => {
    const allproducts =await productsPage.getAllProducts();
    await productsPage.addAllProductsToCard();
    await productsPage.clickOnCartLink();
    const cartproduct=await cartPage.getCartProducts();
    expect(cartproduct).toEqual(allproducts);
   });
    test("validate specific products added to cart", async ({ page }) => {
    const getSpecificProducts =await productsPage.getSpecificProductDetails(productsToCard);
    await productsPage.addSpecificProductsToCard(productsToCard);
    await productsPage.clickOnCartLink();
    const cartproduct=await cartPage.getCartProducts();
    expect(cartproduct).toEqual(getSpecificProducts);
   });
    test("validate remove product functionality", async ({ page }) => {
    
    await productsPage.addAllProductsToCard();
    const initialProducts=await cartPage.getCartProducts();
    console.log(initialProducts.length);
    expect(initialProducts.length).toBeGreaterThan(0);
    await cartPage.removeFirstProduct();
    const updatedCartProducts=await cartPage.getCartProducts();
    console.log(updatedCartProducts.length);
    expect(updatedCartProducts.length).toBe(initialProducts.length-1);
   });
  

})