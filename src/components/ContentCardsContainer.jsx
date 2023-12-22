import "../styles/ContentCardsContainer.css";
import { PropTypes } from "prop-types";
import ContentCard from "./ContentCard";
import Empty from "./Empty";

function ContentCardsContainer({ notes, mainHandler, onDeleteHandler }) {
  if (notes.length === 0) return <Empty />;

  return (
    <main className="notes-container">
      {notes.map((note) => (
        <ContentCard
          key={note.id}
          id={note.id}
          title={note.title}
          description={note.body}
          timestamp={note.createdAt}
          archived={note.archived}
          mainHandler={mainHandler}
          onDeleteHandler={onDeleteHandler}
        />
      ))}
    </main>
  );
}

ContentCardsContainer.propTypes = {
  notes: PropTypes.array.isRequired,
  mainHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
};

export default ContentCardsContainer;
