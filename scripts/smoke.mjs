import { Crc32 } from "../dist/index.js";

const crc = new Crc32();
const encoder = new TextEncoder();
const data = encoder.encode("smoke-test");

console.log("crc(smoke-test)=0x" + crc.calculateCrc(data).toString(16));
