
import { AppDataSource } from "../config/db";
import { Token } from "../models/auth_token";
import { PolymarketStake } from "../models/poly_market";
import { User } from "../models/user";

export const PolyMarketStakeRepository = AppDataSource.getRepository(PolymarketStake).extend({

    findByUser(user: User) {
        return this.find({ where: { user }, relations: ['user'] });
    },

    findByMarketId(id: number){
        return this.findOne({ where : { tokenId: id }, relations : ["user"] });
    }
});