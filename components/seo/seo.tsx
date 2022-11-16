import Head from "next/head";

interface Props {
  title: string; //max length 45 characters
  description: string; //max length 135 desktop/ 100 mobile
  url: string;
  type?: string;
  keywords: string; //max length 255 characters
  children?: React.ReactNode;
}

export const SEO = ({ title, description, url, keywords, type, children }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content={type ?? "website"} />
      <meta name="og:locale" content="ru_RU" />
      {children}
    </Head>
  );
};
