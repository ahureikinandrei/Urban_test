export type VerticesCoordinates = [number, number, number];

export type VerticesCoordinatesInJsonDocument = [VerticesCoordinates];

export interface IFeatures {
    type: string;
    geometry: {
        type: string;
        coordinates: VerticesCoordinatesInJsonDocument[];
    };
    properties: {
        Description: string;
        Name: string;
    };
}

export interface IDistrictsData {
    crs: {
        properties: {
            name: string;
        };
        type: string;
    };
    features: IFeatures[];
}

export type Coordinates = [number, number];

export type WorkerPointInPolygonData = {
    polygon: VerticesCoordinates[];
    coordinates: number[];
};
