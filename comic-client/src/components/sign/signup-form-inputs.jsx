import DateSelector from '../date-selector/date-selector';
import './signup-form-inputs.scss';

const SignupFormInputs = ({ onInputChange, errors }) => {
  const onChange = (event) => {
    const keyValue = { [event.target.name]: event.target.value };
    onInputChange(keyValue);
  };

  const onBirthDateChange = (date) => {
    const keyValue = { birthDate: date.toString() };
    onInputChange(keyValue);
  };

  return (
    <div className="signup-form-inputs">
      {errors.nickname && <p>{errors.nickname}</p>}
      <input
        placeholder="Nickname"
        name="nickname"
        type="text"
        maxLength="20"
        className={errors.nickname ? 'error' : ''}
        onChange={onChange}
        required
      ></input>
      {errors.email && <p>{errors.email}</p>}
      <input
        placeholder="Email"
        name="email"
        type="email"
        maxLength="60"
        className={errors.email ? 'error' : ''}
        onChange={onChange}
        required
      ></input>
      {errors.password && <p>{errors.password}</p>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        maxLength="25"
        className={errors.password ? 'error' : ''}
        onChange={onChange}
        required
      ></input>
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        maxLength="25"
        className={errors.password ? 'error' : ''}
        onChange={onChange}
        required
      ></input>
      {errors.birthDate && <p>{errors.birthDate}</p>}
      <p className="outer-label">Birth Date</p>
      <DateSelector
        onChange={onBirthDateChange}
        error={errors.birthDate}
      ></DateSelector>
    </div>
  );
};

export default SignupFormInputs;
