import { GetStaticProps } from "next";
import { Container } from "../../components/Container";
import { getPrismicClient } from "../../services/prismic";

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';

import styles from './styles.module.scss'
import { getHeaderTitle } from "../../utils/getHeaderTitle";

type Page = {
  title: string,
}

type Contact = {
  contactTitle: string,
  firstContactName: string,
  firstContact: string,
  secondContactName: string, 
  secondContact: string
}

interface ContatosProps {
  pageContent: Page,
  contacts: Contact[],
  headerTitle: string
}

export default function Contatos({ pageContent, contacts, headerTitle }: ContatosProps) {
  return (
    <Container headerTitle={headerTitle}>
      <div className={styles.content}>
      <h1>{pageContent.title}</h1>
      <section className={styles.contactsSection}>
        <div className={styles.contact}>
          <p>
            {contacts[0].contactTitle[0]} <br className={styles.br} />
            {contacts[0].contactTitle[1]}
          </p>
          <div className={styles.namesContact}>
            <span className={styles.contactNameLabel}>{contacts[0].firstContactName}</span>
            <a 
              href={`mailto:${contacts[0].firstContact}`} 
              className={styles.contactLabel}
            >
              {contacts[0].firstContact}
            </a>
            <span className={styles.contactNameLabel}>{contacts[0].secondContactName}</span>
            <a 
              href={`mailto:${contacts[0].secondContact}`} 
              className={styles.contactLabel}
            >
              {contacts[0].secondContact}
            </a>
          </div>
        </div>
        <div className={`${styles.contact} ${styles.centerContact}`}>
          <p>
            {contacts[1].contactTitle[0]} <br className={styles.br} />
            {contacts[1].contactTitle[1]} <br className={styles.br} />
            {contacts[1].contactTitle[2]}
          </p>
          <div className={styles.namesContact}>
            <span className={styles.contactNameLabel}>{contacts[1].firstContactName}</span>
            <a 
              href={`tel:+55${contacts[1].firstContact}`} 
              className={styles.contactLabel}
            >
              {contacts[1].firstContact}
            </a>
            <span className={styles.contactNameLabel}>{contacts[1].secondContactName}</span>
            <a 
              href={`tel:+55${contacts[1].secondContact}`} 
              className={styles.contactLabel}
            >
              {contacts[1].secondContact}
            </a>
          </div>
        </div>
        <div className={styles.contact}>
          <p>
            {contacts[2].contactTitle[0]} <br className={styles.br} />
            {contacts[2].contactTitle[1]} <br className={styles.br} />
            {contacts[2].contactTitle[2]} <br className={styles.br} />
            {contacts[2].contactTitle[3]}
          </p>
          <div className={styles.namesContact}>
            <span className={styles.contactNameLabel}></span>
            <a
              href={contacts[2].firstContactName}
              className={styles.contactLabel}
            >
              {contacts[2].firstContact}
            </a>
            <span className={styles.contactNameLabel}>{contacts[2].secondContactName}</span>
            <span className={styles.contactLabel}>{contacts[2].secondContact}</span>
          </div>
        </div>
      </section>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const headerTitle = await getHeaderTitle()

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('texto_da_pagina', 'contacts-page', {})

  const pageContent = {
    title:  RichText.asText(response.data.titulo),
  }

  const contact = await prismic.query(
    Prismic.predicates.at('document.type', 'contatos'),
    { orderings: '[document.first_publication_date]'}
  )

  const contacts = contact.results.map(contact => {
    return {
      contactTitle: RichText.asText(contact.data.titulo_contato).split(' '),
      firstContactName: RichText.asText(contact.data.nome_contato_01),
      firstContact: RichText.asText(contact.data.contato_01),
      secondContactName: RichText.asText(contact.data.nome_contato_02),
      secondContact: RichText.asText(contact.data.contato_02),
    }
  })

  return {
    props: {
      pageContent,
      contacts,
      headerTitle
    },
    revalidate: 60 * 60 * 12, //12 hours
  }
}