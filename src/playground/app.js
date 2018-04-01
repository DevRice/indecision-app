class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      options: props.options
    }
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
  handleDeleteAll() {
    this.setState(() => ({ options: [] }));
  }
  handleDelete(option) {
    this.setState((prevState) => ({
      options: prevState.options.filter((o) => option !== o)
    }));
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  handleAdd(option) {
    if(!option) {
      return 'Enter vaild value to add item';
    }
    else if (this.state.options.findIndex((i => option.toLowerCase() === i.toLowerCase())) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }
  render() {
    const title = 'Indecision';
    const subtitle = 'Put you life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0} />
        <Options
          handleDeleteAll={this.handleDeleteAll}
          handleDelete={this.handleDelete}
          options={this.state.options}
        />
        <AddOption
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = { options: [] };

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

const Action = (props) => {
  return (
    <div>
      <button
        disabled={!props.hasOptions}
        onClick={props.handlePick}
        >
          What should I do?
        </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteAll}>Remove All</button>
      {props.options.length === 0 && <p>Add some options to get started!</p>}
      <ol>
        {
          props.options.map((o) => (
            <Option
              key={o}
              optionText={o}
              handleDelete={props.handleDelete}
            />
          ))
        }
      </ol>
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(e) => {
          props.handleDelete(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAdd(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp options={['Starbucks', "Peet's", 'Phillz']} />, document.getElementById('app'));
