
const API_KEY =  "568ED056-CB1F-4F76-B357-80A2600EF0BF";
const BASE_URL = 'https://rest.coinapi.io';

const get_datas = () => {
    fetch(`${BASE_URL}/v1/assets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CoinAPI-Key": API_KEY,
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
            if (response.ok) {
                response.json().then((json) => console.log(json))
            }
        }).catch(error => {
            console.log('error', error);
        })

}

get_cryptos()
