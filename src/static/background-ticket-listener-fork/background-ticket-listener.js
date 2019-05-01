/**
 * Note that this runs forked in the background
 * (does not run in webpack)
 */

const fs = require('fs');
const path = require('path');
const mqtt = require('mqtt');

// http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/errata01/os/mqtt-v3.1.1-errata01-os-complete.html
let mqttClientHandle;

process.on('message', (action) => {
  if (action.type === 'START_LISTENING') {
    let mqttReconnectCount = 0;

    // NOTE: these values have been redacted and they are here for the demo's simplicity
    const mqttProtocol = 'mqtts';
    const mqttHost = 'my-dev-server.intranet.com';
    const mqttPort = 8883;
    const mqttPfx = path.join(__dirname, '..', 'certs', 'cert-for-my-dev-server.pfx');
    const mqttPassphrase = 'redacted';
    const mqttCa = path.join(__dirname, '..', 'certs', 'my-corp-root-CA-G2.pem');
    const mqttUser = 'mqttuser';
    const mqttPass = 'mqttpass';
    const mqttConString = `${mqttProtocol}://${mqttHost}:${mqttPort}`;
    const subscribeString = '/something/something/something/#';

    const mqttConfig = {
      username: mqttUser,
      password: mqttPass,
      pfx: fs.readFileSync(mqttPfx),
      passphrase: mqttPassphrase,
      ca: fs.readFileSync(mqttCa),
    };
    console.log('mqttConfig: ', mqttConfig);

    mqttClientHandle = mqtt.connect(mqttConString, mqttConfig);

    mqttClientHandle.subscribe(subscribeString);

    mqttClientHandle.on('reconnect', () => {
      console.log('mqttReconnectCount: ', mqttReconnectCount);
      mqttReconnectCount += 1;
    });

    mqttClientHandle.on('message', (topic, message) => {
      console.log('topic: ', topic);
      console.log('message: ', message.toString());
    });
  }
});

process.on('disconnect', () => {
  console.log('received process disconnect');
  mqttClientHandle.end();
});
