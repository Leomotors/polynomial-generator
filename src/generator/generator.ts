import { Polynomial } from "../polynomial";
import { Root } from "../root";
import { BaseGenerator } from "./baseGenerator";

import { randRange } from "./utils";

export interface GeneratorConfig {
    numeratorRange: number;
    denominatorRange: number;
    degree: number;
}

export class Generator extends BaseGenerator {
    private config: GeneratorConfig;

    constructor(config: GeneratorConfig) {
        super();
        this.config = config;
    }

    override generate(): [Polynomial, Root[]] {
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
