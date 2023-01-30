document.body.onload(main());

/*
  This program is a simple example of how to download a CSV file from a web page and how to create a CSV file from an array of data.
  The program is a simple form that allows you to enter a name and age and then save the data to a CSV file.
  */

function main(){
  const csvData = [['name', 'age']];
  document.querySelector('#add').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    if (!name || !age){
      alert('Please fill in all fields');
      return;
    }
    const data = [name, age];
    document.querySelector('#data').innerHTML += `<tr><td>${data[0]}</td><td>${data[1]}</td></tr>`;
    csvData.push(data);
  });
  
  document.querySelector('#save').addEventListener('click', () => {
    downloadCsv(exportToCsv(csvData));
  });
  
}

function exportToCsv(data){
  let csv = '';
  data.forEach((row) => {
    csv += row.join(',');
    csv += "\n";
  });
  return encodeURI(csv)
}

function downloadCsv(csv){
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + csv);
  link.setAttribute('download', 'data.csv');
  link.click();
}
