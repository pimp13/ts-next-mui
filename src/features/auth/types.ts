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

export type FastifyAuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
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

function isGoSession(raw: unknown): raw is GoSession {
  return Boolean(
    raw &&
      typeof raw === "object" &&
      "user" in raw &&
      (raw as GoSession).user,
  );
}

function isGoAuthUser(raw: unknown): raw is GoAuthUser {
  return Boolean(
    raw && typeof raw === "object" && "first_name" in raw && "email" in raw,
  );
}

export function mapAuthUser(
  raw: FastifyAuthUser | GoAuthUser | GoSession,
): User {
  if (isGoSession(raw)) {
    return mapAuthUser(raw.user);
  }

  if (isGoAuthUser(raw)) {
    const name = [raw.first_name, raw.last_name].filter(Boolean).join(" ").trim();
    return {
      id: raw.id,
      name: name || raw.username || raw.email,
      email: raw.email,
      roleSlug: raw.role,
      permissions: raw.permissions ?? [],
      status: raw.status,
      firstName: raw.first_name,
      lastName: raw.last_name,
      username: raw.username,
    };
  }

  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    roleSlug: raw.role,
    permissions: [],
    status: raw.isActive ? "active" : "inactive",
  };
}

/** @deprecated use mapAuthUser */
export const mapGoAuthUser = mapAuthUser;

export function hasPermission(user: User | null | undefined, code: string) {
  return Boolean(user?.permissions?.includes(code));
}
