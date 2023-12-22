import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Toolbar from "../components/Toolbar";
import ToolbarActionButton from "../components/ToolbarActionButton";
import "../styles/Add.css";
import "../styles/Detail.css";
import { addNote } from "../utils/local-data";
import { Component } from "react";
import { PropTypes } from "prop-types";

function AddWrapper() {
  const navigate = useNavigate();

  return <Add navigator={navigate} />;
}

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
    };

    this.onTitleInputHandler = this.onTitleInputHandler.bind(this);
    this.onDescriptionInputHandler = this.onDescriptionInputHandler.bind(this);
    this.onAddHandler = this.onAddHandler.bind(this);
  }

  onTitleInputHandler(event) {
    this.setState(() => {
      return {
        title: event.target.innerHTML.replace("<br>", ""),
      };
    });
  }

  onDescriptionInputHandler(event) {
    this.setState(() => {
      return {
        description: event.target.innerHTML.replace("<br>", ""),
      };
    });
  }

  onAddHandler() {
    addNote({
      title: this.state.title,
      body: this.state.description,
    });

    this.props.navigator("/");
  }

  render() {
    return (
      <>
        <Toolbar title="Add Note" isHome={false}>
          <ToolbarActionButton
            id=""
            title="Save"
            icon="fa-floppy-disk"
            additionalClass="bg-primary"
            handler={this.onAddHandler}
          />
        </Toolbar>

        <main className="content">
          <h1
            id="title"
            className="content__title"
            contentEditable
            placeholder="Type title here..."
            onInput={this.onTitleInputHandler}
          ></h1>
          <div
            id="description"
            className="content__description"
            contentEditable
            placeholder="Type content here..."
            onInput={this.onDescriptionInputHandler}
          ></div>
        </main>

        <Footer />
      </>
    );
  }
}

Add.propTypes = { navigator: PropTypes.func.isRequired };

export default AddWrapper;
