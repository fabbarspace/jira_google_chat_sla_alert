# SEKIRO - BOT SLA

### Propósito
Este projeto tem como objetivo a construção de um BOT que verifica os SLA de Primeiro Atendimento e Resolução nas ferramentas ITSM e avisa o grupo de operadores se algum SLA de chamados esta prestes a vencer.

### Roadmap
- Integração com ServiceNow
- Integração com Jira C4

### Suporte
- Jira BMSIX

### Requerimentos em ambiente Ubuntu
| Packages | Info | Referência |
| ------ | ------ | ------ |
| NodeJS |  |  |
| NPM |  |  |
| node-fetch | Pacote NPM |  |

### Instalação e configuração

- clone o repositório seguindo os comandos abaixo ou baixe o pacote da aplicação dentro de uma pasta com o nome `sekiro_bot_sla`, anote o caminho para depois referenciar dentro do arquivo `sekiro_bot.sh`
```sh
$ cd workspace
$ git clone URL do Repositorio
$ cd sekiro_bot_sla
```
- instale o nodejs e as dependências se ainda não tiver instalado
```sh
$ sudo apt update
$ sudo apt install -Y nodejs npm
$ npm install node-fetch --save
```
- Pronto !

### Como configurar no servidor ubuntu para rodar automaticamente
- Não se esqueça que a instalação e configuração de dependências deve ser feita no servidor também. O caminho dentro do arquivo `sekiro_bot.sh` deve ser alterado.

- Um token para acesso a API deve ser gerado no Jira e informado no campo `jiraAuthorization` em `sekiro_bot_sla_jira.js` para que a aplicação tenha acesso ao Jira.

- Para que o programa rode a cada x minutos, vamos usar o arquivo `sekiro_bot.sh`, esse arquivo chama o programa `sekiro_bot_sla_jira.js` que faz a checagem de SLA via node. Dessa forma fica mais fácil incluir o arquivo `.sh` no crontab do Ubuntu. Ele também vai gerar um arquivo de log local.

- No crontab do Ubuntu, editamos com o seguinte comando
```sh
crontab -e
```

- Depois editamos o arquivo para que o nosso script seja chamado a cada x minutos, nesse caso a cada 7 minutos.
```sh
# Edit this file to introduce tasks to be run by cron.
#
# Each task to run has to be defined through a single line
# indicating with different fields when the task will be run
# and what command to run for the task
#
# To define the time you can provide concrete values for
# minute (m), hour (h), day of month (dom), month (mon),
# and day of week (dow) or use '*' in these fields (for 'any').#
# Notice that tasks will be started based on the cron's system
# daemon's notion of time and timezones.
#
# Output of the crontab jobs (including errors) is sent through
# email to the user the crontab file belongs to (unless redirected).
#
# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
#
# For more information see the manual pages of crontab(5) and cron(8)
#
# m h  dom mon dow   command
*/7 * * * * /home/fabriciobar/sekiro_bot_sla/sekiro_bot.sh
```

- Pronto !


