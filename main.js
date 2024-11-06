import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
const URL_API = "https://api.blockchain.com/v3/exchange/"
const userInputs = {
    'btc': 'BTC-USD',
    'bitcoin': 'BTC-USD',
    'bit': 'BTC-USD',
  
    'eth': 'ETH-USD',
    'ethereum': 'ETH-USD',
  
    'ltc': 'LTC-USD',
    'litecoin': 'LTC-USD',
  
    'xrp': 'XRP-USD',
    'ripple': 'XRP-USD',
  
    'doge': 'DOGE-USD',
    'dogecoin': 'DOGE-USD',
  
    'bnb': 'BNB-USD',
    'binancecoin': 'BNB-USD',
  
    'ada': 'ADA-USD',
    'cardano': 'ADA-USD',
  
    'sol': 'SOL-USD',
    'solana': 'SOL-USD',
  
    'avax': 'AVAX-USD',
    'avalanche': 'AVAX-USD',
  
    'dot': 'DOT-USD',
    'polkadot': 'DOT-USD',
  
    'trx': 'TRX-USD',
    'tron': 'TRX-USD',
  
    'matic': 'MATIC-USD',
    'polygon': 'MATIC-USD',
  
    'xlm': 'XLM-USD',
    'stellar': 'XLM-USD',
  
    'chainlink': 'LINK-USD',
    'link': 'LINK-USD'
  };

app.get('/', async (req, res) => {
    const cryptoSymbols = ["BTC-USD", "ETH-USD", "USDT-USD", "BNB-USD", "USDC-USD", "XRP-USD", "ADA-USD", "SOL-USD", "DOGE-USD", "DOT-USD"]
    const cryptoValues = []
    try{ 
        const result = await axios.get(URL_API + `tickers`);
        for(let i = 0; i < result.data.length; i++){
            if (cryptoSymbols.includes(result.data[i].symbol)){
                cryptoValues.push(result.data[i]);
            }
        }
        res.render('index.ejs', {content: cryptoValues});

    } catch (error) {
        console.log(error);
    }
});

app.post('/search', async (req,res) => {
    let userInput = (req.body.search).toLowerCase();
    if (userInput in userInputs){
        try {
           const result = await axios.get(URL_API + `tickers/${userInputs[userInput]}`);
           res.render('search.ejs', {content: result.data})

           console.log(result.data);
        } catch (error){

            console.log(error);
            res.render('search.ejs', {error: error.response.data})

        }
    } else {
        try {
            const result = await axios.get(URL_API + `tickers/${userInput}-USD`);
            res.render('search.ejs', {content: result.data})

        } catch (error){
            console.log(error.response.data)
            res.render('search.ejs', {error: error.response.data})

        }
    }
})

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('Server is running on ', port);
});
