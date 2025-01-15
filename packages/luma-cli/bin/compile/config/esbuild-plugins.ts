import fs from "fs";

export const removeGetServerPropsPlugin = {
  name: "remove-getServerProps",
  setup(build: any) {
    build.onLoad({ filter: /\.page.tsx$/ }, (args: any) => {
      const code = fs.readFileSync(args.path, "utf8");

      // TODO: This is not ideal, but its a quick and dirty hack which works for now. Revisit later.
      const modifiedCode = code.replace(
        /export\s+async\s+function\s+getServerProps[\s\S]*?}\s*$/gm,
        ""
      );

      return {
        contents: modifiedCode,
        loader: "tsx",
      };
    });
  },
};
