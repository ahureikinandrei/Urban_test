import { access, readFile } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { Worker } from 'worker_threads';
import {
    Coordinates,
    IDistrictsData,
    IFeatures,
    VerticesCoordinates,
} from './district.types';
import {
    DISTRICT_SERVICE_ERROR_MSG,
    DISTRICT_SERVICE_WORKING_STATUS,
} from '../utils/constants';
import { DISTRICT_DATA_FILE_NAME } from '../config/constants';

class DistrictService {
    districtsData: IDistrictsData | null = null;

    districts: IFeatures[] = [];

    pointsInPolygonWorkerPath: string;

    constructor() {
        this.pointsInPolygonWorkerPath = path.join(
            __dirname,
            'workers',
            'pointInPolygon.worker'
        );
    }

    async init() {
        try {
            const pathToFile = await this.getPathToDistrictsInfo();
            const dataDistrictFile = await readFile(pathToFile, 'utf8');

            const districtsData: IDistrictsData = JSON.parse(dataDistrictFile);

            this.districtsData = districtsData;

            this.setDistrictsArray(districtsData.features);

            return DISTRICT_SERVICE_WORKING_STATUS;
        } catch (e) {
            return DISTRICT_SERVICE_ERROR_MSG;
        }
    }

    setDistrictsArray(districtsFeatures: IFeatures[]) {
        const { districts } = this;

        districtsFeatures.forEach((districtFeature) => {
            districts.push(districtFeature);
        });
    }

    async getNamesServicesForLocation(coordinates: Coordinates) {
        const { districts } = this;

        const calculations: Promise<boolean>[] = [];
        const results: string[] = [];

        districts.forEach((district: IFeatures) => {
            const { geometry } = district;

            const [validCoordinates] = geometry.coordinates;

            const calculationServiceArea =
                this.calculationCoordinateInDistrictArea(
                    validCoordinates,
                    coordinates
                );

            calculations.push(calculationServiceArea);
        });

        const calculationsResult = await Promise.allSettled<boolean>(
            calculations
        );

        calculationsResult.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                const { properties } = districts[index];
                const { Name } = properties;
                results.push(Name);
            }
        });

        return results;
    }

    async getPathToDistrictsInfo() {
        const pathToFile = path.join(
            __dirname,
            '..',
            '..',
            'static',
            DISTRICT_DATA_FILE_NAME
        );
        await access(pathToFile, constants.F_OK);
        return pathToFile;
    }

    calculationCoordinateInDistrictArea(
        polygon: VerticesCoordinates[],
        coordinates: Coordinates
    ) {
        const { pointsInPolygonWorkerPath } = this;
        return new Promise<boolean>((resolve, reject) => {
            const worker = new Worker(pointsInPolygonWorkerPath, {
                workerData: {
                    polygon,
                    coordinates,
                },
            });

            worker.on('message', (msg: boolean) => {
                resolve(msg);
            });

            worker.on('error', () => {
                reject(false);
                // reject(err); TODO
            });

            worker.on('exit', () => {
                reject(false);
            });
        });
    }
}

export default new DistrictService();
