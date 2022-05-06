export type CashedResultBody = {
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

export type Params = {};
export type ResBody = CashedResultBody;
export type ReqBody = {};
export type ReqQuery = {
    address?: string;
};
