// test by su
const API_KEY = '568ED056-CB1F-4F76-B357-80A2600EF0BF';
let url = 'https://rest.coinapi.io/v1';
let table = document.querySelector('#cryptos_table');
// keeps a mapping so we can use a coins name to get it's asset_id
let crypto_to_name_map = []

const get_data = async () => {
  const response = await fetch(url + '/assets?apikey=' + API_KEY);
  response.json().then((data) => {
    let filtered_data = data
      .filter((coin) => coin.type_is_crypto && coin.price_usd && coin.name)
      // populate this on loading for when someone tries to search a coin later
      crypto_to_name_map = filtered_data.map((coin) => ({name: coin.name, asset_id: coin.asset_id}))
      filtered_data = filtered_data.sort((a, b) => b.price_usd - a.price_usd)
                                   .slice(0, 5);
    render_data(filtered_data);
  });
};

const render_data = (data, searched_crypto=null) => {
  // If the person did a search we want to populate the hidden table and make it appear
  if (searched_crypto) {
    table = document.getElementById('searched_cryptos_table');
    const search_table = document.querySelector('.searched-coins');
    search_table.style.display = "block";
  }
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

    let td6 = document.createElement('td');
    td5.innerText = "NOT AVAILABLE";

    let td7 = document.createElement('td');
    td5.innerText = "<3";

    tr.append(td1, td2, td3, td4, td5, td6, td7);

    table.append(tr);
    
  });
};

const get_coin = async (asset_id) => {
  const response = await fetch(`${url}/assets/${asset_id}?apikey=` + API_KEY);

  const data =  await response.json()
  return data
}

const searchCoin = async (e) => {
  e.preventDefault()
  // Get coin to search for from text field
  const search_term = document.getElementById("searchTxt").value;
  let asset_id = crypto_to_name_map.find(coin => coin.name.toLowerCase() === search_term.toLowerCase()).asset_id
  const received_coin = await get_coin(asset_id)
  render_data(received_coin, searched_crypto=true)
}

get_data();

document.getElementById('searchBtn').addEventListener("click", searchCoin)
