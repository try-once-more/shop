export class MathHelper {
    static round(source: number, digits: MathHelperDigits = MathHelperDigits._2): number {
        return Math.round(source * digits) / digits;
    }
}

export enum MathHelperDigits {
    _1 = 10,
    _2 = 100,
    _3 = 1000,
}