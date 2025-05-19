import '../../../blocks/popup.css';
import { useContext } from 'react';

import closeIcon from '../../../images/close-icon.png';

import { PopupContext } from '../../../contexts/PopupContext';

export default function Popup({title, children}) {
  const { popup, setPopup } = useContext(PopupContext);

  return (
    <section className={`popup`}>
      <div className={title? `popup__container`: `image-popup__container`}>
        <img
          className="popup__close-icon"
          src={closeIcon}
          alt="Ícone de fechar."
          onClick={() => setPopup(null)}
        />
        {popup.infoTooltip ? (
          <>
            {children}
            {title && <h2 className="popup__title popup__title_info-tooltip">{title}</h2>}
          </>
        ) : (
          <>
            {title && <h2 className="popup__title">{title}</h2>}
            {children}
          </>
        )}
      </div>
    </section>
  )
}