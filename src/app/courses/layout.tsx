
import HomePageLayout from "@/components/homepagelayout/HomePageLayout";


function SubRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  

  return <HomePageLayout>{children}</HomePageLayout>;
}

export default SubRootLayout;
