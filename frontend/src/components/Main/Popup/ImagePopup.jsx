export default function ImagePopup({card}) {
  return (
    <>
      <img className="image-popup__image" src={card.link} alt={card.name} />
      <h2 className="image-popup__title">{card.name}</h2>
    </>
  )
}