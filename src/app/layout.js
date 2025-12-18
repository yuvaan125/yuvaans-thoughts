import "./globals.css";

export const metadata = {
  title: "Yuvaan's Thoughts",
  description: "Personal blog by Yuvaan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
