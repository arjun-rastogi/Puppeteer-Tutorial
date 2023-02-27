const  puppeteer  = require("puppeteer");

(async () => {
    const browswer = await puppeteer.launch({
        headless : false,
        defaultViewport: false,
        userDataDir: './temp'
    });
    const page = await browswer.newPage();
    await page.goto("https://www.amazon.com/s?k=amazon+basics&sprefix=amazon+bas%2Caps%2C447&ref=nb_sb_ss_ts-doa-p_1_10");

    const productHandles = await page.$$('div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item');
    let i = 0;
    let items = []; 
    for(const producthandle of productHandles) {
        let title = "Null";
        let price = "Null";
        let img = "Null";


        try {
            title = await page.evaluate( el => el.querySelector("h2 > a > span").textContent, producthandle );
        } catch (error) {}
        try {
            price = await page.evaluate( el => el.querySelector(".a-price > .a-offscreen ").textContent, producthandle);
        } catch (error) {}
        try {
            img = await page.evaluate(el => el.querySelector(".s-image").getAttribute("src"), producthandle)
        } catch (error) {}
        
        if (title !== "Null"){
            items.push({title, price, img});
        }
    };

    console.log("item", items)
    // await browswer.close();
})();

