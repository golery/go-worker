import { remote } from 'webdriverio';
import {Builder} from 'selenium-webdriver';
import {Options} from 'selenium-webdriver/chrome';

const mode = 'selenium';
export async function selenium(res: any) {
    const options =new Options();
    (options as any).options_["debuggerAddress"] = "127.0.0.1:9222";
    const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get('https://www.blend.com');
    res.json('DONE');
}
export async function test(res: any) {
    if (mode.length === 0) {
        await selenium(res);
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