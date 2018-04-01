import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };
  handleCloseModal = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }
  handleDeleteAll = () => {
    this.setState(() => ({ options: [] }));
  }
  handleDelete = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((o) => option !== o)
    }));
  }
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }));
  }
  handleAdd = (option) => {
    if(!option) {
      return 'Enter vaild value to add item';
    }
    else if (this.state.options.findIndex((i => option.toLowerCase() === i.toLowerCase())) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  render() {
    const title = 'Indecision';
    const subtitle = 'Put you life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0} />
            <div className="widget">
              <Options
                handleDeleteAll={this.handleDeleteAll}
                handleDelete={this.handleDelete}
                options={this.state.options}
              />
              <AddOption
                handleAdd={this.handleAdd}
              />
            </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
