import '../blocks/loading.css';

export default function Loading() {
  return (
    <div className="loading-page">
      <main className="loading__info">
        <h2 className="loading__title">Loading</h2>
        <span className="loading__loader"></span>
      </main>
    </div>
  )
}