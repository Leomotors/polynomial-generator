import { Polynomial } from "../polynomial";
import { Root } from "../root";

import { BaseGenerator } from "./baseGenerator";
import { Generator } from "./generator";

export interface MultiGeneratorOptions {
    generator: Generator;
    weight: number;
}

export class MultiGenerator extends BaseGenerator {
    private generators: Generator[] = [];
    private weights: number[] = [];
    private totalWeight: number;

    constructor(generators: MultiGeneratorOptions[]) {
        super();
        for (const generator of generators) {
            this.generators.push(generator.generator);
            this.weights.push(generator.weight);
        }
        for (let index = 1; index < this.weights.length; index++) {
            this.weights[index] += this.weights[index - 1];
        }
        this.totalWeight = this.weights[this.weights.length - 1];
    }

    override generate(): [Polynomial, Root[]] {
        const index = Math.floor(Math.random() * this.totalWeight);
        const generator =
            this.generators[this.weights.findIndex((weight) => weight > index)];

        return generator.generate();
    }
}
