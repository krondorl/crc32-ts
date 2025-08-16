/*!
 * crc32-ts
 *
 * Copyright (c) 2025- Adam Burucs
 *
 * MIT Licensed
 */

import { describe, expect, test } from "vitest";
import { Crc32 } from "./index.js";

const crc32 = new Crc32();
const encoder = new TextEncoder();

function intoHexString(crcResult: number): string {
  return `0x${crcResult.toString(16)}`;
}

const testCases: Map<string, string> = new Map();

testCases.set("123456789", "0xcbf43926");
testCases.set("John-Carmack", "0x77ff9cfc");
testCases.set("Bjarne-Stroustrup", "0x4c50a184");

describe("Checksum Tests - Happy Path", () => {
  testCases.forEach((expectedHex: string, text: string) => {
    test(`checks string "${text}" to be hex "${expectedHex}"`, () => {
      const uInt8Array = encoder.encode(text);
      const crcResult = crc32.calculateCrc(uInt8Array);
      expect(intoHexString(crcResult)).toBe(expectedHex);
    });
  });
});

describe("Error Handling", () => {
  test("should throw an error for an invalid input type", () => {
    expect(() => crc32.calculateCrc(null as any)).toThrow(
      "Invalid input: data must be a Uint8Array."
    );
    expect(() => crc32.calculateCrc("string" as any)).toThrow(
      "Invalid input: data must be a Uint8Array."
    );
  });

  test("should throw an error for an empty Uint8Array", () => {
    const emptyArray = new Uint8Array([]);
    expect(() => crc32.calculateCrc(emptyArray)).toThrow(
      "Cannot calculate CRC for an empty data array."
    );
  });
});
