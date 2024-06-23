async function exportCSVFlowers(allFlowers) {
  console.log("all flowers> "+allFlowers);
  const csvContent = convertToCSV(allFlowers);
  downloadFile(csvContent, 'flowers.csv', 'text/csv');
}

async function exportJSONFlowers(allFlowers) {
  console.log("all flowers> "+allFlowers);
  const jsonContent = JSON.stringify(allFlowers, null, 2);
  downloadFile(jsonContent, 'flowers.json', 'application/json');
}



async function exportCSV() {

  const allFlowers = await getFlowers();
  console.log("all flowers> "+allFlowers);
  const csvContent = convertToCSV(allFlowers);
  downloadFile(csvContent, 'flowers.csv', 'text/csv');
}

async function exportJSON() {

  const allFlowers = await getFlowers();
  console.log("all flowers> "+allFlowers);
  const jsonContent = JSON.stringify(allFlowers, null, 2);
  downloadFile(jsonContent, 'flowers.json', 'application/json');
}
async function exportCSVVendor() {
  const plantedFlowers = await getFlowersOnStage('planted');
  const grownFlowers = await getFlowersOnStage('grown');
  const saleFlowers = await getFlowersOnStage('sale');

  const allFlowers = [...plantedFlowers, ...grownFlowers, ...saleFlowers];
  console.log("all flowers> "+allFlowers);
  const csvContent = convertToCSV(allFlowers);
  downloadFile(csvContent, 'flowers.csv', 'text/csv');
}

async function exportJSONVendor() {
  const plantedFlowers = await getFlowersOnStage('planted');
  const grownFlowers = await getFlowersOnStage('grown');
  const saleFlowers = await getFlowersOnStage('sale');

  const allFlowers = [...plantedFlowers, ...grownFlowers, ...saleFlowers];
  console.log("all flowers> "+allFlowers);
  const jsonContent = JSON.stringify(allFlowers, null, 2);
  downloadFile(jsonContent, 'flowers.json', 'application/json');
}


function convertToCSV(array) {
  if (array.length === 0) {
    return '';
  }

  const keys = Object.keys(array[0]);

  const header = keys.join(',');
  const rows = array.map(obj => keys.map(key => obj[key]).join(','));

  return `${header}\n${rows.join('\n')}`;
}

function downloadFile(content, fileName, mimeType) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
