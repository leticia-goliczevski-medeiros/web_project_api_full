import PreHeader from '../components/PreHeader/PreHeader';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';

export default function Home({newCardPopup, editAvatarPopup, editProfilePopup, cards, onCardLike, onCardDelete}) {
  
  return (
    <>
      <PreHeader />
      <Header />
      <Main
      newCardPopup={newCardPopup}
      editAvatarPopup={editAvatarPopup}
      editProfilePopup={editProfilePopup}
      cards={cards}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete} />
      <Footer />
    </>
  )
}
