import {Role} from "../role/role.utils";

export type JwtPayload = {
  username: string,
  userId: number,
  role: Role,
}

export const jwtConstants = {
  secret: "secretKey", // TODO: get from env
};