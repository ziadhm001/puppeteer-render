const puppeteer = require("puppeteer");
require("dotenv").config();
const bot = async (homePageStay, secondPageStay) => {
  console.log(homePageStay, secondPageStay);
  // Simulate unique user agent for each request
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  ];

  // Simulate unique IP address or use a proxy service

  // Simulate unique referrer for each request
  const referrers = [
    'https://google.com',
    'https://facebook.com',
    'https://twitter.com',
  ];

  const getRandomText = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
  const MAX_HITS = 10;
  try{
  for (let i = 0; i < MAX_HITS; i++) {
    console.log(`inside loop ${i}`)
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(), 
    });
    const page = await browser.newPage();
    // Simulate unique user agent for each request
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    await page.setUserAgent(randomUserAgent);

    // Simulate unique referrer for each request
    const randomReferrer = referrers[Math.floor(Math.random() * referrers.length)];
    await page.setExtraHTTPHeaders({ referer: randomReferrer });

    // Simulate random user input for forms
    let path = Math.floor(Math.random() * 3)
    if(path === 0)
    {
        console.log(`inside path0`)
        await page.goto('https://proxyium.com/');
        await page.type('#unique-form-control','https://eventsgoo.com/')
        await page.click('#unique-btn-blue')
        const randomWord = getRandomText(5);
        await page.waitForTimeout(homePageStay);
        await page.goto('https://eventsgoo.com/details/preventive-nutrition-engineering-261')
        await page.waitForTimeout(secondPageStay);
    }
    else if(path === 1)
    {
        console.log(`inside path1`)
        await page.goto('https://proxyium.com/');
        await page.type('#unique-form-control','https://eventsgoo.com/')
        await page.click('#unique-btn-blue')
        await page.waitForTimeout(homePageStay);
        await page.goto('https://eventsgoo.com/details/icbl-554')
        await page.waitForTimeout(secondPageStay);
    }  
    else if(path === 2)
    {
          console.log(`inside path2`)
        await page.goto('https://proxyium.com/');
        await page.type('#unique-form-control','https://eventsgoo.com/')
        await page.click('#unique-btn-blue')
        await page.waitForTimeout(homePageStay);
        await page.goto('https://eventsgoo.com/details/preventive-nutrition-engineering-261')
        await page.waitForTimeout(secondPageStay);
    } 
    await browser.close();
  }
  } catch (e) {
    console.error(e);
  }
};

module.exports = { bot };
