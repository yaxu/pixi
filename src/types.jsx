// numOp = { [number] $ F (Param 0) $ F (Param 0) (Param 0)

export const isList = (value) =>
  Object.prototype.toString.call(value) === "[object Array]";
export const isString = (value) =>
  typeof value === "string" || value instanceof String;
export const isObject = (value) =>
  typeof value === "object" && !Array.isArray(value) && value !== null;

export const number = { constraint: "OneOf", options: ["float", "int"] };
export const numOp = {
  params: [["pattern", number]],
  from: 0,
  to: {
    f: { from: 0, to: 0 },
  },
};

export const patobj = ["pattern", "obj"];
export const patint = ["pattern", "int"];
export const patfloat = ["pattern", "float"];
export const patstring = ["pattern", "string"];

const f = function (...args) {
  if (args.length > 2) {
    const arg = args.shift();
    return { from: arg, to: f(...args) };
  }
  return { from: args[0], to: args[1] };
};

export const wildcard = "*";

export const types = [
  { name: "+", sig: { type: numOp } },
  { name: "-", sig: { type: numOp } },
  { name: "/", sig: { type: numOp } },
  { name: "*", sig: { type: numOp } },
  {
    name: "#",
    sig: { type: f(patobj, patobj, patobj) },
  },
  {
    name: "chop",
    sig: { type: f(patint, patobj, patobj) },
  },
  {
    name: "striate",
    sig: { type: f(patint, patobj, patobj) },
  },
  {
    name: "sine",
    sig: { type: patfloat },
  },
  { name: "sound", sig: { type: f(patstring, patobj) } },
  { name: "vowel", sig: { type: f(patstring, patobj) } },
  { name: "shape", sig: { type: f(patfloat, patobj) } },
  { name: "note", sig: { type: f(patfloat, patobj) } },
  { name: "n", sig: { type: f(patfloat, patobj) } },
  { name: "speed", sig: { type: f(patfloat, patobj) } },
  { name: "pan", sig: { type: f(patfloat, patobj) } },
  { name: "run", sig: { type: f(patint, patint) } },
  {
    name: "overlay",
    sig: {
      params: [wildcard],
      type: f(["pattern", 0], ["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "append",
    sig: {
      params: [wildcard],
      type: f(["pattern", 0], ["pattern", 0], ["pattern", 0]),
    },
  },
  { name: "silence", type: ["pattern", wildcard] },
  {
    name: "fast",
    sig: {
      params: [wildcard],
      type: f(patfloat, ["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "slow",
    sig: {
      params: [wildcard],
      type: f(patfloat, ["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "iter",
    sig: {
      params: [wildcard],
      type: f(patint, ["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "<~",
    sig: {
      params: [wildcard],
      type: f(patfloat, ["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "~>",
    sig: {
      params: [wildcard],
      type: f(patfloat, ["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "every",
    sig: {
      params: [wildcard],
      type: f(patint, f(["pattern", 0], ["pattern", 0]), ["pattern", 0]),
    },
  },
  {
    name: "chunk",
    sig: {
      params: [wildcard],
      type: f(patint, f(["pattern", 0], ["pattern", 0]), ["pattern", 0]),
    },
  },
  {
    name: "jux",
    sig: { type: f(f(patobj, patobj), patobj) },
  },
  {
    name: "superimpose",
    sig: { type: f(f(patobj, patobj), patobj) },
  },
  {
    name: "rev",
    sig: {
      params: [wildcard],
      type: f(["pattern", 0], ["pattern", 0]),
    },
  },
  {
    name: "brak",
    sig: {
      params: [wildcard],
      type: f(["pattern", 0], ["pattern", 0]),
    },
  },
];

export const fits = function (a, b) {
  if (a.type == wildcard || b.type == wildcard) {
    return true;
  }
  console.log("bah", a.type, b.type);
  if (
    isObject(a.type) &&
    "from" in a.type &&
    isObject(b.type) &&
    "from" in b.type
  ) {
    return (
      fits(
        { params: a.params, type: a.type.from },
        { params: b.params, type: b.type.from }
      ) &&
      fits(
        { params: a.params, type: a.type.to },
        { params: b.params, type: b.type.to }
      )
    );
  }

  if (
    isObject(a.type) &&
    "constraint" in a.type &&
    a.type.constraint == "OneOf"
  ) {
    if (
      isObject(b.type) &&
      "constraint" in b.type &&
      b.type.constraint == "OneOf"
    ) {
      for (atype of a.type.options) {
        for (btype of b.type.options) {
          if (
            fits(
              { params: a.params, type: atype },
              { params: b.params, type: btype }
            )
          ) {
            return true;
          }
        }
      }
      return false;
    }
    for (atype of a.type.options) {
      if (
        fits(
          { params: a.params, type: atype },
          { params: b.params, type: b.type }
        )
      ) {
        return true;
      }
    }
    return false;
  }

  if (isList(a.type)) {
    if (isList(b.type)) {
      console.log("oh", a.type, b.type);
      if (a.type.length != b.type.length) {
        return false;
      }
      for (var i = 0; i < a.type.length; ++i) {
        console.log("hm", a.type[i], b.type[i]);
        if (!fits({ type: a.type[i] }, { type: b.type[i] })) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  if (isString(a.type)) {
    if (isString(b.type)) {
      return a.type == b.type;
    }
    return false;
  }

  return false;
};

// fits (Sig pA (Pattern a)) (Sig pB (Pattern b)) = fits (Sig pA a) (Sig pB b)

// fits (Sig pA (ListCon a)) (Sig pB (ListCon b)) = fits (Sig pA a) (Sig pB b)

// fits (Sig pA a) (Sig pB (Param b)) = fits (Sig pA a) (Sig pB (pB !! b))
// fits (Sig pA (Param a)) (Sig pB b) = fits (Sig pA (pA !! a)) (Sig pB b)

// fits (Sig _ Float) (Sig _ Float)   = True
// fits (Sig _ Int) (Sig _ Int)       = True
// fits (Sig _ String) (Sig _ String) = True
// fits (Sig _ OscStream) (Sig _ OscStream) = True
// fits (Sig _ Osc) (Sig _ Osc) = True

// fits _ _ = False
