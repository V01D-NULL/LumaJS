type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <head></head>
      <body>
        {/* div used for initial hydration only - it will be discarded on the client - Do not apply styles to this div because it won't exist after hydration  */}
        <div class={{ LumaAppRoot: true }}>{children}</div>
      </body>
    </html>
  );
}
