import PropTypes from 'prop-types';

const Button = ({ color, text, onClick, name }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={name}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'black'
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
