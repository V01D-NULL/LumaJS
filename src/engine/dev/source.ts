type Source = {
  filename: string;
  lineNumber: string;
  columnNumber: string;
};

type BabelSource = {
  __source: Source;
};

export type { Source, BabelSource };
