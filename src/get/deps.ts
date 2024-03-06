import { env } from "bun";

import type { PackageJson, ResolvedDependencies } from "../types";

import { DEFAULT_TARGETS } from "../constants";

const getDeps = (json: PackageJson): ResolvedDependencies => {
  let resolvedDeps = [
    ...new Set(DEFAULT_TARGETS.flatMap((target) => Object.keys(json[target] || []))),
  ];
  if (env.ACRNS_INCLUDE.length > 0)
    resolvedDeps = resolvedDeps.filter((dep) => env.ACRNS_INCLUDE.some((inc) => dep.includes(inc)));
  if (env.ACRNS_EXCLUDE.length > 0)
    resolvedDeps = resolvedDeps.filter((dep) => !env.ACRNS_EXCLUDE.some((ex) => dep.includes(ex)));

  return resolvedDeps;
};

export default getDeps;
