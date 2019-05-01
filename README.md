# electron/mqtt problem synopsis

this is a simple project to show a problem that I am having getting the mqtts protocol to work in newer versions of electron.

Electron seems to be intercepting the mqtts protocol.  This is causing a forked process that listens to mqtts to fail.

Something in electron 4 caused this to fail because it works in older versions of electron

* v2.0.6 - mqtts works
* v3.1.9 - mqtts works
* v4.1.5 - mqtts does not work
* v5.0.0 - mqtts does not work


---

# error text:
```
Error: Client network socket disconnected before secure TLS connection was established
    at TLSSocket.onConnectEnd (_tls_wrap.js:1296:19)
    at Object.onceWrapper (events.js:282:20)
    at TLSSocket.emit (events.js:199:15)
    at endReadableNT (_stream_readable.js:1141:12)
    at processTicksAndRejections (internal/process/task_queues.js:81:17)
Emitted 'error' event at:
    at TLSSocket.handleTLSerrors (C:\node_sandbox\electron-mqtt-test-2\node_modules\mqtt\lib\connect\tls.js:26:18)
    at TLSSocket.emit (events.js:199:15)
    at emitErrorNT (internal/streams/destroy.js:91:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:59:3)
    at processTicksAndRejections (internal/process/task_queues.js:81:17)

```