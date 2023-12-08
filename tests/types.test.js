import { expect, test } from "vitest";
import {
  isString,
  isList,
  isObject,
  fits,
  wildcard,
  types,
  patobj,
  patint,
  patstring,
  patfloat,
} from "../src/types.jsx";

test("wildcards always fit", () => {
  expect(fits({ type: wildcard }, { type: wildcard })).toBe(true);
  expect(fits({ type: patobj }, { type: wildcard })).toBe(true);
  expect(fits({ type: wildcard }, { type: patobj })).toBe(true);
});

test("simple fits", () => {
  expect(fits({ type: patobj }, { type: patobj })).toBe(true);
  expect(fits({ type: "hello" }, { type: "hello" })).toBe(true);
  expect(fits({ type: patint }, { type: patobj })).toBe(false);
});

test("isList()", () => {
  expect(isList("hello")).toBe(false);
  expect(isList([2, 3, 4])).toBe(true);
});
test("isString()", () => {
  expect(isString("hello")).toBe(true);
  expect(isString([2, 3, 4])).toBe(false);
});

test("isObject()", () => {
  expect(isObject({ a: 3 })).toBe(true);
  expect(isObject(["a", 3])).toBe(false);
  expect(isObject("a")).toBe(false);
  expect(isObject(7)).toBe(false);
  expect(isObject(null)).toBe(false);
});
