import "./globals.css";
import Title from "./components/Title";
import SongContextProvider from "./song-context";
import AuthContextProvider from "./auth-context";

export const metadata = {
  title: "Underground Music",
  description:
    "Site for underground/unknown artists with little or no following",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <SongContextProvider>
            <Title />
            {children}
          </SongContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
