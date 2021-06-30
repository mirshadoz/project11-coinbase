const API_KEY = 'FBEF4F89-9271-43CA-8730-41BBAAD92EFE';
const BASE_URL = 'https://rest.coinapi.io';
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
  let response = await fetch(`${BASE_URL}/v1/assets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CoinAPI-Key': API_KEY,
      'Access-Control-Allow-Origin': '*',
    },
  });
  // assigning and waiting until response data converts to json
  let data = await response.json();
  // Get only crypto currencies
  const onlyCrypto = data.filter(curr => {
    return curr.type_is_crypto && curr.price_usd;
  });
  // Sort array of objects by price_usd
  const sortedOnlyCrypto = onlyCrypto.sort((first, second) => first.price_usd - second.price_usd)
  sortedOnlyCrypto.forEach(item => console.log(item));
  
};

get_datas();
