
import HomePageLayout from "@/components/homepagelayout/HomePageLayout";


function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  

  return <HomePageLayout>{children}</HomePageLayout>;
}

export default CourseLayout;
