# Polynomial Generator

Library to generate random polynomial

Can be use to generate problems to solve

Will be used in my upcoming projects

_work in progress_

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
