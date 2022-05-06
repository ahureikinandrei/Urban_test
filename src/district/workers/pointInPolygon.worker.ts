import { parentPort, workerData } from 'worker_threads';
import { WorkerPointInPolygonData } from '../district.types';

type Polygons = number[][];

const pointInPolygon = (polygon: Polygons, point: number[]) => {
    let isPointInPolygon = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i += 1) {
        if (
            polygon[i][1] > point[1] !== polygon[j][1] > point[1] &&
            point[0] <
                ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
                    (polygon[j][1] - polygon[i][1]) +
                    polygon[i][0]
        ) {
            isPointInPolygon = !isPointInPolygon;
        }
        j = i;
    }
    return isPointInPolygon;
};

if (parentPort) {
    const { polygon, coordinates } = workerData as WorkerPointInPolygonData;
    parentPort.postMessage(pointInPolygon(polygon, coordinates));
}
