// * Internal: Utilities for Testing

import { Coefficients, Polynomial } from "..";
import { equal } from "assert";

export function termsCount(p: Polynomial): number {
    return Object.keys(p.coefficients).length;
}

export function equalTo(p: Polynomial, c: Coefficients): void {
    equal(termsCount(p), Object.keys(c).length);
    for (const [degree, coef] of Object.entries(c)) {
        equal(p.coefficients[+degree], coef);
    }
}
