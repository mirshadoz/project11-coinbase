const API_KEY = '90BC9695-397B-4C36-ADC5-1B145E732BDC';
let url = 'https://rest.coinapi.io/v1';
let icons_url = 'https://rest.coinapi.io/v1/assets/icons/{14px}';
let table = document.querySelector('#cryptos_table');
let input = document.querySelector('#searchTxt');
let search_result = document.querySelector('.searched-crypto');
let chart_btn = document.querySelector('#chart_btn');

// keeps a mapping so we can use a coins name to get it's asset_id
let crypto_to_name_map = [];
// let crypto_to_icon_map = [];

// const get_icon = async (id) => {
//   const response = await fetch(icons_url + '?apikey=' + API_KEY);
//   response.json().then((data) => {
//     data.filter((coin) => coin.asset_id === id).url;
//   });
// };

const get_data = async () => {
  const response = await fetch(url + '/assets?apikey=' + API_KEY);
  response.json().then((data) => {
    let filtered_data = data
      .filter((coin) => coin.type_is_crypto)
      .sort((a, b) => b.price_usd - a.price_usd);

    crypto_to_name_map = filtered_data.map((coin) => ({
      name: coin.name,
      asset_id: coin.asset_id,
    }));

    render_data(filtered_data);
  });
};

const render_data = (data) => {
  data.slice(0, 5).forEach((coin) => {
    let tr = document.createElement('tr');
    // let td0 = document.createElement('td');
    // let img = document.createElement('img');
    // img.src = get_icon(coin.asset_id);
    // td0.innerHtml += img;

    let td1 = document.createElement('td');
    td1.innerText = coin.name;

    let td2 = document.createElement('td');
    td2.innerText = coin.asset_id;

    let td3 = document.createElement('td');
    td3.innerText = `$ ${coin.price_usd.toLocaleString()}`;

    let td4 = document.createElement('td');
    td4.innerText = `$ ${coin.volume_1day_usd.toLocaleString()}`;

    let td5 = document.createElement('td');
    td5.innerText = `$ ${coin.volume_1mth_usd.toLocaleString()}`;

    tr.append(td1, td2, td3, td4, td5);

    table.append(tr);
  });
};

const get_coin = async (asset_id) => {
  const response = await fetch(`${url}/assets/${asset_id}?apikey=` + API_KEY);
  const data = await response.json();
  return data;
};

const render_searched_coin = (data) => {
  search_result.innerHTML = '';
  if (data) {
    const content = `  
      <div class='card coin_name'>
        <p class='card_title'>Name</p>
        <p class='card_data'>${data[0].name}</p>
      </div>
      <div class='card coin_symbol'>
        <p class='card_title'>Symbol</p>
        <p class='card_data'>${data[0].asset_id}</p>
      </div>
      <div class='card coin_price'>
        <p class='card_title'>Price</p>
        <p class='card_data'>$${data[0].price_usd.toLocaleString()}</p>
      </div>
      <div class='card coin_volD'>
        <p class='card_title'>Volume 1Day</p>
        <p class='card_data'>$${data[0].volume_1day_usd.toLocaleString()}</p>
      </div>
      <div class='card coin_volM'>
        <p class='card_title'>Volume 1Month</p>
        <p class='card_data'>$${data[0].volume_1mth_usd.toLocaleString()}</p>
      </div>
    `;
    search_result.innerHTML += content;
  } else {
    const content = `<div class='not_found'>No result found! Try again..</div>`;
    search_result.innerHTML += content;
  }
};

const searchCoin = async (e) => {
  e.preventDefault();

  const search_term = input.value;

  let search_result = crypto_to_name_map.find((coin) =>
    coin.name ? coin.name.toLowerCase() === search_term.toLowerCase() : null,
  );

  if (search_result) {
    const received_coin = await get_coin(search_result.asset_id);
    render_searched_coin(received_coin);
  } else {
    render_searched_coin(null);
  }

  input.value = '';
};

document.getElementById('searchBtn').addEventListener('click', searchCoin);

const show_graph = () => {
  let chart = document.querySelector('.chart-main');
  if (chart.style.display === 'none' || chart.style.display === '') {
    chart.style.display = 'flex';
    chart_btn.innerText = 'Hide Graph';
  } else {
    chart.style.display = 'none';
    chart_btn.innerText = 'Show Graph';
  }
};

get_data();
