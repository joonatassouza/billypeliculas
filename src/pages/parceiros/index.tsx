import { GetStaticProps } from "next";
import { useState } from "react";
import { Container } from "../../components/Container";
import { getPrismicClient } from "../../services/prismic";

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';

import styles from './styles.module.scss'
import { getHeaderTitle } from "../../utils/getHeaderTitle";
import Image from "next/image";

type ContentPage = {
  title: string;
}

type Partner = {
  id: string;
  partnerName: string;
  partnerSite: string;
  urlImage: string;
}

interface ContentsProps {
  contentPage: ContentPage,
  partners: Partner[],
  headerTitle: string
}

export default function Parceiros({ contentPage, partners, headerTitle }: ContentsProps) {

  return(
    <Container headerTitle={headerTitle}>
      <div className={styles.content}>
        <h1>{contentPage.title}</h1>
        <section className={styles.partners}>
          {partners.map((partner) => (
            <div key={partner.id} className={styles.logoPartner}>
              <Image src="/_2.png" alt={partner.partnerName} width={200} height={40} />
            </div>
          ))}
        </section>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const headerTitle = await getHeaderTitle()
  
  const prismic = getPrismicClient()

  const response = await prismic.getByUID('texto_da_pagina', 'nossos-parceiros', {})

  const partnerResponse = await prismic.query(
    Prismic.predicates.at('document.type', 'parceiros'),
    { orderings: '[document.last_publication_date]'}
  )

  const contentPage = {
    title: RichText.asText(response.data.titulo),
  }

  const partners = partnerResponse.results.map(partner => {
    return {
      id: partner.uid,
      partnerName: RichText.asText(partner.data.nome_do_parceiro),
      partnerSite: RichText.asText(partner.data.site),
      urlImage: partner.data.imagem_do_parceiro.url
    }   
  })

  return {
    props: {
      contentPage,
      partners,
      headerTitle
    },
    revalidate: 60 * 60 * 12, //12 hours
  }
}