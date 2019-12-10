/*global google*/
import React from "react";
import {
    Form,
    Frame,
    Toast,
    FormLayout,
    Button,
    Page
} from "@shopify/polaris";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { keyword: "", toast: false };
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    toggleToast = () => {
        this.setState({ toast: !this.state.toast })
    }

    handleSubmit = () => {
        // console.log(this.autocompleteInput.current.value);
        console.log(this.state.keyword);
        if (this.state.keyword.length !== 0) {
            this.props.searchByWord(this.state.keyword);
        } else {
            this.toggleToast(true);
        }
    };

    componentDidMount() {
        // types: ['(cities)'],
        // componentRestrictions: {country: "us"}
        this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
            { "types": ["cities"] });
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        this.autocomplete.getPlace();
        // this.props.onPlaceLoaded(place);
    }

    handleKeywordChange = (e) => {
        this.setState({ keyword: e.target.value })
    }


    // the hero link
    // https://stackoverflow.com/questions/52907859/using-google-place-autocomplete-api-in-react

    render() {
        const toastMarkup = this.state.toast ? (
            <Toast content="Search keyword can't be empty" onDismiss={this.toggleToast} />
        ) : null;
        return (
            <Page>
                <Frame>
                    <Form onSubmit={this.handleSubmit}>
                        <FormLayout>
                            <input onChange={(e) => this.handleKeywordChange(e)} value={this.state.keyword} ref={this.autocompleteInput} id="autocomplete" placeholder="Enter the city / town"
                                type="text"></input>
                            <Button submit>Search</Button>
                            {toastMarkup}
                        </FormLayout>
                    </Form>
                </Frame>
            </Page>
        );
    }
}

export default Search;
