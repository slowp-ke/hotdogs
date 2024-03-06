#!/usr/bin/env bun

import { env } from "bun";

import type { Env } from "~/types";

import { debug, format } from "~/console";

type Parser = (args: string[], regex: RegExp) => string[];
const getSplitArg: Parser = (argv, regex) => {
  return (
    argv
      .find((arg) => regex.test(arg))
      ?.split(regex)[1]
      .split(",") || []
  );
};
// TODO: Regex to allow full words e.g. `acrns --debug --write`
// Current args are pretty lax, but gets the job done for now.
const VALID_ARG_TARGETS: Record<keyof Env, [RegExp, parser?: Parser]> = {
  ACRNS_DEBUG: [/^((-|--))[A-z]*(d|v)/],
  ACRNS_EXCLUDE: [/^(?:-|--)x=/, getSplitArg],
  ACRNS_HELP: [/^((-|--))[A-z]*(h)/],
  ACRNS_INCLUDE: [/^(?:-|--)i=/, getSplitArg],
  ACRNS_NO_FORMAT: [/^((-|--))[A-z]*(F)/],
  ACRNS_WRITE_TO_FILE: [/^((-|--))[A-z]*(w)/],
};

// TODO: Really need to figure out a way to make typescript happy here.
type TempType = ("false" | "true") & string[];

const setArgs = (argv: string[]): void => {
  const [, , ...args] = argv;
  Object.entries(VALID_ARG_TARGETS).forEach(([target, extract]) => {
    const envKey = target as keyof Env;
    env[envKey] = `${args.some((arg) => extract[0].test(arg))}` as TempType;
    if (extract[1])
      checkEnv(envKey)
        ? (env[envKey] = extract[1]?.(args, extract[0]) as TempType)
        : (env[envKey] = [] as string[] as TempType);
    debug(target, env[target] || "false");
  });

  if (checkEnv("ACRNS_HELP")) {
    console.log(
      `${format(" USAGE:	  ", "BRIGHT")} acrns [options]`,
      `${format("\n EXAMPLE: ", "BRIGHT")} acrns -d -w │ acrns -dw │ acrns -d -i=eslint -x=airbnb`,
      `${format("\n\n OPTIONS: ", "BRIGHT")}`,
      `${format("\n -d, -v ")}${format(" Show debug messages 	", "DIM")} acrns -d`,
      `${format("\n -F 	")}${format(" Disable formatting 	", "DIM")} acrns -F`,
      `${format("\n -h 	")}${format(" Show this message 	", "DIM")} acrns -h`,
      `${format("\n -i 	")}${format(" Include dependencies 	", "DIM")} acrns -i=react`,
      `${format("\n -w 	")}${format(" Write updates to `package.json` ", "DIM")} acrns -w`,
      `${format("\n -x 	")}${format(" Exclude dependencies 	", "DIM")} acrns -x=eslint`,
    );
    process.exit(0);
  }
};
export default setArgs;

export const checkEnv = (key: keyof Env): boolean => {
  return env[key] === "true";
};
