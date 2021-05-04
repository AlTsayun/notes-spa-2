export function wsSend(client, message) {
    if (client.readyState !== client.OPEN) {
        console.log('Ws client is in state', client.readyState, 'and not yet ready for sending', message)
        setTimeout(() => {wsSend(client, message)}, 1000)
    } else {
        client.send(message)
        console.log('Ws message successfully sent', message)
    }
}