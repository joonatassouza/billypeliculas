import { GetStaticProps } from "next";
import { Container } from "../../components/Container";
import { Testimonial } from '../../components/Testimonial'
import { getPrismicClient } from "../../services/prismic";

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';

import styles from './styles.module.scss'
import { useState } from "react";
import { getHeaderTitle } from "../../utils/getHeaderTitle";

type Content = {
  title: string,
  urlBackground: string
}

type Testimonial = {
  clientName: string,
  performedService: string,
  testimonial: string
}

interface ContentProps {
  pageContent: Content,
  testimonials: Testimonial[],
  headerTitle: string
}

export default function Depoimentos({ pageContent, testimonials, headerTitle }: ContentProps) {

  const [viewTestimonial, setViewTestimonial] = useState(0)

  return (
    <Container urlImg={pageContent.urlBackground} headerTitle={headerTitle}>
      <div className={styles.content}>
        <h1>{pageContent.title}</h1>
        <section>
            <Testimonial>
              <p 
                dangerouslySetInnerHTML={{ __html: testimonials[viewTestimonial].testimonial }}
                className={styles.testimonial}>
              </p>
              <p className={styles.clientName}>{testimonials[viewTestimonial].clientName}</p>
              <p className={styles.performedService}>{testimonials[viewTestimonial].performedService}</p>
            </Testimonial>
            <div className={styles.buttons}>
              <button 
                className={styles.back} 
                type="button" 
                onClick={() => (setViewTestimonial(viewTestimonial - 1))}
                disabled={viewTestimonial === 0}
              >
                <svg width="63" height="117" viewBox="0 0 63 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.9 114.9C62.5 113.3 62.5 110.7 60.9 109.1L9.79998 58.1L60.9 7C62.5 5.4 62.5 2.8 60.9 1.2C59.3 -0.4 56.7 -0.4 55.1 1.2L1.19997 55.1C0.39997 55.9 -2.67029e-05 56.9 -2.67029e-05 58C-2.67029e-05 59 0.39997 60.1 1.19997 60.9L55.1 114.8C56.7 116.5 59.3 116.5 60.9 114.9V114.9Z" fill="white"/>
                </svg>
              </button>
              <button 
                className={styles.forward} 
                type="button" 
                onClick={() => (setViewTestimonial(viewTestimonial + 1))}
                disabled={viewTestimonial === (testimonials.length -1)}
              >
                <svg width="63" height="117" viewBox="0 0 63 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.2 1.1878C-0.4 2.7878 -0.4 5.3878 1.2 6.9878L52.3 57.9878L1.2 109.088C-0.4 110.688 -0.4 113.288 1.2 114.888C2.8 116.488 5.4 116.488 7 114.888L60.9 60.9878C61.7 60.1878 62.1 59.1878 62.1 58.0878C62.1 57.0878 61.7 55.9878 60.9 55.1878L7 1.2878C5.4 -0.412193 2.8 -0.412201 1.2 1.1878Z" fill="white"/>
                </svg>
              </button>
            </div>
        </section>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const headerTitle = await getHeaderTitle()

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('texto_da_pagina', 'pagina-depoimentos', {})

  const testimonial = await prismic.query(
    Prismic.predicates.at('document.type', 'testimonials'),
    { orderings: '[document.first_publication_date]'}
  )

  const pageContent = {
    title:  RichText.asText(response.data.titulo),
    urlBackground: response.data.background.url
  }

  const testimonials = testimonial.results.map(testimonial => {
    return {
      clientName: RichText.asText(testimonial.data.client_name),
      performedService: RichText.asText(testimonial.data.performed_service),
      testimonial: RichText.asHtml(testimonial.data.testimonial),
    }
  })

  return {
    props: {
      pageContent,
      testimonials,
      headerTitle
    },
    revalidate: 60 * 60 * 12, //12 hours
  }
}