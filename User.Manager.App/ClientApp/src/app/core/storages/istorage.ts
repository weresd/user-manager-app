export interface IStorage
{
    /**
     * Storage support flag.
     *
     * @returns {boolean}
     */
    isSupport: boolean;

    /**
     * Stores a value in storage.
     *
     * @param {string} key
     * @param {string} value
     *
     * @returns {void}
     */
    setItem(key: string, value: string): void;

    /**
     * Returns a value from the store.
     *
     * @param {string} key
     *
     * @returns {string | null}
     */
    getItem(key: string): string | null;
}
