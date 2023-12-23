import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Toolbar from "../components/Toolbar";
import Loading from "../components/Loading";
import ToolbarActionButton from "../components/ToolbarActionButton";
import "../styles/Detail.css";
import "../styles/Empty.css";
import { Component, useContext } from "react";
import { PropTypes } from "prop-types";
import DetailNotFound from "../components/DetailNotFound";
import DetailContent from "../components/DetailContent";
import LocaleContext from "../context/LocaleContext";
import getArchiveActionTitle from "../utils/getArchiveActionTitle";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";

function DetailPageWrapper() {
  const { id } = useParams();
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();
  return <Detail id={id} navigator={navigate} locale={locale} />;
}

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
    };

    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  async componentDidMount() {
    const note = await getNote(this.props.id);

    this.setState(() => {
      return { note: note.data };
    });
  }

  navigate = this.props.navigator;

  async onArchiveHandler(id) {
    await archiveNote(id);

    this.navigate(this.state.note.archived ? "/archives" : "/");
  }

  async onUnarchiveHandler(id) {
    await unarchiveNote(id);

    this.navigate(this.state.note.archived ? "/archives" : "/");
  }

  async onDeleteHandler(id) {
    await deleteNote(id);

    this.navigate(this.state.note.archived ? "/archives" : "/");
  }

  render() {
    if (!this.state.note) return <Loading />;

    const actionTitle = getArchiveActionTitle(
      this.state.note.archived,
      this.props.locale
    );
    const actionIcon = this.state.note.archived ? "fa-reply" : "fa-box-archive";
    const mainHandler = this.state.note.archived
      ? this.onUnarchiveHandler
      : this.onArchiveHandler;

    return (
      <>
        <Toolbar title="Detail" isHome={false}>
          {this.state.note && (
            <>
              <ToolbarActionButton
                id={this.state.note.id}
                handler={mainHandler}
                title={actionTitle}
                icon={actionIcon}
              />
              <ToolbarActionButton
                id={this.state.note.id}
                handler={this.onDeleteHandler}
                title={this.props.locale === "en" ? "Delete" : "Hapus"}
                icon="fa-trash"
                additionalClass="bg-danger"
              />
            </>
          )}
        </Toolbar>

        {this.state.note ? (
          <DetailContent
            title={this.state.note.title}
            timestamp={this.state.note.createdAt}
            description={this.state.note.body}
          />
        ) : (
          <DetailNotFound />
        )}

        <Footer />
      </>
    );
  }
}

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  navigator: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default DetailPageWrapper;
