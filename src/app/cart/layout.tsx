
import HomePageLayout from "@/components/homepagelayout/HomePageLayout";


function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  

  return <HomePageLayout>{children}</HomePageLayout>;
}

export default CartLayout;
