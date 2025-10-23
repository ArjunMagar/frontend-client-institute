
import HomePageLayout from "@/components/homepagelayout/HomePageLayout";


function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  

  return <HomePageLayout>{children}</HomePageLayout>;
}

export default CheckoutLayout;
