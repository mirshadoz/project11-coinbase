const API_KEY = '568ED056-CB1F-4F76-B357-80A2600EF0BF';
const BASE_URL = 'https://rest.coinapi.io';

const get_datas = () => {
  fetch(`${BASE_URL}/v1/assets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CoinAPI-Key': API_KEY,
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          const datas = json
          const cryptos = datas.filter(data => data.type_is_crypto)
          const sorted_cryptos = [...cryptos] // Do a copy because sort() affects in place
          sorted_cryptos.sort((crypto_1, crypto_2) => {
            return crypto_2.price_usd - crypto_1.price_usd
          })
          const cryptos_to_display = sorted_cryptos.slice(0, 5);

          let table_cryptos = ''
          cryptos_to_display.forEach(crypto => {
            table_cryptos += "<tr>";
            table_cryptos += `<td> ${crypto.name} </td>`;
            table_cryptos += `<td> ${crypto.asset_id} </td>`;
            table_cryptos += `<td> ${crypto.price_usd.toFixed(1)} </td>`;
            table_cryptos += `<td> ${Number(crypto.volume_1day_usd.toExponential()).toPrecision(2)} </td>`;
            table_cryptos += `<td> ${crypto.price_usd.toFixed(1)} </td>`; // API doesn't ruturn market cap
            table_cryptos += `<td> NOT AVAILABLE</td>`;
            table_cryptos += `<td><3</td></tr>`;
          })
          document.getElementById('table_cryptos').innerHTML = table_cryptos
          console.log('sorted_cryptos', sorted_cryptos);
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
};

get_datas();
