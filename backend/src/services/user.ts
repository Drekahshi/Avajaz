import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { TokenRepository } from "../repository/auth_token";
import { env } from "../config/env";
import { UserRepository } from "../repository/user";
import { UserLoginRequest } from "./type";


export class UserService {

  constructor() {}

  async deactivate(id: string): Promise<void> {
    await UserRepository.update(id, { isActive: false });
  }

  async connect(request: UserLoginRequest): Promise<{ token: string }> {

    console.log(request)
    
    let user: User | null = null;

    if (request.address) {
      user = await UserRepository.findByWalletAddress(request.address);
      if (!user) throw new Error('Invalid wallet address');
    }

    if (!user) {
        user = UserRepository.create({ walletAddress: request.address, email : request.email, isActive: true });

        await UserRepository.save(user);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email ?? '',
        walletAddress: user.walletAddress ?? ''
      },
      env.jwt.secret as string,
      { expiresIn: env.jwt.expiresIn }
    );

    await TokenRepository.save(
      TokenRepository.create({
        token,
        user,
        expired: false,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      })
    );

    return { token };
  }

  async logout(token: string): Promise<void> {
    const tokenEntity = await TokenRepository.findByToken(token);
    if (tokenEntity) {
      await TokenRepository.update(tokenEntity.id, { expired: true });
    }
  }
};

export const userService = new UserService();