// test by su
const API_KEY = '5B70D57A-CFE9-4BE6-B508-964950BF694C';
let url = 'https://rest.coinapi.io/v1/assets?apikey=';
let table = document.querySelector('#cryptos_table');

const get_data = async () => {
  const response = await fetch(url + API_KEY);

  response.json().then((data) => {
    let filtered_data = data
      .filter((coin) => coin.type_is_crypto)
      .sort((a, b) => b.price_usd - a.price_usd)
      .slice(0, 5);

    console.log(filtered_data);

    render_data(filtered_data);
  });
};

const render_data = (data) => {
  data.forEach((coin) => {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.innerText = coin.name;

    let td2 = document.createElement('td');
    td2.innerText = coin.asset_id;

    let td3 = document.createElement('td');
    td3.innerText = `$ ${coin.price_usd.toFixed(3)}`;

    let td4 = document.createElement('td');
    td4.innerText = coin.volume_1day_usd;

    let td5 = document.createElement('td');
    td5.innerText = coin.volume_1mth_usd;

    tr.append(td1, td2, td3, td4, td5);

    table.append(tr);
  });
};

get_data();
