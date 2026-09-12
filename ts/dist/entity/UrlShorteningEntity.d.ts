import { YaglaUrlShortenerEntityBase } from '../YaglaUrlShortenerEntityBase';
import type { YaglaUrlShortenerSDK } from '../YaglaUrlShortenerSDK';
import type { Control } from '../types';
import type { UrlShortening, UrlShorteningCreateData } from '../YaglaUrlShortenerTypes';
declare class UrlShorteningEntity extends YaglaUrlShortenerEntityBase<UrlShortening> {
    constructor(client: YaglaUrlShortenerSDK, entopts: any);
    make(this: UrlShorteningEntity): UrlShorteningEntity;
    create(this: any, reqdata?: UrlShorteningCreateData, ctrl?: Control): Promise<UrlShorteningEntity>;
}
export { UrlShorteningEntity };
