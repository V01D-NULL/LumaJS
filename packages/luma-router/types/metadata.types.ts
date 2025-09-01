export type Metadata = Readonly<{
  title: string;
  description: string;
  keywords?: string[];
  og?: Record<string, string | number>;
}>;
