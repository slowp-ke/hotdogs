#!/usr/bin/env bun

import { type BunFile, argv, file } from "bun";

import getDeps from "~/get/deps";
import getVersions from "~/get/versions";
import setEnv from "~/set/env";
import setPackage from "~/set/package";

import type { PackageJson } from "./types";

import { debug } from "./console";

setEnv(argv); // Sets the environment variables based on the arguments passed to the script

const filePackage: BunFile = file("./package.json");
const objPackage: PackageJson = await (filePackage.json() as Promise<PackageJson>);

const currentDependencies = getDeps(objPackage); // Gets dependency name array from package.json
debug("Current dependencies", JSON.stringify(currentDependencies));

const updatedDepVersions = await getVersions(currentDependencies); // Queries npm registry for latest versions of dependencies

void setPackage(filePackage, objPackage, updatedDepVersions);
