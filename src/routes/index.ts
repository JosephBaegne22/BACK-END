import carsRoute from "../components/cars/cars.route";
import race_reportsRoute from "../components/raceReports/raceReports.route";
import racesRoute from "../components/races/races.route";
import reportsRoute from "../components/reports/reports.route";
import usersRoute from "../components/users/users.route";

class Routes {
    public init(app : any) {
        carsRoute(app);
        race_reportsRoute(app);
        racesRoute(app);
        reportsRoute(app);
        usersRoute(app);
    }
}

export const routes = new Routes();
