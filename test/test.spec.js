// @ts-check

const Polynomial = require("../dist").default;
const assert = require("assert");

describe("Polynomial Class", () => {
    describe("Construct", () => {
        it("Should Construct Successfully", () => {
            const p = new Polynomial();
            assert.notEqual(p, undefined);
        });

        it("Construct with correct property", () => {
            const p = new Polynomial({ 0: 2, 2: 1 });
            assert.equal(p.coefficients[0], 2);
        });

        it("Construct from Monomial", () => {
            const p = Polynomial.monomial(2, 3);
            assert.equal(p.coefficients[3], 2);
        });
    });

    describe("Add", () => {
        it("Should add correctly", () => {
            const p1 = new Polynomial({ 0: 2, 2: 1 });
            const p2 = new Polynomial({ 0: 1, 2: 1 });
            const p3 = p1.add(p2);
            assert.equal(p3.coefficients[0], 3);
            assert.equal(p3.coefficients[2], 2);
        });

        it("Should add correctly with different degree", () => {
            const p1 = new Polynomial({ 0: 2, 2: 1 });
            const p2 = new Polynomial({ 0: 1, 3: 1 });
            const p3 = p1.add(p2);
            assert.equal(p3.coefficients[0], 3);
            assert.equal(p3.coefficients[2], 1);
            assert.equal(p3.coefficients[3], 1);
        });
    });

    describe("Multiply", () => {
        it("Multiply with Scalar", () => {
            const p1 = new Polynomial({ 2: 2, 1: 4 });
            const p2 = p1.mult(69);
            assert.equal(Object.keys(p2.coefficients).length, 2);
            assert.equal(p2.coefficients[1], 4 * 69);
            assert.equal(p2.coefficients[2], 2 * 69);
        });

        it("Multiply with another Polynomial", () => {
            const p1 = new Polynomial({ 1: 1, 0: -2 });
            const p2 = new Polynomial({ 1: 1, 0: 2 });
            const p3 = p1.mult(p2);
            assert.equal(p3.coefficients[0], -4);
            assert.equal(p3.coefficients[1], undefined);
            assert.equal(p3.coefficients[2], 1);
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
        });
    });
});
