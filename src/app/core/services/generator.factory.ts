import { GeneratorService } from "src/app/shared/services/generator.service";

export function GeneratorFactory(generatorService: GeneratorService): (n: number) => string {
    return (n: number) => generatorService.generateString(n);
}