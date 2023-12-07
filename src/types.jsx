// numOp = { [number] $ F (Param 0) $ F (Param 0) (Param 0)

const number = { constraint: "OneOf", options: ["float", "int"] };
const numOp = {
  params: [["pattern", number]],
  from: 0,
  to: {
    f: { from: 0, to: 0 },
  },
};

const patobj = ["pattern", "obj"];
const patint = ["pattern", "int"];
const patfloat = ["pattern", "float"];
const patstring = ["pattern", "string"];

const f = function (...args) {
  if (args.length > 2) {
    const arg = args.shift();
    return { from: arg, to: f(...args) };
  }
  return { from: args[0], to: args[1] };
};

export const functions = [
  { name: "+", type: numOp },
  { name: "-", type: numOp },
  { name: "/", type: numOp },
  { name: "*", type: numOp },
  {
    name: "#",
    type: f(patobj, patobj, patobj),
  },
  {
    name: "chop",
    type: f(patint, patobj, patobj),
  },
  {
    name: "striate",
    type: f(patint, patobj, patobj),
  },
  {
    name: "sine",
    type: patfloat,
  },
  { name: "sound", type: f(patstring, patobj) },
  { name: "vowel", type: f(patstring, patobj) },
  { name: "shape", type: f(patfloat, patobj) },
  { name: "note", type: f(patfloat, patobj) },
  { name: "n", type: f(patfloat, patobj) },
  { name: "speed", type: f(patfloat, patobj) },
  { name: "pan", type: f(patfloat, patobj) },
  { name: "run", type: f(patint, patint) },
  {
    name: "overlay",
    type: {
      params: ["*"],
      ...f(["pattern", 0], ["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "append",
    type: {
      params: ["*"],
      ...f(["pattern", 0], ["pattern", 0], ["pattern", 0]),
    },
  },
  { name: "silence", type: ["pattern", "*"] },
  {
    name: "fast",
    type: { params: ["*"], ...f(patfloat, ["pattern", 0], ["pattern", 0]) },
  },
  {
    name: "slow",
    type: { params: ["*"], ...f(patfloat, ["pattern", 0], ["pattern", 0]) },
  },
  {
    name: "iter",
    type: { params: ["*"], ...f(patint, ["pattern", 0], ["pattern", 0]) },
  },
  {
    name: "<~",
    type: { params: ["*"], ...f(patfloat, ["pattern", 0], ["pattern", 0]) },
  },
  {
    name: "~>",
    type: { params: ["*"], ...f(patfloat, ["pattern", 0], ["pattern", 0]) },
  },
  {
    name: "every",
    type: {
      params: ["*"],
      ...f(patint, f(["pattern", 0], ["pattern", 0]), ["pattern", 0]),
    },
  },
  {
    name: "chunk",
    type: {
      params: ["*"],
      ...f(patint, f(["pattern", 0], ["pattern", 0]), ["pattern", 0]),
    },
  },
  {
    name: "jux",
    type: f(f(patobj, patobj), patobj),
  },
  {
    name: "superimpose",
    type: f(f(patobj, patobj), patobj),
  },
  {
    name: "rev",
    type: {
      params: ["*"],
      ...f(["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "brak",
    type: {
      params: ["*"],
      ...f(["pattern", 0], ["pattern", 0]),
    },
  },
];
