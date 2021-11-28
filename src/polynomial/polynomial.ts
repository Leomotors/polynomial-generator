import { toSuper } from "./parseUtils";

export type Coefficients = { [degree: number]: number };
type ParseMode = "unicode" | "html" | "latex";

// * NOTE: Most of the code are written by GitHub Copilot ✨✨

export class Polynomial {
    coefficients: Coefficients;

    constructor(coefficients: Coefficients = {}) {
        this.coefficients = coefficients;
    }

    static monomial(coefficient: number, degree: number): Polynomial {
        const coef: Coefficients = {};
        coef[degree] = coefficient;
        return new Polynomial(coef);
    }

    private addScalar(scalar: number): Polynomial {
        const result = new Polynomial(this.coefficients);
        result.coefficients[0] += scalar;
        return result;
    }

    private addPolynomial(other: Polynomial): Polynomial {
        const result = new Polynomial(this.coefficients);

        for (const degree in other.coefficients) {
            result.coefficients[degree] =
                (result.coefficients[degree] || 0) + other.coefficients[degree];
        }

        return result;
    }

    add(other: Polynomial | number): Polynomial {
        if (typeof other === "number") {
            return this.addScalar(other);
        }
        return this.addPolynomial(other);
    }

    private multScalar(scalar: number): Polynomial {
        const result = new Polynomial(this.coefficients);
        for (const degree in this.coefficients) {
            result.coefficients[degree] *= scalar;
        }
        return result;
    }

    private multPolynomial(other: Polynomial): Polynomial {
        const result = new Polynomial();
        for (const degree in this.coefficients) {
            for (const otherDegree in other.coefficients) {
                result.coefficients[+degree + +otherDegree] =
                    (result.coefficients[+degree + +otherDegree] || 0) +
                    this.coefficients[degree] * other.coefficients[otherDegree];
            }
        }
        return result;
    }

    mult(other: Polynomial | number): Polynomial {
        if (typeof other === "number") {
            return this.multScalar(other);
        }
        return this.multPolynomial(other);
    }

    toString(mode: ParseMode = "unicode"): string {
        let terms: string = "";
        for (const [degree, coef] of Object.entries(
            this.coefficients
        ).reverse()) {
            if (+degree > 0) {
                if (mode == "unicode") {
                    terms += `${coef == 1 ? "" : coef}x${toSuper(+degree)}`;
                } else if (mode == "html") {
                    terms += `${coef == 1 ? "" : coef}x<sup>${degree}</sup>`;
                } else if (mode == "latex") {
                    terms += `${coef == 1 ? "" : coef}x^{${degree}}`;
                } else {
                    throw new Error("Invalid parse mode");
                }
            } else {
                terms += `${coef}`;
            }
        }
        return terms;
    }
}
