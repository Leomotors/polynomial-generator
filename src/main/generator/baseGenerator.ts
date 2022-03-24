import { Polynomial } from "../polynomial";
import { Root } from "../root";

export abstract class BaseGenerator {
    generate?(): [Polynomial, Root[]];
}
