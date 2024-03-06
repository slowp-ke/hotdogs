export interface Env {
  ACRNS_DEBUG: "false" | "true";
  ACRNS_EXCLUDE: string[];
  ACRNS_HELP: "false" | "true";
  ACRNS_INCLUDE: string[];
  ACRNS_NO_FORMAT: "false" | "true";
  ACRNS_WRITE_TO_FILE: "false" | "true";
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  optionalDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  resolutions: Record<string, string>;
}

export type ResolvedDependencies = string[];

export type DependencyVersions = Record<string, string>;

// TODO: Add more version types
export interface NPMResponse {
  beta: string;
  latest: string;
  next: string;
}
