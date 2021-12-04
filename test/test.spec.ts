// * npm test or yarn test

import { Polynomial, Generator } from "../dist";
import { equalTo, Version } from "../dist/testing";

import { assert } from "chai";

if (Version != process.env.npm_package_version) {
    console.log(
        "Mismatched Version: Please Rebuild the Package before Testing"
    );
    process.exit(1);
}

describe("Polynomial Class", () => {
    describe("Class Construction", () => {
        it("Default Constructor", () => {
            const p = new Polynomial();
            assert.isOk(p);
        });

        it("Constructor with Coefficients", () => {
            const p = new Polynomial({ 0: 2, 2: 1 });
            equalTo(p, { 2: 1, 0: 2 });
        });

        it("Construct from Monomial", () => {
            const p = Polynomial.monomial(2, 3);
            equalTo(p, { 3: 2 });
        });

        describe("Construct from Single Root", () => {
            it("Test Case 1 : -2/3", () => {
                const p = Polynomial.fromRoot("-2/3");
                equalTo(p, { 1: 3, 0: 2 });
            });

            it("Test Case 2: 6", () => {
                const p = Polynomial.fromRoot("6");
                equalTo(p, { 1: 1, 0: -6 });
            });

            it("Test Case 3: 6/9", () => {
                const p = Polynomial.fromRoot("6/9");
                equalTo(p, { 1: 3, 0: -2 });
            });
        });

        describe("Construct from Roots", () => {
            it("Test Case 1: -2, 4", () => {
                const p = Polynomial.fromRoots("-2 4");
                equalTo(p, { 2: 1, 1: -2, 0: -8 });
            });
            it("Test Case 2: -2/3, 4/8", () => {
                const p = Polynomial.fromRoots("-2/3 4/8");
                equalTo(p, { 2: 6, 1: 1, 0: -2 });
            });
            it("Test Case 3: 1/1 2/2 3/3", () => {
                const p = Polynomial.fromRoots("1/1 2/2 3/3");
                equalTo(p, { 3: 1, 2: -3, 1: 3, 0: -1 });
            });
        });
    });

    describe("Add", () => {
        it("Should add correctly", () => {
            const p1 = new Polynomial({ 2: 1, 0: 2 });
            const p2 = new Polynomial({ 2: 1, 0: 1 });
            const p3 = p1.add(p2);
            equalTo(p3, { 2: 2, 0: 3 });
        });

        it("Should add correctly with different degree", () => {
            const p1 = new Polynomial({ 2: 1, 0: 2 });
            const p2 = new Polynomial({ 3: 1, 0: 1 });
            const p3 = p1.add(p2);
            equalTo(p3, { 3: 1, 2: 1, 0: 3 });
        });
    });

    describe("Multiply", () => {
        it("Multiply with Scalar", () => {
            const p1 = new Polynomial({ 2: 2, 1: 4 });
            const p2 = p1.mult(69);
            equalTo(p2, { 2: 2 * 69, 1: 4 * 69 });
        });

        it("Multiply with another Polynomial", () => {
            const p1 = new Polynomial({ 1: 1, 0: -2 });
            const p2 = new Polynomial({ 1: 1, 0: 2 });
            const p3 = p1.mult(p2);
            equalTo(p3, { 2: 1, 0: -4 });
        });
    });

    describe("To String", () => {
        describe("Mode: Unicode", () => {
            it("Test Case 1: x²+2", () => {
                const p = new Polynomial({ 0: 2, 2: 1 });
                assert.equal(p.toString(), "x²+2");
            });
            it("Test Case 2: 4x-3", () => {
                const p = new Polynomial({ 0: -3, 1: 4 });
                assert.equal(p.toString(), "4x-3");
            });
            it("Test Case 3: -4x¹²-3x⁹", () => {
                const p = new Polynomial({ 12: -4, 9: -3 });
                assert.equal(p.toString(), "-4x¹²-3x⁹");
            });
            it("Test Case 4: x²+2x+1", () => {
                const p = new Polynomial({ 1: 2, 2: 1, 0: 1 });
                assert.equal(p.toString(), "x²+2x+1");
            });
        });

        describe("Mode: HTML", () => {
            it("Test Case 1: x²+2", () => {
                const p = new Polynomial({ 0: 2, 2: 1 });
                assert.equal(p.toString("html"), "x<sup>2</sup>+2");
            });
            it("Test Case 2: 4x-3", () => {
                const p = new Polynomial({ 0: -3, 1: 4 });
                assert.equal(p.toString("html"), "4x-3");
            });
            it("Test Case 3: -4x¹²-3x⁹", () => {
                const p = new Polynomial({ 12: -4, 9: -3 });
                assert.equal(
                    p.toString("html"),
                    "-4x<sup>12</sup>-3x<sup>9</sup>"
                );
            });
            it("Test Case 4: x²+2x+1", () => {
                const p = new Polynomial({ 1: 2, 2: 1, 0: 1 });
                assert.equal(p.toString("html"), "x<sup>2</sup>+2x+1");
            });
        });

        describe("Mode: Latex", () => {
            it("Test Case 1: x²+2", () => {
                const p = new Polynomial({ 0: 2, 2: 1 });
                assert.equal(p.toString("latex"), "x^{2}+2");
            });
            it("Test Case 2: 4x-3", () => {
                const p = new Polynomial({ 0: -3, 1: 4 });
                assert.equal(p.toString("latex"), "4x-3");
            });
            it("Test Case 3: -4x¹²-3x⁹", () => {
                const p = new Polynomial({ 12: -4, 9: -3 });
                assert.equal(p.toString("latex"), "-4x^{12}-3x^{9}");
            });
            it("Test Case 4: x²+2x+1", () => {
                const p = new Polynomial({ 1: 2, 2: 1, 0: 1 });
                assert.equal(p.toString("latex"), "x^{2}+2x+1");
            });
        });
    });
});

