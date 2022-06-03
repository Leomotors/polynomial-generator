import { Polynomial } from "../polynomial";
import { Root } from "../root";

export interface GenerateOption {
    numeratorRange: number;
    denominatorRange: number;
    degree: number;
}

export type GenerateReturnType = ReturnType<typeof generate>;

export function randRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generate(option: GenerateOption) {
    const roots: Root[] = [];

    for (let i = 0; i < option.degree; i++) {
        const numerator = randRange(
            -option.numeratorRange,
            option.numeratorRange
        );
        const denominator = randRange(1, option.denominatorRange);

        roots.push({
            numerator,
            denominator,
        });
    }

    return [Polynomial.fromRoots(roots), roots] as [Polynomial, Root[]];
}

export function generateMany(option: GenerateOption, count: number) {
    const polys: GenerateReturnType[] = [];

    for (let i = 0; i < count; i++) {
        polys.push(generate(option));
    }

    return polys;
}
