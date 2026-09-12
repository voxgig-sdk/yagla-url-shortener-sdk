import { Context } from './Context';
declare class YaglaUrlShortenerError extends Error {
    isYaglaUrlShortenerError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { YaglaUrlShortenerError };
