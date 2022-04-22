export interface INominatimSearchParams {
    format: string;
    limit: number;
    addressdetails: number;
}

interface INominatimResponseAddress {
    road: string;
    neighbourhood: string;
    suburb: string;
    'ISO3166-2-lvl8': string;
    city: string;
    state_district: string;
    state: string;
    'ISO3166-2-lvl4': string;
    postcode: string;
    country: string;
    country_code: string;
}

export interface INominatimResponse {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    address: INominatimResponseAddress;
}