describe("Generator Class", () => {
    const numeratorRange = 20;
    const denominatorRange = 10;
    const degree = 4;

    const generator = new Generator({
        numeratorRange,
        denominatorRange,
        degree,
    });

    it("Constructed Successfully", () => {
        assert.isOk(generator);
    });

    describe("Able to Generate Polynomial", () => {
        const polys = [];

        for (let i = 1; i <= 100; i++) {
            polys.push(generator.generate());
        }

        it("Polynomial has degree as configged", () => {
            for (const [p, roots] of polys) assert.equal(p.degree, degree);
        }).timeout(3);

        it("Polynomial has correct roots", () => {
            for (const [p, roots] of polys)
                assert.equal(
                    p.toString(),
                    Polynomial.fromRoots(roots).toString()
                );
        }).timeout(10);

        it("Has constant term in possible range", () => {
            for (const [p, roots] of polys)
                assert.isAtMost(
                    Math.abs(p.coefficients[0]) || 0,
                    Math.pow(numeratorRange, degree)
                );
        }).timeout(3);

        it("Has higest degree term in possible range", () => {
            for (const [p, roots] of polys)
                assert.isAtMost(
                    Math.abs(p.coefficients[degree]) || 0,
                    Math.pow(denominatorRange, degree)
                );
        }).timeout(3);
    });

    describe("Stress Test: Degree 100", () => {
        const supergen = new Generator({
            numeratorRange: 10,
            denominatorRange: 10,
            degree: 100,
        });

        const [p, roots] = supergen.generate();

        it("Generate Successfully", () => {
            assert.isOk(p);
        });

        it("Has constant term in possible range", () => {
            assert.isAtMost(
                Math.abs(p.coefficients[0]) || 0,
                Math.pow(10, 100)
            );
        });

        it("Has highest degree term in possible range", () => {
            assert.isAtMost(
                Math.abs(p.coefficients[100]) || 0,
                Math.pow(10, 100)
            );
        });

        it("toString() works", () => {
            assert.isOk(p.toString());
        });
    });
});
