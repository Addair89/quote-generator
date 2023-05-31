//https://twitter.com/intent/tweet
let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const newQuoteBtn = document.getElementById('new-quote');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const loader =document.getElementById('loader');


//Pick and Show New Quote
function newQuote() {
    loader.hidden = true;
    quoteContainer.hidden = false;
    //Pick randon quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    author.textContent = quote.author ? `--${quote.author}` : 'unknown';

    //check if quote length is long and decrease font size
   if(quote.text.length > 125) {
    quoteText.classList.add('long-quote');
   } else {
    quoteText.classList.remove('long-quote');
   }
   quoteText.textContent = quote.text;

}

// Get Quotes from above API
async function getQuotes() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    const apirURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const resp = await fetch(apirURL);
        apiQuotes = await resp.json();
        newQuote();
    } catch (error) {
        //Catch Error here
    }
}

//tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

//On Load
 getQuotes();

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);