export function* genID() {
    let id = 1;
    while (id < Number.MAX_SAFE_INTEGER) {
        yield id++;
    }
}