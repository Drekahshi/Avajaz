import { Router, Request, Response } from 'express';
import { userService } from '../services/user';

const UserRouter = Router();

UserRouter.post('/connect', async (req: Request, res: Response) => {
  console.log('body:', req.body);
  const { token } = await userService.connect(req.body);
  res.json({ token });
});

UserRouter.patch('/logout', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(403).json({ error: 'JWT_EXPIRED' });
      return;
    }

    const token = authHeader.split(' ')[1];
    await userService.logout(token);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default UserRouter;