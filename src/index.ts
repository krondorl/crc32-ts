/*!
 * crc32-ts
 *
 * Copyright (c) 2025- Adam Burucs
 *
 * MIT Licensed
 */

class InvalidInputError extends Error {
  constructor(public data: Uint8Array) {
    super("Invalid input: data must be a Uint8Array.");
    this.name = "InvalidInputError";
  }
}

class EmptyDataArrayError extends Error {
  constructor(public data: Uint8Array) {
    super("Cannot calculate CRC for an empty data array.");
    this.name = "EmptyDataArrayError";
  }
}

const CRC32_POLYNOMIAL = 0xedb88320;
const TABLE = new Uint32Array(256);

/**
 * Precalculate lookup table.
 */
for (let i = 0; i < 256; i++) {
  let crc = i;
  for (let j = 0; j < 8; j++) {
    if (crc & 1) {
      crc = (crc >>> 1) ^ CRC32_POLYNOMIAL;
    } else {
      crc = crc >>> 1;
    }
  }
  TABLE[i] = crc;
}

/**
 * This is the main function you need.
 *
 * - Please note that it accepts only `Uint8Array`.
 * - It returns a numeric value in `base 10`.
 *
 * If you are using string input, you need to encode with `TextEncoder` first.
 *
 * Example usage:
 * ```ts
 * import { calculateCrc } from 'crc32-ts';
 *
 * const encoder = new TextEncoder();
 * const uInt8Array = encoder.encode(text);
 * const result = calculateCrc(uInt8Array);
 *
 * // Base 10 by default, if you need hexa, convert it to base 16.
 * console.log(`✅ crc32 value 0x${crcResult.toString(16)}`);
 * ```
 *
 * @param data - A `Uint8Array` typed array.
 * @returns `Base 10` numeric value.
 */
export function calculateCrc(data: Uint8Array): number {
  if (!(data instanceof Uint8Array)) {
    throw new InvalidInputError(data);
  }

  if (data.length === 0) {
    throw new EmptyDataArrayError(data);
  }

  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ TABLE[(crc ^ data[i]) & 0xff];
  }

  return (crc ^ 0xffffffff) >>> 0;
}
