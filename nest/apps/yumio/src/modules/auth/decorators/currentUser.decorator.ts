// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';

// import { IJWT } from '../../../apollo.config';
// import { IContextUser } from '../../../common/model/context';

// /**
//  * @warning you should not be trusting that user from invalid jwt
//  * is the right one, only place we should do saw, when we regenerate token
//  * */
// export const NonSafeCurrentUser = createParamDecorator(
//   (data: unknown, context: ExecutionContext): IContextUser => {
//     const ctx = GqlExecutionContext.create(context);
//     const localCtx = ctx.getContext();
//     const jwtStr = localCtx.jwt;

//     if (!localCtx.user || localCtx.user.id == 0) {
//       const jwtObj = identityFromAuth(jwtStr);
//       return jwtObj?.identity?.user ?? { id: 0 };
//     } else {
//       return localCtx.user;
//     }
//   }
// );

// export const SafeCurrentUser = createParamDecorator(
//   (data: unknown, context: ExecutionContext): IContextUser => {
//     const ctx = GqlExecutionContext.create(context);
//     const localCtx = ctx.getContext();

//     if (localCtx?.user?.id != 0) {
//       return localCtx.user;
//     } else {
//       return { id: 0 };
//     }
//   }
// );

// function identityFromAuth(JWT): IJWT {
//   try {
//     const allNodes = JWT.split('.');
//     const obj = <IJWT>JSON.parse(Buffer.from(`${allNodes[1]}`, 'base64').toString('utf-8'));
//     return obj;
//   } catch (_) {
//     return {
//       identity: {
//         user: {
//           id: 0,
//         },
//       },
//     };
//   }
// }

// leaving for REF
