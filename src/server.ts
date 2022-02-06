import { remote } from 'webdriverio';
import {Builder} from 'selenium-webdriver';
import {Options} from 'selenium-webdriver/chrome';
import {WebDriver} from "./WebDriver";

let mode = 'lt';
export async function selenium(res: any) {
    const options =new Options();
    (options as any).options_["debuggerAddress"] = "127.0.0.1:9222";
    const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get('https://www.blend.com');
    res.json('DONE');
}
export async function test(res: any) {
    if (mode === 'selenium') {
        await selenium(res);
        return;
    }
    if (mode === 'bsr') {
        await testBSR(res);
        return;
    }
    if (mode === 'lt') {
        await testLendingTree(res);
        return;
    }
    const browser = await remote({
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                debuggerAddress: "localhost:9222"
            } as any
        },
        logLevel: 'trace',
    });
    await browser.setWindowSize(800, 800);

    // await browser.url('https://webdriver.io')

    // await browser.saveScreenshot('./screenshot.png')
    // await browser.deleteSession()
    // console.log('=========');
    // const out = await browser.getWindowHandles();
    // const curr = await browser.getWindowHandle();
    // console.log(out, curr);
    // for (const h of out) {
    //     console.log(out, curr);
    //     await browser.switchToWindow(h);
    //     const title = await browser.getTitle()
    //     console.log(h, 'title', title);
    // }
    //
    // console.log(out, curr);
    // console.log(out, curr);
    await browser.url('https://baomoi.com');

        res.json('DONE');

}

async function getBrowser() {
    const browser = await remote({
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                debuggerAddress: "localhost:9222"

            } as any
        },
        logLevel: 'trace',
    });
    // await browser.setWindowSize(1400, 800);
    return browser;
}

export async function testBSR(res: any) {
    const browser = await getBrowser();
    await browser.url('https://ron.k8s.beta.blend.com/rooms/e54e2aaf-0670-42a2-8f68-cc9de702d5ae');

    try {
        const {$} = browser;
        let b = await browser.$('button=Continue');
        await b.waitForDisplayed();
        await b.click();
        b = await browser.$('button=Continue');
        await b.waitForDisplayed();
        await b.click();
    } catch(e) {
        res.json('ERROR');
        console.error(e);
        throw e;
    }
    res.json('DONE');
}

export async function testLendingTree(res: any) {
    const driver = new WebDriver();
    await driver.connect();
    await driver.openUrl('https://www.lendingtree.com/');
    await driver.click();
    await driver.click2();
}
