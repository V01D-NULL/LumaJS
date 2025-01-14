#!/usr/bin/env node

import { Command } from "commander";
import { bundle } from "./build";
import { execSync } from "node:child_process";

const program = new Command();

program.name("luma").description("Luma CLI");

program
  .command("dev")
  .description("Start the development server")
  .action(async () => {
    await bundle();
    console.log("Starting development server...");
    execSync("node .luma/server.js", { stdio: "inherit" });
  });

program
  .command("build")
  .description("Build the project")
  .action(async () => {
    await bundle();
  });

program.parse();
