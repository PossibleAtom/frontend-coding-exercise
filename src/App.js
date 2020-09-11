import React, { Component } from "react";
import ResultsList from "./components/ResultsList/ResultsList";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import "./App.css";
import {fetchSuburbAPIData, abortSuburbAPIData} from "./endpoints/suburbSearch";

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.optionSelected = this.optionSelected.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.state = {
      inputValue: '',
      latestSelection: '',
      searchResults: [],
    }
  }

  optionSelected(selectedOption) {
    this.setState({
      inputValue: selectedOption.name,
      latestSelection: selectedOption.name,
      searchResults: [],
    });
  }

  performSearch(searchTerm) {
    this.setState({ inputValue: searchTerm });
    if(searchTerm === '') {
      abortSuburbAPIData();
      this.setState({ searchResults: [] });
      return;
    }

    fetchSuburbAPIData(API_URL, searchTerm).then((e) => {
      const suburbs = JSON.parse(e.toString()).filter((item) => item.name.toLowerCase().search(searchTerm.toLowerCase()) === 0);
      const postcodes = JSON.parse(e.toString()).filter((item) => item.postcode.toString().search(searchTerm) === 0);
      this.setState({ searchResults: [...suburbs, ...postcodes] });
    });
  }

  submitClick() {
    this.state.latestSelection === '' ? alert('No selection yet!') : alert(this.state.latestSelection);
  }

  render() {
    return (
      <section className={'searchWrap'}>
        <p className={'searchTitle'}>Suburb</p>
        <div className={'inputWrap'}>
          <Input onChange={this.performSearch} value={this.state.inputValue} />
          {this.state.searchResults.length > 0 && <ResultsList items={this.state.searchResults} onSelect={this.optionSelected}/>}
          <Button onClick={this.submitClick} />
        </div>
      </section>
    );
  }
}
