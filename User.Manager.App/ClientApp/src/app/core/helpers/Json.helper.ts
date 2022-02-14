export class JsonHelper
{
    /**
     * Decodes a JSON string or returns a default value on a JSON parse error.
     *
     * @param {string} json
     * @param {any} defaultValue
     *
     * @returns {any}
     */
    public static decode(json: string, defaultValue: any = null): any
    {
        try {
            return JSON.parse(json);
        } catch {
            return defaultValue;
        }
    }
}
