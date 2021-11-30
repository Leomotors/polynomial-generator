import { Root } from "..";
import { parseRoot } from "../root/parseUtils";
import { toSuper } from "./parseUtils";

export type Coefficients = { [degree: number]: number };
type ParseMode = "unicode" | "html" | "latex";

// * NOTE: Most of the code are written by GitHub Copilot ✨✨

export class Polynomial {
    coefficients: Coefficients;

    constructor(coefficients: Coefficients = {}) {
        this.coefficients = coefficients;
        this.cleanSelf();
    }

    static monomial(coefficient: number, degree: number): Polynomial {
        const coef: Coefficients = {};
        coef[degree] = coefficient;
        return new Polynomial(coef);
    }

    static fromRoot(root: string | Root): Polynomial {
        if (typeof root === "string") {
            root = parseRoot(root);
        }

        const parsedRoot = root as Root;

        return new Polynomial({
            0: -parsedRoot.numerator,
            1: parsedRoot.denominator,
        });
    }

    private addScalar(scalar: number): Polynomial {
        const result = new Polynomial(this.coefficients);
        result.coefficients[0] += scalar;
        result.cleanSelf();
        return result;
    }

    private addPolynomial(other: Polynomial): Polynomial {
        const result = new Polynomial(this.coefficients);

        for (const degree in other.coefficients) {
            result.coefficients[degree] =
                (result.coefficients[degree] || 0) + other.coefficients[degree];
        }

        result.cleanSelf();
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
        result.cleanSelf();
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
        result.cleanSelf();
        return result;
    }

    mult(other: Polynomial | number): Polynomial {
        if (typeof other === "number") {
            return this.multScalar(other);
        }
        return this.multPolynomial(other);
    }

    private cleanSelf(): void {
        for (const [degree, coef] of Object.entries(this.coefficients)) {
            if (coef == 0) {
                delete this.coefficients[+degree];
            }
        }
    }

    toString(mode: ParseMode = "unicode"): string {
        let terms: string = "";
        for (const [degree, coef] of Object.entries(
            this.coefficients
        ).reverse()) {
            terms += terms.length && coef > 0 ? "+" : "";
            if (+degree > 0) {
                if (mode == "unicode") {
                    terms += `${coef == 1 ? "" : coef}x${
                        +degree > 1 ? toSuper(+degree) : ""
                    }`;
                } else if (mode == "html") {
                    terms += `${coef == 1 ? "" : coef}x${
                        +degree > 1 ? `<sup>${degree}</sup>` : ""
                    }`;
                } else if (mode == "latex") {
                    terms += `${coef == 1 ? "" : coef}x${
                        +degree > 1 ? `^{${degree}}` : ""
                    }`;
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
