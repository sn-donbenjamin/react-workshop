////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup> ✅
// - The selected <RadioOption> should pass the correct value to its <RadioIcon> ✅
// - The `defaultValue` should be set on first render ✅
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the <App> so it can use it to render something
// - Implement keyboard controls on the <RadioGroup>
//   - Hint: Use tabIndex="0" on the <RadioOption>s so the keyboard will work
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";


/**
 * RadioGroup
 * ----
 * Radio group is the parent most component
 * Data is passed down to the Radio Options
 */
class RadioGroup extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
  };

  state = { value: this.props.defaultValue };

  /**
   * @param {value} value is the value of the selected Radio
   * which updates the sta
   */
  select(value) {
    this.setState({ value }, () => {
      /**
       * `onChange` is added to the parent component (RadioGroup)
       * making it aware of changes to children
       */
      this.props.onChange(this.state.value);
    });
  }

  render() {
    /**
     * maps through children  of RadioGroup &
     * clones children with neccessary props
     */
    const children = React.Children.map(this.props.children, child => React.cloneElement(child, {
      isSelected: child.props.value === this.state.value,
      onClick: () => this.select(child.props.value)
    }));
    return <div>{children}</div>;
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string
  };

  render() {
    const { onClick, isSelected, children } = this.props;
    return (
      <div onClick={onClick}>
        <RadioIcon isSelected={isSelected} defaultValue /> {children}
      </div>
    );
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div
        style={{
          borderColor: "#ccc",
          borderWidth: 3,
          borderStyle: this.props.isSelected ? "inset" : "outset",
          height: 16,
          width: 16,
          display: "inline-block",
          cursor: "pointer",
          background: this.props.isSelected ? "rgba(0, 0, 0, 0.05)" : ""
        }}
      />
    );
  }
}

class App extends React.Component {
  state = {
    radioValue: 'fm'
  };

  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>

        <h2>Radio Value: {this.state.radioValue}</h2>

        <RadioGroup defaultValue={this.state.radioValue} onChange={ radioValue => this.setState({ radioValue })}>
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
