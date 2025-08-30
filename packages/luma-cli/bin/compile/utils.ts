import fs from "fs";
import path from "path";

// Recursively get all page files with 'page' in the filename
export function getPageFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getPageFiles(filePath, fileList);
    } else if (file.endsWith(".tsx") && file !== "layout.tsx") {
      fileList.push(filePath);
    }
  });

  return fileList;
}
