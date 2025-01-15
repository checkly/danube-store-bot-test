import { test, expect } from '@playwright/test';
import { DanubeShopPage } from './pages/shop';
import { DanubeItemDetailsPage } from './pages/itemDetails';

test('search', async ({page}) => {

    await page.goto('https://danube-store-srebot-test-3a4a0227b89f.herokuapp.com');

    const shopPage = new DanubeShopPage(page);
    const itemDetailsPage = new DanubeItemDetailsPage(page);

    await shopPage.performSearches('For')
    await shopPage.selectShopItem()
    expect(await itemDetailsPage.isActive())
})
