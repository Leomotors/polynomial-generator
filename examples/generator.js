// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

const { Generator } = require("../dist/main");

const generator = new Generator({
    numeratorRange: 10,
    denominatorRange: 5,
    degree: 2,
});

const [polynomial, roots] = generator.generate();

console.log(polynomial.toString());
