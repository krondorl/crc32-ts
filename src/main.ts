/*!
 * crc32-ts
 *
 * Copyright (c) 2025- Adam Burucs
 *
 * MIT Licensed
 */

import { calculateCrc } from "./index.js";

const encoder = new TextEncoder();

function printIntro(): void {
  console.log();
  console.log("Crc32 library test");
  console.log();
}

function printCrc(text: string): void {
  const uInt8Array = encoder.encode(text);
  console.log(`string ${text}`);

  try {
    const crcResult = calculateCrc(uInt8Array);
    console.log(`✅ crc32 value 0x${crcResult.toString(16)}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("🔴 An error occurred: ", error.message);
    } else {
      console.error("🔴 An unknown error occurred: ", error);
    }
  }

  console.log();
}

printIntro();
printCrc("1234567");
printCrc("");
