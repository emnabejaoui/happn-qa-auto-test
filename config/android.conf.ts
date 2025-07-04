import { join } from 'node:path'
import path from 'path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    port: 4723,
    path: '/',
    maxInstances: 1,
    // ============
    // Specs
    // ============
    specs: ['../tests/features/**/*.feature'],
    // ============
    // Framework
    // ============
    // By default we use the Mocha framework, see the `wdio.shared.conf.ts` which is imported by `./wdio.shared.local.appium.conf.js`. For Cucumber we need to "redefine" the framework
    framework: 'cucumber',
    reporters: ['spec'],
    //
    // You also need to specify where your step definitions are located.
    // See also: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [path.join(__dirname, '..', 'tests', 'steps', '**.ts')],
        backtrace: false,   // <boolean> show full backtrace for errors
        compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: true,    // <boolean> abort the run on first failure
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source URIs
        strict: true,      // <boolean> fail if there are any undefined or pending steps
        timeout: 60 * 60 * 1000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
        scenarioLevelReporter: false // Enable this to make webdriver.io behave as if scenarios and not steps were the tests.
    },
    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-uiautomator2-driver
    capabilities: [
        {
            // The defaults you need to have in your config
            platformName: 'Android',
            maxInstances: 1,
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here
            // http://appium.io/docs/en/writing-running-appium/caps/

            //
            // NOTE: Change this name according to the Simulator you have created on your local machine
            'appium:deviceName': 'emulator-5554',
            //
            // NOTE: Change this version according to the Simulator Version you have created on your local machine
            'appium:platformVersion': '16',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:appPackage': 'com.wdiodemoapp',
            'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
            // The path to the app
            'appium:app': join(
                process.cwd(),
                'apps',
                // Change this name according to the app version you downloaded
                'android.wdio.native.app.v1.0.8.apk'
            ),
            'appium:newCommandTimeout': 240,
            // This is needed to wait for the webview context to become available
            'appium:webviewConnectTimeout': 5000,
        }
    ],
};
