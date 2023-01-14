const puppeteer = require('puppeteer');

const getHtml = async(url) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    
    await page.goto(url);
    await page.waitForTimeout(1500);
    await page.screenshot({path: 'screenshot.png'});
    const html = await page.content();
    await browser.close();
    return html;
}

module.exports = getHtml;
