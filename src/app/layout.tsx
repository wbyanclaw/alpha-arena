import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alpha Arena",
  description: "交易总览首版",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, minHeight: "100vh", backgroundColor: "#07111f", color: "#e2e8f0" }}>
        {children}
      </body>
    </html>
  );
}
