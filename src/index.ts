import { PORT } from './config/constants';

import app from './app';
import cashService from './cash/cash.service';
import DistrictService from './district/district.service';
import geocodingService from './geocding/geocoding.service';
import nominatimService from './locationProviders/nominatim/nominatim.service';

const port = Number(PORT ?? 8000);

geocodingService.addProviders(nominatimService);

const start = async () => {
    try {
        await DistrictService.init();
        const cashServiceStatus = await cashService.connect();
        console.log(cashServiceStatus);

        app.listen(port, '0.0.0.0', () => {
            console.log(
                `[server]: Server is running at https://localhost:${port}`
            );
        });
    } catch (e) {
        console.log(e);
    }
};

start();
