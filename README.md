# Polynomial Generator

[![](https://img.shields.io/npm/v/polynomial-generator.svg?maxAge=3600)](https://www.npmjs.com/package/polynomial-generator)
[![](https://img.shields.io/npm/dt/polynomial-generator.svg?maxAge=3600)](https://www.npmjs.com/package/polynomial-generator)
[![](https://github.com/Leomotors/polynomial-generator/actions/workflows/test.yml/badge.svg)](https://github.com/Leomotors/polynomial-generator/actions)

Library to generate random polynomial

Can be use to generate problems to solve

Will be used in my upcoming projects

!!! _work in progress_ !!!

## 📃 Example

```js
// require
const { Generator } = require("polynomial-generator");

// import
import { Generator } from "polynomial-generator";

const generator = new Generator({
    numeratorRange: 10,
    denominatorRange: 5,
    degree: 2,
});

const [polynomial, roots] = generator.generate();

console.log(polynomial.toString());
// outputs: 2x²+14x-36
```

## 📚 Documents

[TypeDoc](https://leomotors.github.io/polynomial-generator/)
