// @ts-check

const { Generator, MultiGenerator } = require("../dist");

const degree2 = new Generator({
    numeratorRange: 10,
    denominatorRange: 5,
    degree: 2,
});

const degree3 = new Generator({
    numeratorRange: 5,
    denominatorRange: 3,
    degree: 3,
});

const generator = new MultiGenerator([
    {
        generator: degree2,
        weight: 70,
    },
    {
        generator: degree3,
        weight: 30,
    },
]);

const [polynomial, roots] = generator.generate();

console.log(polynomial.toString());
