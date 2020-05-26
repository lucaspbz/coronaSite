const todayUrl = 'https://covid19-brazil-api.now.sh/api/report/v1';
let todayDateTime = '';
let yesterdayDate = '';
let yesterdayUrl = '';
let updatedField = null;
let totalCasesField = null;
let totalDeathsField = null;

const todayCases = [];
const yesterdayCases = [];

window.addEventListener('load', async () => {
  console.log('Starting...');

  totalCasesField = document.querySelector('#casosTotal');
  totalDeathsField = document.querySelector('#mortesTotal');
  updatedField = document.querySelector('#atualizado');

  await fetchData(todayUrl, todayCases);
  getTodayDate();
  await fetchData(yesterdayUrl, yesterdayCases);
  render();
});

function getTodayDate() {
  var dateTime = todayCases[0].datetime;
  console.log(dateTime);
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const date = new Date(dateTime);
  todayDateTime = new Intl.DateTimeFormat('pt-BR', options).format(date);
  console.log(`Today dateTime: ${todayDateTime} `);
  var dt = new Date(dateTime);
  let yesterdayDate = dt.setDate(dt.getDate() - 1);

  yesterdayDate = Intl.DateTimeFormat('en-US').format(yesterdayDate);
  yesterdayDate = new Date(yesterdayDate).toISOString();
  yesterdayDate = yesterdayDate.slice(0, 10);
  yesterdayDate = yesterdayDate.replace('-', '');
  yesterdayDate = yesterdayDate.replace('-', '');
  console.log(`Yesterday DateTime: ${yesterdayDate}`);

  console.log(`Atualizado em ${todayDateTime}. `);
  updatedField.textContent = `Atualizado em ${todayDateTime}. `;

  yesterdayUrl = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/${yesterdayDate}`;
}

async function fetchData(url, arr) {
  console.log(`Fetching data from: ${url}`);

  const res = await fetch(url);
  const json = await res.json();
  console.log('Data fetched successfully');

  json.data.forEach((element) => {
    arr.push(element);
  });

  console.log(arr);
}

function render() {
  let innerHTML = '';
  const totalCases = todayCases.reduce((total, current) => {
    return total + current.cases;
  }, 0);
  const totalDeaths = todayCases.reduce((total, current) => {
    return total + current.deaths;
  }, 0);
  totalCasesField.textContent = `Total de casos hoje: ${totalCases}`;
  totalDeathsField.textContent = `Total de mortes hoje: ${totalDeaths}`;
  console.log(`Yesterday cases: ${yesterdayCases}`);

  for (let i = 0; i < todayCases.length; i++) {
    let yesterdayDeaths = 0,
      yesterdayQuantityCases = 0;
    if (yesterdayCases.lenght > 1) {
      yesterdayDeaths = yesterdayCases[i];
      yesterdayQuantityCases = yesterdayCases[i];
    }

    let { uf, cases, deaths } = todayCases[i];
    innerHTML += `  <tr>
    <th scope="row">${uf}</th>
    <td>${cases}</td>
    <td>${cases - yesterdayQuantityCases}</td>
    <td>${deaths}</td>
    <td>${deaths - yesterdayDeaths}</td>
    <td>${Intl.NumberFormat('pt-BR').format(
      (deaths / totalDeaths) * 100
    )} %</td>
    <td>${Intl.NumberFormat('pt-BR').format((cases / totalCases) * 100)}%</td>
  </tr>`;
  }
  const table = document.querySelector('#table');
  table.innerHTML = innerHTML;
}
