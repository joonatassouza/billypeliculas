import { getPrismicClient } from '../services/prismic'

import { RichText } from 'prismic-dom';

export const getHeaderTitle = async () => {
  const prismic = getPrismicClient()

    const { data } = await prismic.getByUID('contatos', 'entre-em-contato', {})

    return RichText.asText(data.titulo_contato)
}