const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greet", (name) => {
  console.log(`Hello!, ${name}!`);
});

emitter.on("goodbye", (name) => {
  console.log(`Good bye!, ${name}!`);
});

emitter.emit("greet", "Dmitrii");
emitter.emit("goodbye", "Dmitrii");

setInterval(() => {
  emitter.emit("timer", "2 seconds after");
}, 2000);

emitter.on("timer", (msg) => {
  console.log(msg);
});
