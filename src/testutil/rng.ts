import _ from "lodash";

export function useRandomResults(results: number[]) {
    return mockRandom(() => results.shift() ?? -1);
}

export function mockRandom(impl: typeof _.random) {
    return jest.spyOn(_, "random").mockImplementation(impl);
}
