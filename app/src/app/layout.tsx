import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Sana Workflow Builder",
	description: "Sana Workflow Builder, created by August Björnberg",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable}`}>
				{children}
			</body>
		</html>
	)
}