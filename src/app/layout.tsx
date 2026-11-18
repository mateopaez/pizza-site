import type { Metadata } from "next";
import { restaurant } from "@/data/restaurant";
import "./globals.css";

export const metadata: Metadata = {
  title: `${restaurant.name} | Edmonton, Alberta`,
  description:
    "See Versato’s Pizza’s in-store menu and prices for Original Thick pizza, thin-topping two-pizza deals, sides and lasagna. Call to order or find us on DoorDash in Edmonton.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
