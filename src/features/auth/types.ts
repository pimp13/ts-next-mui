export type User = {
  id: string;
  name: string;
  email: string;
  roleSlug: string;
  permissions: string[];
  status: string;
  firstName?: string;
  lastName?: string;
  username?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type GoAuthUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username?: string;
  role: string;
  permissions: string[];
  status: string;
};

export type GoSession = {
  expires_at: string;
  user: GoAuthUser;
};

export function mapGoAuthUser(user: GoAuthUser): User {
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return {
    id: user.id,
    name: name || user.username || user.email,
    email: user.email,
    roleSlug: user.role,
    permissions: user.permissions ?? [],
    status: user.status,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
  };
}

export function hasPermission(user: User | null | undefined, code: string) {
  return Boolean(user?.permissions?.includes(code));
}
