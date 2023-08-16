const express = require("express");
const app = express();
const puppeteer = require("puppeteer");

const PORT = 5001

const tasks = {};
const bot = async (homePageStay, secondPageStay, hits,taskId) => {
  console.log(homePageStay, secondPageStay, hits);
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
  try{
  for (let i = 0; i < hits; i++) {
    console.log(`inside loop ${i}`)
    if(tasks[taskId].status === 'canceled')
    {
        console.log('Canceled, breaking')
        break;
    }
    const browser = await puppeteer.launch({
      headless: "true",
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
        await page.goto('https://www.croxyproxy.com/');
        await page.type('#url','https://eventsgoo.com/')
        await page.click('#requestSubmit')
        await page.waitForTimeout(homePageStay);
        if(tasks[taskId].status === 'canceled')
    {
        console.log('Canceled, breaking')
        break;
    }
        await page.goto('https://www.croxyproxy.com/');
        await page.type('#url','https://eventsgoo.com/details/affordable-housing-conference-420')
        await page.click('#requestSubmit')
        await page.waitForTimeout(secondPageStay);
    }
    else if(path === 1)
    {
        console.log(`inside path1`)
        await page.goto('https://www.croxyproxy.com/');
        await page.type('#url','https://eventsgoo.com/')
        await page.click('#requestSubmit')
        await page.waitForTimeout(homePageStay);
        if(tasks[taskId].status === 'canceled')
    {
        console.log('Canceled, breaking')
        break;
    }
        await page.goto('https://www.croxyproxy.com/');
        await page.type('#url','https://eventsgoo.com/details/advance-geomatics-research-775')
        await page.click('#requestSubmit')
        await page.waitForTimeout(secondPageStay);
    }  
    else if(path === 2)
    {
        console.log(`inside path2`)
        await page.goto('https://www.croxyproxy.com/');
        await page.type('#url','https://eventsgoo.com/')
        await page.click('#requestSubmit')
        await page.waitForTimeout(homePageStay);
        if(tasks[taskId].status === 'canceled')
    {
        console.log('Canceled, breaking')
        break;
    }
        await page.goto('https://www.croxyproxy.com/');
        await page.type('#url','https://eventsgoo.com/details/innovator-medicines-workshop-431')
        await page.click('#requestSubmit')
        await page.waitForTimeout(secondPageStay);
    } 
    await browser.close();
  }
  tasks[taskId].status = 'completed';
  } catch (e) {
    console.error(e);
    tasks[taskId].status = 'failed';
  }
};

function generateTaskId() {
  // Generate a random alphanumeric task ID
  return Math.random().toString(36).substring(2, 10);
}

app.get('/task/', (req, res) => {
  

  if (tasks === {}) {
    return res.status(404).send('No Tasks.');
  }

  res.json(tasks);
});

app.get("/scrape/:firstPage/:secondPage/:hits", async (req, res) => {
  try{
      // Generate a unique task ID
      const taskId = generateTaskId();

      // Store the task status as 'running'
      tasks[taskId] = { status: 'running' };
  
      // Return the task ID to the client
      res.json({ taskId });
  // Method 1:
  await bot(parseInt(req.params.firstPage),parseInt(req.params.secondPage), parseInt(req.params.hits),taskId);
  }
  catch(err){
    console.log(err)
  }
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.get("/cancel", (req, res) => {
    let keys = Object.keys(tasks)
    for(let key in Object.keys(tasks))
    {
        tasks[keys[key]] = {status: 'canceled'}
    }
    res.send("All canceled");
  });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});



// Store task status and results
