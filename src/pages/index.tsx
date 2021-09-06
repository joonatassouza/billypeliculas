import styles from "./home.module.scss";

import { Container } from "../components/Container";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "../services/prismic";

import { RichText } from "prismic-dom";
import { getHeaderTitle } from "../utils/getHeaderTitle";

type Content = {
  title: string;
  content: string[];
  urlBackground: string;
  highlightedContent: string;
};

interface ContentsProps {
  contentPage: Content;
  headerTitle: string;
}

export default function Home({ contentPage, headerTitle }: ContentsProps) {
  console.log(headerTitle);

  return (
    <Container urlImg={contentPage.urlBackground} headerTitle={headerTitle}>
      <section className={styles.contentSection}>
        <div className={styles.content}>
          <p>{contentPage.title}</p>
          <h1>
            {contentPage.content.map((word) => ` ${word}`)}
            <span>
              {` ${contentPage.highlightedContent}`}
            </span>
          </h1>
          <div className={styles.line}></div>
        </div>
      </section>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const headerTitle = await getHeaderTitle();

  const prismic = getPrismicClient();

  const response = await prismic.getByUID(
    "texto_da_pagina",
    "texto-pagina-inicial",
    {}
  );

  const contentPage = {
    title: RichText.asText(response.data.titulo),
    content: RichText.asText(response.data.texto).split(" "),
    highlightedContent: RichText.asText(response.data.texto_destaque),
    urlBackground: response.data.background.url,
  };

  console.log(headerTitle);

  return {
    props: {
      contentPage,
      headerTitle,
    },
    revalidate: 60 * 60 * 12, //12 hours
  };
};
