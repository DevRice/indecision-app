class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      status: false
    };
  }
  toggle() {
    this.setState((prevState) => {
      return {
        status: !prevState.status
      }
    });
  }
  render() {
    const title = 'Visibility Toggle';
    return (
      <div>
        <h1>{title}</h1>
        <button onClick={this.toggle}>{this.state.status ? 'Hide' : 'Show'} details</button>
        {this.state.status && (
          <div>
            <p>You bastard!</p>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));
