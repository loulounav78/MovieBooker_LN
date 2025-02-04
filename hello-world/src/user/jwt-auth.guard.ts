import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    /*   
    canActivate(context: ExecutionContext) {
          const request = context.switchToHttp().getRequest();
          const authHeader = request.headers;
          console.log('Token utilisé :', authHeader);
          return super.canActivate(context);
        }
    */
}