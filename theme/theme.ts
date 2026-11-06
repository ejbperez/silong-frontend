import { createTheme, rem } from "@mantine/core";

export const brand = { brown: "#795A45", ivory: "#F7F3EC", beige: "#E9DFD0", terracotta: "#C77C59", charcoal: "#37332F", sage: "#849078", white: "#FFFFFF" };

export const theme = createTheme({
  primaryColor: "silong", primaryShade: 6,
  colors: { silong: ["#F7F3EC", "#EFE7DC", "#E9DFD0", "#D9C8B7", "#BDA38C", "#96745A", "#795A45", "#614735", "#4A3528", "#37332F"] },
  fontFamily: "var(--font-inter), sans-serif", headings: { fontFamily: "var(--font-manrope), sans-serif", fontWeight: "700" }, defaultRadius: "md", radius: { md: rem(12), lg: rem(20) }, shadows: { sm: "0 4px 18px rgba(55, 51, 47, 0.07)" },
});
