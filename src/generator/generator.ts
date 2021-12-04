import { Polynomial } from "../polynomial";
import { Root } from "../root";

import { randRange } from "./utils";

export interface GeneratorConfig {
    numeratorRange: number;
    denominatorRange: number;
    degree: number;
}

export class Generator {
    private config: GeneratorConfig;

    constructor(config: GeneratorConfig) {
        this.config = config;
    }

    generate(): [Polynomial, Root[]] {
        const roots: Root[] = [];

        for (let i = 0; i < this.config.degree; i++) {
            const numerator = randRange(
                -this.config.numeratorRange,
                this.config.numeratorRange
            );
            const denominator = randRange(1, this.config.denominatorRange);

            roots.push({
                numerator,
                denominator,
            });
        }

        return [Polynomial.fromRoots(roots), roots];
    }
}
