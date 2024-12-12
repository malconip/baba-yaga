const puppeteer = require('puppeteer');

async function startAutomation() {
    const browser = await puppeteer.launch({
        headless: true, // Set false if you need to watch the browser actions
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://stopwarnow.github.io/', { waitUntil: 'networkidle0' });

    // Start the tool by simulating button clicks or setting the appropriate JavaScript environment
    await page.evaluate(() => {
        document.querySelector('#mbInput input').value = 'Unlimited'; // Set input to unlimited
        document.querySelector('#btnAction').click(); // Start the action
    });

    // Function to fetch and log counter data
    const logCounterData = async () => {
        const counterData = await page.evaluate(() => {
            const counter = document.getElementById("txtCounter");
            return counter ? counter.innerText : 'Counter not found';
        });
        console.log('Counter Data:', counterData);
    };

    // Periodically log the counter data every 5 seconds
    setInterval(logCounterData, 5000);

    console.log('Automation started!');
    // Optionally, keep the browser session open as needed
    // await browser.close();
}

startAutomation();
