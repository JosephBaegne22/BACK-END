import carsRoute from "../components/car/car.route";
import race_reportsRoute from "../components/raceReports/raceReport.route";
import racesRoute from "../components/race/race.route";
import reportsRoute from "../components/report/report.route";
import usersRoute from "../components/user/user.route";

class Routes {
    public init(app) {
        carsRoute(app);
        race_reportsRoute(app);
        racesRoute(app);
        reportsRoute(app);
        usersRoute(app);
    }
}

export const routes = new Routes();
