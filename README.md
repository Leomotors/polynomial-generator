# Polynomial Generator

[![](https://img.shields.io/npm/v/polynomial-generator.svg?maxAge=3600)](https://www.npmjs.com/package/polynomial-generator)
[![](https://img.shields.io/npm/dt/polynomial-generator.svg?maxAge=3600)](https://www.npmjs.com/package/polynomial-generator)
[![](https://github.com/Leomotors/polynomial-generator/actions/workflows/test.yml/badge.svg)](https://github.com/Leomotors/polynomial-generator/actions)

Library to generate random polynomial

Can be use to generate problems to solve

## 📃 Example

```js
import { generate, generateMany } from "polynomial-generator";

const option = {
    numeratorRange: 10,
    denominatorRange: 2,
    degree: 2,
};

// generate single
const [polynomial, roots] = generate(option);

console.log(polynomial.toString());        // 2x²+15x-8
console.log(polynomial.toString("html"));  // 2x<sup>2</sup>+15x-8
console.log(polynomial.toString("latex")); // 2x^{2}+15x-8

// generate many
const polynomials = generateMany(option, 100);
```

## 📚 Documents

[TypeDoc](https://leomotors.github.io/polynomial-generator/)
