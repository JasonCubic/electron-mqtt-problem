const path = require('path');
const childProcess = require('child_process');

function setupBackgroundTicketListener() {
  const backgroundTicketListenerFile = path.join(__dirname, '..', 'static', 'background-ticket-listener-fork', 'background-ticket-listener');
  const cwd = path.join(__dirname, '..', 'static');
  console.log('starting child process: ', backgroundTicketListenerFile);
  const backgroundTicketListener = childProcess.fork(backgroundTicketListenerFile, [], { cwd });
  backgroundTicketListener.on('message', (action) => {
    switch (action.type) {
      case 'TICKET_FROM_MQTT':
        callback(action);
        break;
      default:
    }
  });
  backgroundTicketListener.send({
    type: 'START_LISTENING',
    payload: {}, // for demo project leaving this empty
  });

}

module.exports = setupBackgroundTicketListener;
