
import { AppDataSource } from "../config/db";
import { Token } from "../models/auth_token";
import { User } from "../models/user";

export const TokenRepository = AppDataSource.getRepository(Token).extend({

    findByToken(token: string) {
        return this.findOne({ where: { token }, relations: ['user'] });
    },

    findByUser(user: User) {
        return this.findOne({ where: { user }, relations: ['user'] });
    },

    findByExpired(expired: boolean) {
        return this.find({ where: { expired }, relations: ['user'] });
    },
});