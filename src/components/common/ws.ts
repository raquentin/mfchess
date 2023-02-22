import { MouseEventHandler, MouseEvent } from 'react';

const ws: WebSocket = new WebSocket('ws://localhost:4000')
// const ws: WebSocket = new WebSocket('http://localhost:3000')

console.log(ws.url)
// const ws = new WebSocket('ws://www.localhost:3000');

// ws.onerror('error', console.error);

// ws.onopen('open', function open() {
//   ws.send('something');
// });

// ws.on('message', function message(data) {
//   console.log('received: %s', data);
// });

ws.onopen = () => console.log("connected")

ws.onmessage = (byteString) => {
    console.log("A")
    console.log(byteString.data)
    // const { data } = byteString;
    // const payload = JSON.parse(data);
    // console.log(payload)
}

const sendMessage = (message: string) => {
    ws.send(message);
}

export default sendMessage