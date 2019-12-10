/*global google*/
import React from "react";
import { Form, Toast, FormLayout, Button } from "@shopify/polaris";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "", toast: false };
    this.searchInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  toggleToast = () => {
    this.setState({ toast: !this.state.toast });
  };

  handleSubmit = () => {
    const keyword = this.searchInput.current.value;
    if (keyword.length !== 0) {
      this.props.searchByWord(keyword);
    } else {
      this.toggleToast(true);
    }
  };

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.searchInput.current,
      { types: ["(cities)"] }
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    // this.autocomplete.getPlace();
    this.setState({ keyword: this.autocomplete.getPlace().formatted_address })
  }

  handleKeywordChange = e => {
    this.setState({ keyword: e.target.value });
  };

  render() {
    const toastMarkup = this.state.toast ? (
      <Toast
        content="Search keyword can't be empty"
        onDismiss={this.toggleToast}
      />
    ) : null;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormLayout>
          <input
            onChange={e => this.handleKeywordChange(e)}
            value={this.state.keyword}
            ref={this.searchInput}
            id="autocomplete"
            placeholder="Enter the city / town"
            type="text"
          ></input>
          <Button submit>Search</Button>
          {toastMarkup}
        </FormLayout>
      </Form>
    );
  }
}

export default Search;
