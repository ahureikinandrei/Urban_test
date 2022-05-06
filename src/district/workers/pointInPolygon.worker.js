"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const pointInPolygon = (polygon, point) => {
    let isPointInPolygon = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i += 1) {
        if (polygon[i][1] > point[1] !== polygon[j][1] > point[1] &&
            point[0] <
                ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
                    (polygon[j][1] - polygon[i][1]) +
                    polygon[i][0]) {
            isPointInPolygon = !isPointInPolygon;
        }
        j = i;
    }
    return isPointInPolygon;
};
if (worker_threads_1.parentPort) {
    const { polygon, coordinates } = worker_threads_1.workerData;
    worker_threads_1.parentPort.postMessage(pointInPolygon(polygon, coordinates));
}
