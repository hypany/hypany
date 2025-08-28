import type { Metadata } from "next";
import "../globals.css";

import Footer from "@/components/molecules/landing/footer";
import { NavBar } from "@/components/molecules/landing/navbar";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
	metadataBase: new URL("https://yoururl.com"),
	title: siteConfig.name,
	description: siteConfig.description,
	keywords: ["Marketing", "Database", "Software"],
	authors: [
		{
			name: "yourname",
			url: "",
		},
	],
	creator: "yourname",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		creator: "@yourname",
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className="min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-orange-100 selection:text-orange-600"
				style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
			>
				<NavBar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
