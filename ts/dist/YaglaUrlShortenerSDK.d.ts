import { UrlShorteningEntity } from './entity/UrlShorteningEntity';
export type * from './YaglaUrlShortenerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { YaglaUrlShortenerEntityBase } from './YaglaUrlShortenerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class YaglaUrlShortenerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    UrlShortening(entopts?: Record<string, any>): UrlShorteningEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): YaglaUrlShortenerSDK;
    tester(testopts?: any, sdkopts?: any): YaglaUrlShortenerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof YaglaUrlShortenerSDK;
export { stdutil, config, BaseFeature, YaglaUrlShortenerEntityBase, YaglaUrlShortenerSDK, SDK, };
