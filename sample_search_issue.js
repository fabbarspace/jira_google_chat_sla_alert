/* METODO GET */
const fetch = require('node-fetch');
fetch('https://org_name.atlassian.net/rest/api/3/search?jql=project=project_name+AND+updated>=startOfDay(-1d)+AND+resolution=Unresolved', {
  method: 'GET',
  headers: {
    'Authorization': `Basic key`,
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));


/* METODO POST */
const fetch = require('node-fetch');
const bodyData = `{
    "jql": "project = project_name \
    AND resolution = Unresolved \
    AND issuetype in (Incident, 'Service Request', 'Service Request with Approvals') \
    AND status in (Escalated, 'In Progress', Open, Pending, 'Under investigation', 'Waiting for support', 'Work in progress') \
    AND 'Time to resolution' <= remaining(15m) \
    AND 'Time to resolution' != breached()",
    "maxResults": 2,
    "fieldsByKeys": false,
    "fields": [
      "summary",
      "status",
      "Time to resolution"
    ],
    "startAt": 0
  }`;

fetch('https://org_name.atlassian.net/rest/api/3/search', {
  method: 'POST',
  headers: {
    'Authorization': `Basic key`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: bodyData
})
  .then(response => {
    console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
