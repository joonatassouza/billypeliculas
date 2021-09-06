import styles from "./home.module.scss";

import { Container } from "../components/Container";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "../services/prismic";

import { RichText } from "prismic-dom";
import { getHeaderTitle } from "../utils/getHeaderTitle";

type Content = {
  title: string;
  content: string;
  urlBackground: string;
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
            {contentPage.content[0]}
            <span> </span> {contentPage.content[1]}
            <span> </span> {contentPage.content[2]}
            <span> </span> {contentPage.content[3]}
            <span> </span> {contentPage.content[4]}
            <span> </span> {contentPage.content[5]}
            <span> </span> {contentPage.content[6]}
            <span> </span> {contentPage.content[7]}
            <span>
              <span> </span> {contentPage.content[9]}
              <span> </span> {contentPage.content[10]}
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
