import Image from 'next/image';
import Modal from 'react-modal';

import styles from './styles.module.scss'

type Service = {
  urlbackground: string;
  serviceName: string,
  description: string,
  client: string,
  date: string,
  serviceType: string,
  responsible: string,
  estimatedValue: string,
}

interface ServiceModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  services?: Service
}

export function ServiceModal({ isOpen, onRequestClose, services }: ServiceModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="close-button">
        <button onClick={onRequestClose}>
          <Image src="/close.svg" alt="" width={1} height={1}/>
        </button>
      </div>
      <section className="content">
        <div>
          <Image src="/bg2-2.jpeg" alt="" width={600} height={500} />
        </div>
        <div>
          <h1>{services.serviceName}</h1>
          <p className="description">
            {services.description}
          </p>
          <div className="table-desc">
            <p>Cliente: <span>{services.client}</span></p>
            <p>Data: <span>{services.date}</span></p>
            <p>Tipo de serviço: <span>{services.serviceType}</span></p>
            <p>Responsáveis: <span>{services.responsible}</span></p>
            <p>Orçamento aproximado: <span>{services.estimatedValue}</span></p>
          </div>
        </div>
      </section>
    </Modal>
  )
}