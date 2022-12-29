import dynamic from "next/dynamic";
import UAParser from "ua-parser-js";

import { Main } from "../components/home-page/main/main";
import { UnauthorizedUserLayout } from "../components/layouts/unauthorized-user-layout/unauthorized-user-layout";
import { SEO } from "../components/seo/seo";

const AboutUsHomePageDynamic = dynamic(() =>
  import("../components/home-page/about-us-home-page/about-us-home-page").then((mod) => mod.AboutUsHomePage)
);
const DynamicOurAdvantages = dynamic(() =>
  import("../components/home-page/our-advantages/our-advantages").then((mod) => mod.OurAdvantages)
);
const DynamicOrderProcess = dynamic(() =>
  import("../components/home-page/order-process/order-process").then((mod) => mod.OrderProcess)
);
const DynamicWork = dynamic(() => import("../components/home-page/work/work").then((mod) => mod.Work));
const DynamicBonus = dynamic(() => import("../components/home-page/bonus/bonus").then((mod) => mod.Bonus));
const DynamicContact = dynamic(() => import("../components/home-page/contact/contact").then((mod) => mod.Contact));

import { ReviewsBlock } from "../components/reviews-block/reviews-block";
import { getReviews } from "../api/api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

// import styles from "../styles/Home.module.css";

export default function Home({ reviews, deviceType }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <UnauthorizedUserLayout>
      <SEO
        title="Безпересдач - онлайн-проект для помощи в учёбе"
        description="Команда “Без пересдач” поможет написать дипломную, курсовую и множество других работ, проведет консультацию и подготовит к успешной сдачи!"
        url="https://bezperesdach.ru"
      />

      <Main />
      <ReviewsBlock reviews={reviews} deviceType={deviceType} />
      <AboutUsHomePageDynamic />
      <DynamicOurAdvantages />
      <DynamicOrderProcess />
      <DynamicWork />
      <DynamicBonus />
      <DynamicContact />
    </UnauthorizedUserLayout>
  );
}

interface Props {
  deviceType: string;
  reviews: Review[];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const res = await getReviews();
  const reviews: Review[] = await res.json().then((data) => data.data);

  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent as string);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
  return {
    props: {
      deviceType,
      reviews,
    },
  };
};

// export function getServerSideProps(context) {
//   return {
//     props: {
//       uaString: context.req.headers["user-agent"],
//     },
//   };
// }
