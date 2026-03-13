import { AppDataSource } from "../config/db";
import { User } from "../models/user";

export const UserRepository = AppDataSource.getRepository(User).extend({

    findByEmail(email: string) {
        return this.findOne({
            where: { email },
            relations: ['polymarket_stake', 'avajaz_chess_stake'],
        });
    },

    findByWalletAddress(walletAddress: string) {
        return this.findOne({ where: { walletAddress }, relations: ['polymarket_stake', 'avajaz_chess_stake']});
    },

});