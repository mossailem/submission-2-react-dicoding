import { Component, useContext } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Toolbar from "../components/Toolbar";
import ContentCardsContainer from "../components/ContentCardsContainer";
import { useSearchParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import LocaleContext from "../context/LocaleContext";
import {
  deleteNote,
  getArchivedNotes,
  unarchiveNote,
} from "../utils/network-data";

function ArchivesPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { locale } = useContext(LocaleContext);

  return (
    <Archives
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      locale={locale}
    />
  );
}

class Archives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };

    this.onUnarchiveNote = this.onUnarchiveNote.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);

    if (this.props.searchParams.get("q"))
      this.onSearchHandler({ value: this.props.searchParams.get("q") });
  }

  async componentDidMount() {
    const notes = await getArchivedNotes();
    const q = this.props.searchParams.get("q");

    if (q) notes.data = this.search(notes.data, q);

    this.setState(() => {
      return { notes: notes.data };
    });
  }

  async onSearchHandler({ value }) {
    this.props.setSearchParams({ q: value ? value.toLowerCase() : "" });
    const notes = await getArchivedNotes();

    this.setState(() => {
      return {
        notes: this.search(notes.data, value),
      };
    });
  }

  async onUnarchiveNote(id) {
    await unarchiveNote(id);
    const notes = await getArchivedNotes();

    this.setState(() => {
      return {
        notes: notes.data,
      };
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    const notes = await getArchivedNotes();

    this.setState(() => {
      return {
        notes: notes.data,
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
        <Toolbar
          isHome={false}
          title={this.props.locale === "en" ? "Archives" : "Arsip"}
        />
        <SearchBar
          searchHandler={this.onSearchHandler}
          searchQuery={this.props.searchParams.get("q")}
          locale={this.props.locale}
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
  locale: PropTypes.string.isRequired,
};

export default ArchivesPageWrapper;
