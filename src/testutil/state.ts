export function useTestState<T>(producer: () => T): T {
    const stateObject = producer();

    beforeEach(() => {
        const newStateObjectToMap = producer();
        const keysToMap = Object.keys(newStateObjectToMap) as (keyof T)[];
        keysToMap.forEach(key => {
            stateObject[key] = newStateObjectToMap[key];
        });
    });

    return stateObject;
}
