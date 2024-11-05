import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
const URL_API = "https://api.blockchain.com/v3/exchange/"

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
        console.log(cryptoValues);
        res.render('index.ejs', {content: cryptoValues});

    } catch (error) {
        console.log(error);
    }
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('Server is running on ', port);
});