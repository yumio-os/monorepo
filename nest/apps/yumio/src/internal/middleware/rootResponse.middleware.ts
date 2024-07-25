import {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class RootResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/') {
      res.json({ service: 'yumio' });
    } else {
      next();
    }
  }
}
