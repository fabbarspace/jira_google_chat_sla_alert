/* SEKIRO - SLA BOT */

//Webhook criado no grupo do hangout
const webhookURL = 'https://chat.googleapis.com/v1/spaces/AAAAb21V7bc/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=zLEsFddu18maBSMXmry1_YVw3_gL73HQj764KEZ1HQc%3D';
const fetch = require('node-fetch');
const date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo'});
const jiraAPI = 'https://bmsixcloud.atlassian.net/rest/api/3/search';
const jiraAuthorization = 'bm9jLmJvdEBibXNpeC5jb206ZFFhM3FDWlBlZmVoU3BuZWl1Y3MyREIw';

//Define a busca para SLA de Primeira Resposta
const jiraSearchFirstResponse = `{
  "jql": "project = SEAD \
  AND resolution = Unresolved \
  AND issuetype in (Incident, 'Service Request', 'Service Request with Approvals') \
  AND status in (Escalated, 'In Progress', Open, Pending, 'Under investigation', 'Waiting for support', 'Work in progress') \
  AND 'time to first response' <= remaining(15m) \
  AND 'time to first response' != breached()",
  "maxResults": 10,
  "fieldsByKeys": false,
  "fields": [
    "summary",
    "status",
    "Time to first response"
  ],
  "startAt": 0
}`;
searchSLA(jiraSearchFirstResponse, `Alerta SLA de Primeira Resposta`)

//Define a busca para SLA de Resolucao
const jiraSearchResolution = `{
  "jql": "project = SEAD \
  AND resolution = Unresolved \
  AND issuetype in (Incident, 'Service Request', 'Service Request with Approvals') \
  AND status in (Escalated, 'In Progress', Open, Pending, 'Under investigation', 'Waiting for support', 'Work in progress') \
  AND 'Time to resolution' <= remaining(15m) \
  AND 'Time to resolution' != breached()",
  "maxResults": 10,
  "fieldsByKeys": false,
  "fields": [
    "summary",
    "status",
    "Time to resolution"
  ],
  "startAt": 0
}`;
searchSLA(jiraSearchResolution, `Alerta SLA de Resolucao`)

//Busca os chamados no Jira
function searchSLA(jiraSearch,slaType) {
fetch(jiraAPI, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${jiraAuthorization}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  body: jiraSearch
})
.then(res => res.json()) 
.then((out) => {
    //console.log('Output: ', out);
    const issues = out.issues
    for (var i = 0; i < issues.length; i++){
      const mensagem = JSON.stringify({'text': `${date} - [${slaType}] - [CHAMADO]: ${issues[i].key} [ASSUNTO]: ${issues[i]['fields']['summary']} [LINK]: https://bmsixcloud.atlassian.net/jira/servicedesk/projects/SEAD/queues/custom/1/${issues[i].key} `,});
      console.log(mensagem)
      postChatMessage(mensagem)
} 
}).catch(err => console.error(err));
};

// Posta a mensagem no Hangout via Webhook
function postChatMessage(mensagem) {
fetch(webhookURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: mensagem,
}).then((response) => {
  //console.log(response);
});
};