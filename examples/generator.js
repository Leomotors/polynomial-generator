// @ts-check

const { Generator } = require("../dist");

const generator = new Generator({
    numeratorRange: 10,
    denominatorRange: 5,
    degree: 2,
});

const [polynomial, roots] = generator.generate();

console.log(polynomial.toString());
