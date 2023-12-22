import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Toolbar from "../components/Toolbar";
import ToolbarActionButton from "../components/ToolbarActionButton";
import "../styles/Detail.css";
import "../styles/Empty.css";
import { Component } from "react";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/local-data";
import { PropTypes } from "prop-types";
import DetailNotFound from "../components/DetailNotFound";
import DetailContent from "../components/DetailContent";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <Detail id={id} navigator={navigate} />;
}

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };

    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  navigate = this.props.navigator;

  onArchiveHandler(id) {
    archiveNote(id);

    this.navigate(this.state.note.archived ? "/archives" : "/");
  }

  onUnarchiveHandler(id) {
    unarchiveNote(id);

    this.navigate(this.state.note.archived ? "/archives" : "/");
  }

  onDeleteHandler(id) {
    deleteNote(id);

    this.navigate(this.state.note.archived ? "/archives" : "/");
  }

  render() {
    const actionTitle = this.state.note.archived ? "Unarchive" : "Archive";
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
                title="Delete"
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
};

export default DetailPageWrapper;
