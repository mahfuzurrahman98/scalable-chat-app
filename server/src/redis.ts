import Redis from "ioredis";

const pub = new Redis({
    host: "",
    port: 0,
    username: "",
    password: "",
});

const sub = new Redis({
    host: "",
    port: 0,
    username: "",
    password: "",
});

export { pub, sub };
