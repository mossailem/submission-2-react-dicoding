import { Component, useContext } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Toolbar from "../components/Toolbar";
import { PropTypes } from "prop-types";
import ContentCardsContainer from "../components/ContentCardsContainer";
import ToolbarActionLink from "../components/ToolbarActionLink";
import { useSearchParams } from "react-router-dom";
import LocaleContext from "../context/LocaleContext";
import { archiveNote, deleteNote, getActiveNotes } from "../utils/network-data";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { locale } = useContext(LocaleContext);

  return (
    <Home
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      locale={locale}
    />
  );
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };

    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  async componentDidMount() {
    const notes = await getActiveNotes();
    const q = this.props.searchParams.get("q");

    if (q) notes.data = this.search(notes.data, q);

    this.setState(() => {
      return { notes: notes.data };
    });
  }

  async onSearchHandler({ value }) {
    this.props.setSearchParams({ q: value ? value.toLowerCase() : "" });
    const notes = await getActiveNotes();

    this.setState(() => {
      return {
        notes: this.search(notes.data, value),
      };
    });
  }

  async onArchiveHandler(id) {
    await archiveNote(id);
    const notes = await getActiveNotes();

    this.setState(() => {
      return {
        notes: notes.data,
      };
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    const notes = await getActiveNotes();

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
        <Toolbar isHome={true} title="Muslim Note App">
          <ToolbarActionLink
            title={this.props.locale === "en" ? "Archives" : "Arsip"}
            icon="fa-archive"
            url="/archives"
          />
          <ToolbarActionLink
            title={this.props.locale === "en" ? "Create New" : "Buat Baru"}
            icon="fa-plus"
            url="/create"
            additionalClass="bg-primary"
          />
        </Toolbar>
        <SearchBar
          searchHandler={this.onSearchHandler}
          searchQuery={this.props.searchParams.get("q")}
          locale={this.props.locale}
        />
        <ContentCardsContainer
          notes={this.state.notes}
          mainHandler={this.onArchiveHandler}
          onDeleteHandler={this.onDeleteHandler}
        />
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default HomePageWrapper;
