import racesRoute from "../components/race/race.route";
import usersRoute from "../components/user/user.route";

class Routes {
    public init(app) {
        racesRoute(app);
        usersRoute(app);
    }
}

export const routes = new Routes();
