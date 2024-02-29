// @/app/page.tsx
import { Carousel } from "@/components/carousel";
import { ThreeItemGrid } from "@/components/grid/three-items";
// import DisplayLocations from "@/components/apolloTest/DisplayLocations";

export const runtime = "edge";

export const metadata = {
  title: "Test store commercetools API.",
  description:
    "Ecommerce test store built with Next.js, and commercetools API.",
};

export default async function Page() {
  return (
    <>
      {/* <DisplayLocations /> */}
      <ThreeItemGrid />
      <Carousel />
    </>
  );
}