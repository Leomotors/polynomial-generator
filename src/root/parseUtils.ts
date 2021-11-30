export interface Root {
    numerator: number;
    denominator: number;
}

function gcd(a: number, b: number): number {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

export function parseRoot(root: string): Root {
    const n = root.split("/");
    const num = Number(n[0]) || 0;
    const denom = Number(n[1]) || 1;
    const gcf = gcd(num, denom);

    return {
        numerator: num / gcf,
        denominator: denom / gcf,
    };
}
