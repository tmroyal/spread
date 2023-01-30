main();

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
    if (isNaN(age)){
      alert('Age must be a number');
      return;
    }
    const data = [name, age];
    csvData.push(data);
    redrawTable(csvData);
  });
  
  document.querySelector('#clear').addEventListener('click', () => {
    const name = document.querySelector('#name');
    const age = document.querySelector('#age');
    name.value = '';
    age.value = '';
  });
  
  document.querySelector('#save').addEventListener('click', () => {
    downloadCsv(exportToCsv(csvData));
  });
}

function removeRow(data, index){
  data.splice(index, 1);
  redrawTable(data);
}

function redrawTable(data){
  const table = document.querySelector('#data');
  table.innerHTML = '';
  data.forEach((row, i) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      if (i === 0){
        const th = document.createElement('th');
        th.innerText = cell; 
        tr.appendChild(th);
      } else { 
        const td = document.createElement('td');
        td.innerText = cell;
        tr.appendChild(td);
      }
    });
    if (i !== 0) {
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.addEventListener('click', () => {
        removeRow(data, data.indexOf(row));
      });
      tr.appendChild(removeButton);
    }
    table.appendChild(tr);
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
