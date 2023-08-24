import { Injectable } from "@angular/core";
import { genID } from "src/app/core/services/gen-id.generator";

@Injectable({
    providedIn: "root"
})
export class GeneratorService {
    private idGenerator = genID();

    generate<T>(generator: () => T): T {
        return generator();
    }

    generateArray<T>(count: number, generator: (index: number) => T): T[] {
        return Array.from({ length: count }, (_, i) => (generator(i)));
    }

    random(max: number): number {
        return Math.floor(Math.random() * max);
    }

    generateString(length: number): string {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = this.random(characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    getNewID(): number | void {
        return this.idGenerator.next().value;
    }
}
