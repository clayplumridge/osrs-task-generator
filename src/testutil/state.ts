export function useTestState<T extends {}>(producer: () => T): T {
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
