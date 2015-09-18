var React = require('react/addons');

var PasswordInput = React.createClass({
  handleChange: function(event) {
    this.props.changePassword(event.target.value);
  },

  render: function() {
    return (
      <div>
        <input type="password"
            className="form-control input-sm login-input"
            placeholder={this.props.placeholder}
            onChange={this.handleChange} />
      </div>
    );
  }

});

module.exports = PasswordInput;
