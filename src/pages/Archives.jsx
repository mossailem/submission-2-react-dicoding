import { Component } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Toolbar from "../components/Toolbar";
import {
  deleteNote,
  getArchivedNotes,
  unarchiveNote,
} from "../utils/local-data";
import ContentCardsContainer from "../components/ContentCardsContainer";
import { useSearchParams } from "react-router-dom";
import { PropTypes } from "prop-types";

function ArchivesPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Archives searchParams={searchParams} setSearchParams={setSearchParams} />
  );
}

class Archives extends Component {
  constructor(props) {
    super(props);

    const q = this.props.searchParams.get("q");

    this.state = {
      notes: q ? this.search(getArchivedNotes(), q) : getArchivedNotes(),
    };

    this.onUnarchiveNote = this.onUnarchiveNote.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);

    if (this.props.searchParams.get("q"))
      this.onSearchHandler({ value: this.props.searchParams.get("q") });
  }

  onSearchHandler({ value }) {
    this.props.setSearchParams({ q: value ? value.toLowerCase() : "" });

    this.setState(() => {
      return {
        notes: this.search(getArchivedNotes(), value),
      };
    });
  }

  onUnarchiveNote(id) {
    this.setState(() => {
      unarchiveNote(id);

      return {
        notes: getArchivedNotes(),
      };
    });
  }

  onDeleteHandler(id) {
    this.setState(() => {
      deleteNote(id);

      return {
        notes: getArchivedNotes(),
      };
    });
  }

  search(notes, query) {
    return notes.filter((datum) =>
      datum.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  render() {
    return (
      <>
        <Toolbar isHome={false} title="Archives" />
        <SearchBar
          searchHandler={this.onSearchHandler}
          searchQuery={this.props.searchParams.get("q")}
        />
        <ContentCardsContainer
          notes={this.state.notes}
          mainHandler={this.onUnarchiveNote}
          onDeleteHandler={this.onDeleteHandler}
        />
        <Footer />
      </>
    );
  }
}

Archives.propTypes = {
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

export default ArchivesPageWrapper;
