import common from "../../utils/common/common";
import { raceController } from "./race.controller";
import validator from './race.validator';


export default (app: any) => {
    app.get(
        '/api/race/list',
        [
            common.authenticateTokenBis,
            validator.tokenCheck
        ],
        (req, res) => raceController.getRacesList(req, res)
    );

    app.get(
        '/api/race/:id', 
        [
            validator.getRace
        ],
        (req, res) => raceController.getRace(req, res)
    );

    app.post(
        '/api/race/start',
        [
            common.authenticateTokenBis
        ],
        (req, res) => raceController.startRace(req, res)
    );

    app.post(
        '/api/race/end/:id',
        [
            validator.getRace
        ],
        (req, res) => raceController.endRace(req, res)
    );
};