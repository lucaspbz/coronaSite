let campoCasosTotal = null,
  campoCasosCe = null;
window.addEventListener('load', () => {
  console.log('Starting...');
  campoCasosTotal = document.querySelector('#casosTotal');
  campoCasosCe = document.querySelector('#casosCe');
  console.log('Campos carregados');

  getCases();
});

function getCases() {
  console.log('Fetching data from API...');

  fetch('https://covid19-brazil-api.now.sh/api/report/v1').then((res) => {
    res.json().then((cases) => {
      console.log('Data fetched successfully');
      console.log(cases);
      let allCases = cases.data;
      console.log(cases.data[0].cases);
      main(allCases);
    });
  });
}

function main(data) {
  console.log(data);

  const totalCases = data.reduce((total, current) => {
    return total + current.cases;
  }, 0);
  const casosCe = data[2].cases;
  console.log(casosCe);
  console.log(totalCases);

  campoCasosTotal.textContent = totalCases;
  campoCasosCe.textContent = casosCe;
}
