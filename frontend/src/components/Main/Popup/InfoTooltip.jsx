import '../../../blocks/popup.css';
import checkCircle from '../../../images/check-circle.png';
import warningCircle from '../../../images/warning-circle.png';

export default function InfoTooltip({registerStataus}) {
  return (
    <img className="popup__image" src={registerStataus? checkCircle : warningCircle} alt='Check or warning icon.'/>
  )
}