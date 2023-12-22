import { PropTypes } from "prop-types";

function FormInput({ id, type, label, placeholder }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} />
    </div>
  );
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default FormInput;
