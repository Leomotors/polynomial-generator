// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

const { generate, generateMany } = require("../dist/main");

const option = {
    numeratorRange: 10,
    denominatorRange: 2,
    degree: 2,
};

const [polynomial, roots] = generate(option);

console.log(polynomial.toString());
console.log(polynomial.toString("html"));
console.log(polynomial.toString("latex"));

const polynomials = generateMany(option, 100);
