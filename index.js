const pup = require("puppeteer");
async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.work = async (req,res)=>{
	const url= req.query.url;
	
	const myBrowser = await pup.launch({
	args:['--no-sandbox',
	]
});
	
	const myBrowser1 = myBrowser;
	const context = await myBrowser1.createIncognitoBrowserContext();
	const page = await context.newPage();
	
	await page.goto(url);
	await timeout(5000);
	const textx = await page.evaluate(() => Array.from(document.getElementsByClassName("_125gmrun")[0].querySelectorAll("picture"), element => element.innerHTML));
	let i;
	let imgs='[';
	for(i=0;i<textx.length;i++){
		const myvarx = await page.evaluate(i=> { return Promise.resolve(document.getElementsByClassName("_125gmrun")[0].querySelectorAll("picture")[i].querySelector("source").srcset); },i);
		if(i==(textx.length-1)){
			imgs+='"'+myvarx.toString()+'"';
		}else{
			imgs+='"'+myvarx.toString()+'"'+',';
		}
	}
	imgs+=']';
	const baslik = await page.evaluate(()=>document.getElementsByClassName("_mbmcsn")[0].querySelector("h1").innerText);
	const konum = await page.evaluate(()=>document.getElementsByClassName("_13myk77s")[0].querySelector("a").innerText);
	const doubledata = await page.evaluate(()=>document.getElementsByClassName("_xcsyj0")[0].innerText);
	const ucret = await page.evaluate(()=>document.getElementsByClassName("_ymq6as")[0].querySelector("span").querySelector("span").innerText);
	const aciklama = doubledata.substr(0,doubledata.indexOf("·")-1);
	const sahip = doubledata.replace(aciklama+" · ","");
	const son = '{"data": {"baslik": "'+baslik+'","aciklama": "'+aciklama+'","sahip":"'+sahip+'","konum":"'+konum+'","ucret":"'+ucret+'","resimler": '+imgs+'}}';
	res.send(son);
	context.close();
};