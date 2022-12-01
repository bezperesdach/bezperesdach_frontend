import Head from "next/head";

interface Props {
  title: string; //max length 45 characters
  description: string; //max length 135 desktop/ 100 mobile
  url: string;
  type?: string;
  children?: React.ReactNode;
}

export const SEO = ({ title, description, url, type, children }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type ?? "website"} />
      <meta name="og:locale" content="ru_RU" />

      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {children}
    </Head>
  );
};
