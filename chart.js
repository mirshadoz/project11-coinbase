/*
Todos:
1. Draw grid
2. Specify width and height for the canvas - chart.
3. Create and apply sample data(X-axis - year, Y-axis - price $)

*/
let canvas = document.querySelector('canvas');
canvas.width = 515;
canvas.height = 350;
let xGrid = 5;
let yGrid = 5;
let cryptoPriceLegendMax = 45000;

const data = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '35414.13',
  },
  {
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    price: '35411.83',
  },
  {
    name: 'Bitcoin BEP2',
    symbol: 'BTCB',
    price: '35368.08',
  },
  {
    name: 'yearn.finance',
    symbol: 'YFI',
    price: '33507',
  },
  {
    name: 'Maker',
    symbol: 'MKR',
    price: '2769.81',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: '2317.03',
  },
  {
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    price: '517.74',
  },
  {
    name: 'Compound',
    symbol: 'COMP',
    price: '403.11',
  },
  {
    name: 'Binance Coin',
    symbol: 'BNB',
    price: '304.59',
  },
  {
    name: 'Aave',
    symbol: 'AAVE',
    price: '268.79',
  },
];

const blocks = (num) => {
  return num * 5;
};

const drawGrid = () => {
  // console.log("drawGrid works!");
  let ctx = canvas.getContext('2d');

  while (xGrid < canvas.height) {
    ctx.moveTo(0, xGrid);
    ctx.lineTo(canvas.width, xGrid);
    xGrid += 5;
  }

  while (yGrid < canvas.width) {
    ctx.moveTo(yGrid, 0);
    ctx.lineTo(yGrid, canvas.width);
    yGrid += 5;
  }

  ctx.strokeStyle = 'lightgrey';
  ctx.stroke();
};

const drawAxis = () => {
  let ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(blocks(10), 5);
  ctx.lineTo(blocks(10), canvas.height - blocks(10));
  ctx.lineTo(canvas.width - 6, canvas.height - blocks(10));
  ctx.strokeStyle = 'black';
  ctx.stroke();
};

const drawPriceLegend = () => {
  let num = blocks(15);
  let ctx = canvas.getContext('2d');
  const zeroPoint = { x: blocks(10), y: canvas.height - blocks(15) };
  // console.log("zeroPoint ", zeroPoint);

  ctx.beginPath();
  ctx.strokeStyle = 'grey';

  for (
    let cryptoPrice = 0;
    cryptoPrice <= cryptoPriceLegendMax;
    cryptoPrice += 15000
  ) {
    ctx.strokeText(`$${cryptoPrice}`, blocks(2), canvas.height - num);
    ctx.moveTo(blocks(10), canvas.height - num); // Draw price legend's straight line
    ctx.lineTo(canvas.width - blocks(1), canvas.height - num); // Draw price legend's straight line
    // console.log(cryptoPrice);
    // console.log(canvas.height-num);
    num += blocks(15);
  }

  ctx.stroke();
};

const drawPriceLineChart = () => {
  let temp = 20;
  let xPlot = 0;
  const xyLast = canvas.height - blocks(15);
  let ctx = canvas.getContext('2d');
  const tempPosition = { x: blocks(15), y: canvas.height - blocks(15) };
  ctx.beginPath();
  ctx.moveTo(blocks(15), canvas.height - blocks(15)); // Set initial state for price

  data.forEach((crypto) => {
    ctx.lineTo(
      blocks(temp + xPlot),
      tempPosition.y - Number(crypto.price) / 200,
    );
    ctx.arc(
      blocks(temp + xPlot),
      tempPosition.y - Number(crypto.price) / 200,
      3,
      0,
      Math.PI * 2,
      true,
    );
    ctx.strokeText(
      crypto.symbol,
      blocks(temp + xPlot),
      tempPosition.y - Number(crypto.price) / 200,
    );
    xPlot += 8;
  });

  ctx.stroke();
};

if (canvas.getContext) {
  // drawGrid();
  drawAxis();
  drawPriceLegend();
  drawPriceLineChart();
}
