// @ts-check

const { Polynomial } = require("../dist");
const { equalTo } = require("../dist/testing");
const assert = require("assert");

describe("Polynomial Class", () => {
    describe("Class Construction", () => {
        it("Default Constructor", () => {
            const p = new Polynomial();
            assert.notEqual(p, undefined);
        });

        it("Constructor with Coefficients", () => {
            const p = new Polynomial({ 0: 2, 2: 1 });
            equalTo(p, { 0: 2, 2: 1 });
        });

        it("Construct from Monomial", () => {
            const p = Polynomial.monomial(2, 3);
            equalTo(p, { 3: 2 });
        });

        it("Construct from Root", () => {
            const p = Polynomial.fromRoot(5);
            equalTo(p, { 0: -5, 1: 1 });
        });
    });

    describe("Add", () => {
        it("Should add correctly", () => {
            const p1 = new Polynomial({ 0: 2, 2: 1 });
            const p2 = new Polynomial({ 0: 1, 2: 1 });
            const p3 = p1.add(p2);
            equalTo(p3, { 0: 3, 2: 2 });
        });

        it("Should add correctly with different degree", () => {
            const p1 = new Polynomial({ 0: 2, 2: 1 });
            const p2 = new Polynomial({ 0: 1, 3: 1 });
            const p3 = p1.add(p2);
            equalTo(p3, { 0: 3, 2: 1, 3: 1 });
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
            equalTo(p3, { 0: -4, 2: 1 });
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
