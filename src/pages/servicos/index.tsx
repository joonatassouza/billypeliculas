import { GetStaticProps } from "next";
import { useState } from "react";
import { Container } from "../../components/Container";
import { getPrismicClient } from "../../services/prismic";

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import styles from './styles.module.scss'
import { ServiceModal } from "../../components/ServiceModal";
import { getHeaderTitle } from "../../utils/getHeaderTitle";

type ContentPage = {
  title: string;
}

type Service = {
  id: string;
  serviceName: string,
  category: string,
  urlbackground: string;
  description: string,
  client: string,
  date: string,
  serviceType: string,
  responsible: string,
  estimatedValue: string,
}

interface ContentsProps {
  contentPage: ContentPage,
  services: Service[],
  headerTitle: string
}

export default function Servicos({ contentPage, services, headerTitle }: ContentsProps ) {
  const [background, setBackground] = useState(services[0]?.urlbackground)

  const [modalIndex, setModalIndex] = useState(-1)

  function handleMouseEnter(id) {
    setBackground(id)
  }

  function handleOpenServiceModal(index: number) {
    setModalIndex(index)
  }

  function handleCloseServiceModa() {
    setModalIndex(-1);
  }

  return (
    <Container urlImg={background} isScreenBigger headerTitle={headerTitle}>
      <div className={styles.content}>
        <h1>{contentPage.title}</h1>
        <section className={styles.serviceSection}>
          {services.map((service, index) => (
            <button 
              key={service.id} 
              className={styles.service}  
              onMouseEnter={() => handleMouseEnter(service.urlbackground)}
              onClick={() => handleOpenServiceModal(index)}
            >
              <h2>{service.serviceName}</h2>
              <span>{service.category}</span>
            </button>
            
          ))}
        </section>
      </div>
      {modalIndex !== -1 && (
        <ServiceModal 
          isOpen={modalIndex !== -1}
          onRequestClose={handleCloseServiceModa}
          services={services[modalIndex]}
        />
      )}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const headerTitle = await getHeaderTitle()

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('texto_da_pagina', 'texto-pagina-servicos', {})

  const serviceResponse = await prismic.query(
    Prismic.predicates.at('document.type', 'servicos_realizados'),
    { orderings: '[servicos_realizados.date desc]'}
  )

  const contentPage = {
    title: RichText.asText(response.data.titulo),
  }

  const services = serviceResponse.results.map(service => {
    return {
      id: service.uid,
      serviceName: RichText.asText(service.data.titulo_do_servico),
      category: RichText.asText(service.data.categoria),
      urlbackground: service.data.imagem_do_servico.url,
      description: RichText.asText(service.data.description),
      client: RichText.asText(service.data.client),
      date: new Date(service.data.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      serviceType: RichText.asText(service.data.service_type),
      responsible: RichText.asText(service.data.responsible),
      estimatedValue: RichText.asText(service.data.estimated_value)
    }   
  })
  return {
    props: {
      contentPage,
      services,
      headerTitle
    },
    revalidate: 60 * 60 * 12, //12 hours
  }
}