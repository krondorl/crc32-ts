/*!
 * crc32-ts
 *
 * Copyright (c) 2025- Adam Burucs
 *
 * MIT Licensed
 */

export class Crc32 {
  #CRC32_POLYNOMIAL = 0xedb88320;
  #table = new Uint32Array(256).fill(0);

  constructor() {
    this.#generateTable();
  }

  #generateTable(): void {
    for (let i = 0; i < 256; i++) {
      let crc = i;
      for (let j = 0; j < 8; j++) {
        if (crc & 1) {
          crc = (crc >>> 1) ^ this.#CRC32_POLYNOMIAL;
        } else {
          crc = crc >>> 1;
        }
      }
      this.#table[i] = crc;
    }
  }

  calculateCrc(data: Uint8Array): number {
    if (!data || !(data instanceof Uint8Array)) {
      throw new Error("Invalid input: data must be a Uint8Array.");
    }

    if (data.length === 0) {
      throw new Error("Cannot calculate CRC for an empty data array.");
    }

    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
      crc = (crc >>> 8) ^ this.#table[(crc ^ data[i]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  }
}
