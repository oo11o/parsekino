const puppeteer = require('puppeteer');

const getHtml = async(url) => {
    // const args = [
    //     '--no-sandbox',
    //     '--disable-setuid-sandbox',
    //     '--disable-infobars',
    //     '--window-position=0,0',
    //     '--ignore-certifcate-errors',
    //     '--ignore-certifcate-errors-spki-list',
    //     '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    // ];

    args ='';

    const chromeOptions = {

        headless: true,
        slowMo:250,

    };

    const browser = await puppeteer.launch(chromeOptions)
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080
    })

    await page.goto(url);
    await page.waitForTimeout(2500);
    await page.screenshot({path: 'screenshot.png'});
    const html = await page.content();
    //wait browser.close();
    return html;
}

module.exports = getHtml;
