#!/usr/bin/env node

import { Command } from "commander";
import { Compile } from "./compile/base";
import { execSync } from "node:child_process";

const program = new Command();
const compiler = new Compile();

program.name("luma").description("Luma CLI");

program
  .command("dev")
  .description("Start the development server")
  .action(async () => {
    await compiler.compile();
    console.log("Starting development server...");
    execSync("node .luma/server.js", { stdio: "inherit" });
  });

program
  .command("build")
  .description("Build the project")
  .action(async () => {
    await compiler.compile();
  });

program.parse();
