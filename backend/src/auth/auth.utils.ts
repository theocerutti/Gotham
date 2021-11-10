import {Role} from "../role/role.utils";

export type JwtPayloadAccessToken = {
  username: string,
  userId: number,
  role: Role,
}

export type JwtPayloadRefreshToken = {
  userId: number,
  refreshTokenId: number,
};

export const jwtConstants = {
  secret: "secretKey", // TODO: get from env
};