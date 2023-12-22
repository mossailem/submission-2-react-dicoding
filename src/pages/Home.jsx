import { Component, useContext } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Toolbar from "../components/Toolbar";
import { archiveNote, deleteNote, getActiveNotes } from "../utils/local-data";
import { PropTypes } from "prop-types";
import ContentCardsContainer from "../components/ContentCardsContainer";
import ToolbarActionLink from "../components/ToolbarActionLink";
import { useSearchParams } from "react-router-dom";
import LocaleContext from "../context/LocaleContext";

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

    const q = this.props.searchParams.get("q");

    this.state = {
      notes: q ? this.search(getActiveNotes(), q) : getActiveNotes(),
    };

    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onSearchHandler({ value }) {
    this.props.setSearchParams({ q: value.toLowerCase() });

    this.setState(() => {
      return {
        notes: this.search(getActiveNotes(), value),
      };
    });
  }

  onArchiveHandler(id) {
    this.setState(() => {
      archiveNote(id);

      return {
        notes: getActiveNotes(),
      };
    });
  }

  onDeleteHandler(id) {
    this.setState(() => {
      deleteNote(id);

      return {
        notes: getActiveNotes(),
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
