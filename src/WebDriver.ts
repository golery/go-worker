import {remote} from "webdriverio";

export class WebDriver {
    private browser!: WebdriverIO.Browser;

    constructor() {
    }

    async connect() {
        this.browser = await remote({
            capabilities: {
                browserName: 'chrome',
                // 'goog:chromeOptions': {
                //     debuggerAddress: "localhost:9222"
                //
                // } as any
            },
            logLevel: 'trace',
        });
        await this.browser.setWindowSize(1400, 800);
    }

    async openUrl(url: string) {
        await this.browser.url(url);
    }

    async click() {
        const elm = await this.browser.$(`//*[text()='Personal Loans']`);
        await elm.click();
    }

    async click2() {
        const elm = await this.browser.$(`//select`);
        await elm.click();
        await elm.selectByVisibleText('Home Improvement');

        const e2= await this.browser.$("//input[@name='formData.Amount']");
        const w = await e2.getSize('width');
        const h = await e2.getSize('height');
        // await e2.click({x: Math.floor(w*0.5), y: Math.floor(h*0.5)});
        await e2.click();

        const e3 = await this.browser.$("//*[text()='Continue']");
        await e3.click();

        const e4 = await this.browser.$("//*[text()='Within 48 hours']");
        await e4.click();

        const e5 = await this.browser.$("//input[@name='formData.ZipCode']");
        await e5.setValue('32801');

        await (await this.browser.$("//*[text()='Orlando, FL']")).waitForDisplayed();

        await (await this.browser.$("//*[text()='Continue']")).click();
    }
}