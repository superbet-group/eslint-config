import { describe, it } from "eslint/lib/rule-tester/rule-tester";

describe("exports a flip function, that", () => {
  it("returns true, given false as an argument", () => {
    expect(flip(false)).toBe(true);
  });

  it("returns false, given true as an argument", () => {
    expect(flip(true)).toBe(false);
  });
});

test("array contains 2", () => {
  expect([1, 2, 3]).toContain(2);
});

describe("testing async functions", () => {
  it("async function returns a promise", async () => {
    expect.assertions(1);
    const result = await asyncFunction();
    expect(result).toBe(true);
  });

  it("async function throws an error", async () => {
    expect.assertions(1);
    await expect(asyncFunction()).rejects.toThrow("some error");
  });
});

describe("foo", () => {
  describe("bar", () => {
    it("should get something", () => {
      expect(getSomething()).toBe("Something");
    });
  });
});

describe("alias methods", () => {
  it("prefer not to use alias methods", () => {
    expect(a).toHaveBeenCalledTimes();
    expect(a).toHaveBeenCalledWith();
    expect(a).toHaveBeenLastCalledWith();
    expect(a).toHaveBeenNthCalledWith();
    expect(a).toHaveReturned();
    expect(a).toHaveReturnedTimes();
    expect(a).toHaveReturnedWith();
    expect(a).toHaveLastReturnedWith();
    expect(a).toHaveNthReturnedWith();
    expect(a).toThrow("an error");
  });
});

describe("conditional tests", () => {
  it("foo", () => {
    expect(!value).toBe(false);
  });

  function getValue() {
    if (process.env.FAIL) {
      return 1;
    }

    return 2;
  }

  it("another foo", () => {
    expect(getValue()).toBe(2);
  });

  it("validates the request", () => {
    try {
      processRequest(request);
    } catch (error) {
      // ignore errors
    } finally {
      expect(validRequest).toHaveBeenCalledWith(request);
    }
  });

  it("throws an error", async () => {
    expect.assertions(1);
    await expect(foo).rejects.toThrow(Error);
  });
});

describe("skipping tests", () => {
  describe("foo", () => { });
});

describe("another foo", () => {
  beforeEach(() => {
    // some setup
  });
  it("foo_test", () => {
    // some test
    expect(foo).toBe(bar);
  });
  describe("bar", () => {
    it("bar_test", () => {
      expect(foo).toBe(bar);
      afterAll(() => {
        // some teardown
      });
    });
  });
});

describe("nested function", () => {
  it("defining a function", () => {
    function foo(bar) {
      // nested functions are valid
      return foo ? bar : null;
    }
    expect(foo()).toBe(bar);
  });
});

describe("snapshots", () => {
  it("inline snapshots", () => {
    expect(something).toMatchInlineSnapshot();

    expect(something).toMatchInlineSnapshot(
      `Object {
    property: 1
  }`
    );

    expect(something).toMatchInlineSnapshot(
      { property: expect.any(Date) },
      `Object {
    property: Any<Date>
  }`
    );
  });

  it("checking throws", () => {
    expect(errorThrowingFunction).toThrowErrorMatchingInlineSnapshot();

    expect(errorThrowingFunction).toThrowErrorMatchingInlineSnapshot(
      `Error Message`
    );
  });
});

jest.setTimeout(5000);

test("my test", () => {
  jest.spyOn(some, "object");
  some.object();
  expect(some.object).toHaveBeenCalledTimes(1);
});

test("my fn test", () => {
  const tester = jest.fn();
  tster();
  expect(tester).toHaveBeenCalledTimes(1);
});

test("my other test", () => {
  expect("foo").toStrictEqual(expect.anything());
});

test("to be", async () => {
  expect.assertions(8);
  expect(value).not.toBe(5);
  expect(getMessage()).toBe("hello world");
  await expect(loadMessage()).resolves.toBe("hello world");
  expect(didError).not.toBe(true);

  expect(catchError()).toStrictEqual({ message: "oh noes!" });

  expect(value).toBeDefined();
  expect(getMessage()).toBeNull();
  await expect(countMessages()).resolves.not.toBeNaN();
});

describe("promise expectations", () => {
  it("promises a person", async () => {
    expect.assertions(1);
    await api.getPersonByName("bob").then((person) => {
      expect(person).toHaveProperty("name", "Bob");
    });
  });

  it("promises a counted person", async () => {
    expect.assertions(2);
    let promise = api.getPersonByName("bob").then((person) => {
      expect(person).toHaveProperty("name", "Bob");
    });

    promise = promise.then(() => {
      expect(analytics.gottenPeopleCount).toBe(1);
    });

    await promise;
  });

  it("promises multiple people", async () => {
    expect.assertions(2);
    const firstPromise = api.getPersonByName("bob").then((person) => {
      expect(person).toHaveProperty("name", "Bob");
    });
    const secondPromise = api.getPersonByName("alice").then((person) => {
      expect(person).toHaveProperty("name", "Alice");
    });

    await Promise.allSettled([firstPromise, secondPromise]);
  });
});
