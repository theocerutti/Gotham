export enum Role {
  User = "user",
  Manager = "manager",
  GeneralManager = "generalManager"
}

export const RoleLevel = {
  [Role.User]: 1,
  [Role.Manager]: 2,
  [Role.GeneralManager]: 3,
};

export const getRoleLevel = (role: Role): number => {
  return RoleLevel[role];
};