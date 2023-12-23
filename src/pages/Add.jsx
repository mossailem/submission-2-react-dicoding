import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Toolbar from "../components/Toolbar";
import ToolbarActionButton from "../components/ToolbarActionButton";
import "../styles/Add.css";
import "../styles/Detail.css";
import { Component, useContext } from "react";
import { PropTypes } from "prop-types";
import LocaleContext from "../context/LocaleContext";
import { addNote } from "../utils/network-data";

function AddWrapper() {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  return <Add navigator={navigate} locale={locale} />;
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
        <Toolbar
          title={this.props.locale === "en" ? "Add Note" : "Buat Baru"}
          isHome={false}
        >
          <ToolbarActionButton
            id=""
            title={this.props.locale === "en" ? "Save" : "Simpan"}
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
            placeholder={
              this.props.locale === "en"
                ? "Type title here..."
                : "Ketikkan judul di sini..."
            }
            onInput={this.onTitleInputHandler}
          ></h1>
          <div
            id="description"
            className="content__description"
            contentEditable
            placeholder={
              this.props.locale === "en"
                ? "Type content here..."
                : "Ketikkan konten di sini..."
            }
            onInput={this.onDescriptionInputHandler}
          ></div>
        </main>

        <Footer />
      </>
    );
  }
}

Add.propTypes = {
  navigator: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default AddWrapper;
