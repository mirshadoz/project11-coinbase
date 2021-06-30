const API_KEY = '8f58eee1-bf6a-4db6-b503-22f925fb5087';
// const BASE_URL = 'https://static.coinpaper.io/';
const BASE_URL = 'https://pro-api.coinmarketcap.com';
const proxy_URL = "https://cors-anywhere.herokuapp.com/"
let myCryptoCurrencies = [];

//         table_cryptos += `<td> ${crypto.name} </td>`;
//         table_cryptos += `<td> ${crypto.asset_id} </td>`;
//         table_cryptos += `<td> ${crypto.price_usd.toFixed(1)} </td>`;
//         table_cryptos += `<td> ${Number(crypto.volume_1day_usd.toExponential()).toPrecision(2)} </td>`;
//         table_cryptos += `<td> ${crypto.price_usd.toFixed(1)} </td>`; // API doesn't ruturn market cap



// Using Asynchronous function to fetch data
const get_datas = async () => {
  console.log("get_datas")
  // assigning fetch promise to response variable and waiting for fetch promise to complete & resolve
  let response = await fetch(`${proxy_URL}${BASE_URL}/v1/cryptocurrency/listings/latest?start=1&limit=5`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': API_KEY,
      'Access-Control-Allow-Origin': '*',
    },
  });
  // assigning and waiting until response data converts to json
  let data = await response.json();
  let cryptos = data.data;
  console.log('data', data.data);

  // variable to hold the HTML to be added to the DOM
  let table_cryptos = '';
  cryptos.forEach(crypto => {
    table_cryptos += '<tr>';
    table_cryptos += `<td> ${crypto.name} </td>`;
    table_cryptos += `<td> ${crypto.symbol} </td>`;
    table_cryptos += `<td> ${crypto.quote.USD.price.toFixed(1)} </td>`;
    table_cryptos += `<td> ${Number(crypto.quote.USD.volume_24h.toExponential()).toPrecision(2)} </td>`;
    table_cryptos += `<td> ${crypto.quote.USD.percent_change_24h.toFixed(1)} </td>`;
    table_cryptos += `<td> ${crypto.quote.USD.market_cap.toFixed(1)} </td>`; 
    table_cryptos += `<td> <3 </td></tr>`;
  })

  document.getElementById('cryptos_table').innerHTML = table_cryptos;

};

get_datas();
