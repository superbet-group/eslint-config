module.exports = {
  rules: {
    // Require that member overloads be consecutive
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
    "@typescript-eslint/adjacent-overload-signatures": "error",

    // Requires using either T[] or Array<T> for arrays
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/array-type.md
    "@typescript-eslint/array-type": "error",

    // Disallows awaiting a value that is not a Thenable
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/await-thenable.md
    "@typescript-eslint/await-thenable": "error",

    // Bans @ts-<directive> comments from being used unless @ts-expect-error, which requires description
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-ts-comment.md
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
        "ts-nocheck": true,
        "ts-check": true,
        minimumDescriptionLength: 10,
      },
    ],

    // We're not concerned about ts-lint: comments as they're not used anywhere in our codebase
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-tslint-comment.md
    "@typescript-eslint/ban-tslint-comment": "off",

    // Bans specific types from being used, e.g.: {}
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-types.md
    "@typescript-eslint/ban-types": "error",

    // Ensures that literals on classes are exposed as fields to avoid additional overhead of creating a closure
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/class-literal-property-style.md
    "@typescript-eslint/class-literal-property-style": ["error", "fields"],

    // Enforces the usage of Record<K, V> type instead of { [key: K]: V }
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.md
    "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],

    // Enforces consistent usage of type assertions
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "allow-as-parameter",
      },
    ],

    // Enforces consistent use of type definitions
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],

    // Enforces consistent usage of type exports
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-exports.md
    "@typescript-eslint/consistent-type-exports": [
      "error",
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],

    // Enforces consistent usage of type imports
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-imports.md
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", disallowTypeAnnotations: true },
    ],

    // Enforces usage of return type on functions and methods
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
      },
    ],

    // Enforces that class members have access modifiers explicitly specified
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
    "@typescript-eslint/explicit-member-accessibility": "off",

    // Enforces that module boundaries (exports) are typed. @typescript-eslint/explicit-function-return-type but for exports only
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // Enforces a consistent member delimiter style in interfaces and type literals
    // TODO: perhaps prettier already takes care of this and so this rule is redundant?
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-delimiter-style.md
    "@typescript-eslint/member-delimiter-style": "error",

    // Enforces set order of members of classes
    // NOTE: defaults are used because it's generally discouraged to heavily rely on classes
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-ordering.md
    "@typescript-eslint/member-ordering": "error",

    // Enforces consistent style for method signatures
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/method-signature-style.md
    "@typescript-eslint/method-signature-style": ["error", "property"],

    // Enforces casing of everything across the codebase
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["default"],
        format: ["camelCase"],
        leadingUnderscore: "allow",
        trailingUnderscore: "allow",
      },
      {
        selector: "function",
        format: ["PascalCase", "camelCase"],
      },
      {
        selector: ["variable"],
        format: ["camelCase", "UPPER_CASE"],
      },
      {
        selector: ["variable"],
        modifiers: ["const"],
        format: ["camelCase", "UPPER_CASE"],
      },
      {
        selector: ["variable"],
        types: ["boolean"],
        format: ["camelCase"],
        prefix: ["is", "has", "was", "had"],
      },
      {
        selector: ["typeLike"],
        format: ["PascalCase"],
      },
    ],

    // Disallows calling .toString() on an object that has no meaingful result with .toString()
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-base-to-string.md
    "@typescript-eslint/no-base-to-string": "off",

    // Prevents confusion of `!` non-null assertion and negation, e.g.: `something.example! == "test"` can be confused with `something.example !== "test"`, which has the opposite meaning
    // NOTE: non-null-assertion is discouraged so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
    "@typescript-eslint/no-confusing-non-null-assertion": "off",

    // Prevents confusion of `undefined` accidentally being passed as a function argument from a void function, e.g.: `console.log(alert("example"))`
    // This config allows arrow functions to return void via proxy, e.g.: `() => alert("example")`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-confusing-void-expression.md
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      { ignoreArrowShorthand: true },
    ],

    // Disallows usage of `delete` keyword on dynamic property names, e.g.: `delete obj[`${dynamic} value`]`. General usage of delete is discouraged
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
    "@typescript-eslint/no-dynamic-delete": "error",

    // Prevents meaningless interfaces from being created, e.g.: `interface Example {}`. Types are preferred over interfaces so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-interface.md
    "@typescript-eslint/no-empty-interface": "off",

    // Prevents usage of `any` to be used explicitly, e.g.: `let example: any = "test"`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-explicit-any.md
    "@typescript-eslint/no-explicit-any": "error",

    // Disallows extra non-null assertions, e.g.: `example!?.toString()` as it's usually done by mistake
    // NOTE: non-null-assertion is discouraged so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
    "@typescript-eslint/no-extra-non-null-assertion": "off",

    // Disallows usage of classes as namespaces, e.g.: `class Example { static test = "test" }`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extraneous-class.md
    "@typescript-eslint/no-extraneous-class": "error",

    // Forbids usage of Promise-like values in statements without handling their errors appropriately
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md
    "@typescript-eslint/no-floating-promises": "error",

    // Disallows usage of `for-in` loops over an object, e.g.: `for (let key in obj) { ... }`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-for-in-array.md
    "@typescript-eslint/no-for-in-array": "error",

    // Disallows explicitly specifying a type when it could easily be inferred, e.g.: `let example: string = "test"`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-inferrable-types.md
    "@typescript-eslint/no-inferrable-types": "error",

    // Disallow usage of `void` as it is interchangeable with `undefined` which is more clear in meaning
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
    "@typescript-eslint/no-invalid-void-type": "error",

    // Disallow the void operator when its argument is already of type void or undefined
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-meaningless-void-operator.md
    "@typescript-eslint/no-meaningless-void-operator": "error",

    // Warns on apparent attempts to define constructors for interfaces or new for classes.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-new.md
    "@typescript-eslint/no-misused-new": "error",

    // Prevents from mis-using await in places where it's technically correct, but is meaningless, e.g.: `await 10`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-promises.md
    "@typescript-eslint/no-misused-promises": "error",

    // Disallows defining typings with the outdates namespace syntax, while still allowing usage in definition files
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-namespace.md
    "@typescript-eslint/no-namespace": "error",

    // The nullish coalescing operator is designed to provide a default value when dealing with null or undefined. Using non-null assertions in the left operand of the nullish coalescing operator is redundant
    // NOTE: non-null-assertion is discouraged so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-asserted-nullish-coalescing.md
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "off",

    // Designed to prevent type safety hole by non-null asserting after an optional chain
    // NOTE: non-null-assertion is discouraged so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",

    // Disallows usage of non-null assertion in favour of actually checking whether a nullable value is actually null or undefined
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
    "@typescript-eslint/no-non-null-assertion": "error",

    // Disallows properties via contructor parameters, a la Angular examples style, e.g.: `constructor(public example: string) {}`
    // NOTE: using classes is discouraged so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-parameter-properties.md
    "@typescript-eslint/no-parameter-properties": "off",

    // Disallows usage of `require()` in favor of import statements
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-require-imports.md
    "@typescript-eslint/no-require-imports": "error",

    // Disallows assigning the value of `this` to another variable, e.g.: `let self = this`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-this-alias.md
    "@typescript-eslint/no-this-alias": "error",

    // Disallows usage of type aliases, e.g.: `type Id = string`
    // NOTE: whereas from a technical perspective type aliases only restrict inheritance, it is generally better to avoid inheritance altogether and use these type aliases for clarifying code
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-type-alias.md
    "@typescript-eslint/no-type-alias": "off",

    // Disallows redundantly comparing booleans to booleans via equality in conditions, e.g.: `let a = false;if (a === true) { ... }`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

    // Prevents adding conditional checks or operators where the condition is always either true or false according to typing
    // NOTE: this rule encourages indicating nullability in typings and reduces unreachable code via tests, leading to higher test coverage
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
    "@typescript-eslint/no-unnecessary-condition": "error",

    // This rule aims to let users know when a namespace or enum qualifier is unnecessary
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
    "@typescript-eslint/no-unnecessary-qualifier": "off",

    // Warns if an explicitly specified type argument is the default for that type parameter, e.g.: `type Example<T = string> = string; const example: Example<string> = "example";`
    // NOTE: actually adding type information despite it being the default may be a good idea because it warns of regression if generic signature changes and gives more information on the surface to the reader
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
    "@typescript-eslint/no-unnecessary-type-arguments": "off",

    // Prevents type assertions that produce the same type as the type being asserted
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
    "@typescript-eslint/no-unnecessary-type-assertion": "error",

    // Prevents constraining generic type arguments to any or unknown as it's not a meaningful constraint
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-constraint.md
    "@typescript-eslint/no-unnecessary-type-constraint": "error",

    // Disallows calling functions with arguments that are typed to any as TypeScript will not check this on its own
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-argument.md
    "@typescript-eslint/no-unsafe-argument": "error",

    // Disallows assigning any to variables and properties
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
    "@typescript-eslint/no-unsafe-assignment": "error",

    // Disallows calling an any type value
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-call.md
    "@typescript-eslint/no-unsafe-call": "error",

    // Disallows member access on any typed variables
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
    "@typescript-eslint/no-unsafe-member-access": "error",

    // Disallows returning any from a function
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-return.md
    "@typescript-eslint/no-unsafe-return": "error",

    // Disallows the use of require statements except in import statements
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-var-requires.md
    "@typescript-eslint/no-var-requires": "off",

    // Prefers a non-null assertion over explicit type cast when possible
    // NOTE: non-null-assertion is discouraged so this rule is redundant, it's preferred to use explicit checks (type narrowing, type guards) instead
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/non-nullable-type-assertion-style.md
    "@typescript-eslint/non-nullable-type-assertion-style": "off",

    // Prefer usage of `as const` over literal type, e.g.: `const example = "example" as const` instead of `const example: "example" = "example";
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-as-const.md
    "@typescript-eslint/prefer-as-const": "error",

    // Prefers explicit definition of enum value initializers over inferring them
    // NOTE: it's best to avoid using enums altogether as they're don't map to any specific JS feature and can lead to unexpected behavior
    // it is a lot more convenient to use type unions as they just disappear from code that's produced by the compiler
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-enum-initializers.md
    "@typescript-eslint/prefer-enum-initializers": "off",

    // Prefers the usage of for of loops over for loops
    // NOTE: it's very rare that you would need to use for loops instead of .forEach(), yet for of loop also fits your use case
    // the only example of such case is when you want to break early from a loop
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-for-of.md
    "@typescript-eslint/prefer-for-of": "off",

    // Suggests using a function type instead of an interface or object type literal with a single call signature
    // NOTE: interfaces are discouraged so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-function-type.md
    "@typescript-eslint/prefer-function-type": "off",

    // Prefers using `.includes` over `.indexOf`
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-includes.md
    "@typescript-eslint/prefer-includes": "error",

    // Prevents confusion around enum scoping via enforcing that only literal types are used as enum members
    // NOTE: use of enums is discouraged so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.md
    "@typescript-eslint/prefer-literal-enum-member": "off",

    // Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
    "@typescript-eslint/prefer-namespace-keyword": "off",

    // Enforces use of nullish coalescing operator instead of `||` logical operator as it's safer (always coalesces on nullish values, not on falsy values)
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
    "@typescript-eslint/prefer-nullish-coalescing": "error",

    // Prefer using concise optional chain expressions instead of chained logical ands
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
    "@typescript-eslint/prefer-optional-chain": "error",

    // Requires that private members are marked as readonly if they're never modified outside of the constructor
    // NOTE: use of classes is generally discouraged, and so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-readonly.md
    "@typescript-eslint/prefer-readonly": "off",

    // Requires that function parameters are typed as readonly to prevent accidental mutation of inputs
    // NOTE: this is better solved by "no-param-reassign", which is counterproductive when using tools like immer
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
    "@typescript-eslint/prefer-readonly-parameter-types": "off",

    // Prefer using type parameter when calling Array.prototype.reduce
    // NOTE: this is useful because TypeScript tends to have a hard time inferring generic arguments of reduce in particular
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
    "@typescript-eslint/prefer-reduce-type-parameter": "error",

    // Enforce that RegExp#exec is used instead of String#match if no global flag is provided
    // NOTE: RegExp#exec may also be slightly faster than String#match
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
    "@typescript-eslint/prefer-regexp-exec": "error",

    // Enforces usage of `this` type when instance of the class is returned
    // NOTE: classes are generally discouraged, so this rule is redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-return-this-type.md
    "@typescript-eslint/prefer-return-this-type": "off",

    // Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
    "@typescript-eslint/prefer-string-starts-ends-with": "error",

    // Recommends using @ts-expect-error over @ts-ignore
    // NOTE: this is recommended in tests but definitely not in production code
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
    "@typescript-eslint/prefer-ts-expect-error": "off",

    // Requires any function or method that returns a Promise to be marked async
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/promise-function-async.md
    "@typescript-eslint/promise-function-async": "off",

    // Requires Array#sort calls to always provide a compareFunction
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
    "@typescript-eslint/require-array-sort-compare": "off",

    // When adding two variables, operands must both be of type number or of type string
    // NOTE: not used because `+someNumber` is a pretty solid way of converting a string representation of a number to a number
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
    "@typescript-eslint/restrict-plus-operands": "off",

    // Disallows objects in template expressions, e.g.: ``${{ foo: "bar" }}`}`
    // NOTE: we allow strings, numbers and booleans in template expressions
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
        allowBoolean: true,
        allowAny: false,
        allowNullish: false,
        allowRegExp: false,
      },
    ],

    // Enforces that members of a type union/intersection are sorted alphabetically
    // NOTE: this rule helps with reducing the amount of merge conflicts in a complex code base
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/sort-type-union-intersection-members.md
    "@typescript-eslint/sort-type-union-intersection-members": "error",

    // Restricts the types allowed in boolean expressions
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
    "@typescript-eslint/strict-boolean-expressions": "off",

    // Exhaustiveness checking in switch with union type
    // NOTE: this requires type information to work so it's slower than other rules, if there aren't many cases of this in a code bases it's recommended to switch this off
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // Sets preference level for triple slash directives versus ES6-style import declarations
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/triple-slash-reference.md
    "@typescript-eslint/triple-slash-reference": "error",

    // Require consistent spacing around type annotations
    // NOTE: also enforced by prettier so it's redundant
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
    "@typescript-eslint/type-annotation-spacing": "off",

    // Requires type annotations to exist
    // NOTE: If you are using stricter TypeScript compiler options, particularly --noImplicitAny and/or --strictPropertyInitialization, you likely don't need this rule.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/typedef.md
    "@typescript-eslint/typedef": "off",

    // Enforces unbound methods are called with their expected scope
    // NOTE: it's been a useful rule in legacy React codebases, but it's hopefully less relevant now
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unbound-method.md
    "@typescript-eslint/unbound-method": "off",

    // Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unified-signatures.md
    "@typescript-eslint/unified-signatures": "error",
  },
};
