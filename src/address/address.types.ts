type NotFoundBody = {
    status: string;
    search: string;
};

export type SearchResultBody = {
    status: string;
    search: string;
    location: {
        city: string;
        lat: number;
        lng: number;
        serviceArea: string[];
        postcode: string;
    };
};

export type Location = {
    city: string;
    lat: number;
    lng: number;
    postcode: string;
};

export type Params = {};
export type ResBody = SearchResultBody | NotFoundBody;
export type ReqBody = {};
export type ReqQuery = {
    address: string;
};
