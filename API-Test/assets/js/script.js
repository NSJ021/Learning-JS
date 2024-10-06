const API_KEY = "reFkzfQbZMET3Rbfg0xTQCKG1_c";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(
  document.getElementById("resultsModal")
);

// Getting elements form index.html via ID
document
  .getElementById("status")
  .addEventListener("click", (e) => getStatus(e));
document.getElementById("submit").addEventListener("click", (e) => postForm(e));

/**
 * async function to get the status of the API key
 * @param {*} e
 */
async function getStatus(e) {
  const queryString = `${API_URL}?api_key=${API_KEY}`;

  const response = await fetch(queryString);

  const data = await response.json();

  if (response.ok) {
    displayStatus(data);
  } else {
    displayException(data);
    throw new Error(data.error);
  }
}

/**
 * Function to display the status of the API key, linked to modal popup for check key button.
 * @param {*} data
 */
function displayStatus(data) {
  let heading = "API Key Status";
  let results = `<div>Your key is valid until</div>`;
  results += `<div class="key-status">${data.expiry}</div>`;

  document.getElementById("resultsModalTitle").innerText = heading;
  document.getElementById("results-content").innerHTML = results;

  resultsModal.show();
}

/**
 * async function for posting the form and its data
 * @param {*} e
 */
async function postForm(e) {
  const form = processOptions(
    new FormData(document.getElementById("checksform"))
  );

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: API_KEY,
    },
    body: form,
  });

  const data = await response.json();

  if (response.ok) {
    displayErrors(data);
  } else {
    displayException(data);
    throw new Error(data.error);
  }
}

/**
 * Display errors function, setups content to run checks button, loops through all errors then displays them in a modal.
 * @param {*} data
 */
function displayErrors(data) {
  let heading = `JSHint Result for ${data.file}`;

  if (data.total_errors === 0) {
    result = `<div class="no_errors">No Errors Reported</div>`;
  } else {
    results = `<div>Total Errors <span class="error_count">${data.total_errors}</span></div>`;
    for (let error of data.error_list) {
      results += `<div>At line <span class="line">${error.line}</span>, `;
      results += `column <span class="column">${error.col}</span></div>`;
      results += `<div class="error">${error.error}</div>`;
    }
  }
  document.getElementById("resultsModalTitle").innerText = heading;
  document.getElementById("results-content").innerHTML = results;
  resultsModal.show();
}

/**
 * Process Options function, creates an array, loops through all entries tags as options, pushes value of each entry into array, deletes old options and joins array to create string
 * @param {*} form
 * @returns
 */
function processOptions(form) {
  let optArray = [];

  for (let entry of form.entries()) {
    if (entry[0] === "options") {
      optArray.push(entry[1]);
    }
  }
  form.delete("options");
  form.append("options", optArray.join());

  return form;
}

/**
 * Display Exception function, sets up modal to display any exception that was thrown by an error
 * @param {*} data 
 */
function displayException(data){

    let heading = `An exception occurred`;

    results = `<div>The API returned ${data.status_code}</div>`;
    results += `<div>Error number: <strong>${data.error_no}</strong></div>`;
    results += `<div>Error test: <strong>${data.error}</strong></div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}
