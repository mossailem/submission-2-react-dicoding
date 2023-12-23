import { Component } from "react";
import "../styles/SearchBar.css";
import { PropTypes } from "prop-types";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.searchQuery ? this.props.searchQuery : "",
    };

    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  async onSearchHandler(event) {
    await this.setState(() => {
      return { value: event.target.value };
    });

    this.props.searchHandler(this.state);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder={
            this.props.locale === "en" ? "Search here..." : "Cari di sini..."
          }
          onChange={this.onSearchHandler}
          value={this.state.value}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  locale: PropTypes.string.isRequired,
};

export default SearchBar;
