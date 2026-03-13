
import { AppDataSource } from "../config/db";
import { AvajazChessStake } from "../models/chess_staking";
import { User } from "../models/user";

export const ChessStakeRepository = AppDataSource.getRepository(AvajazChessStake).extend({

    findByUser(user: User) {
        return this.find({ where: { user }, relations: ['user'] });
    },

    findByBetId(id: number){
        return this.findOne({ where : { betId: id }, relations : ["user"] });
    }
});