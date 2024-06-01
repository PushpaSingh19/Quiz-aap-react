function Input(props) {
  return (
    <div>
      <label style={{ fontSize: "18px", fontStyle: "italic" }}>
        {props.label} <i>{props.icon}</i>
      </label>
      <br />

      <input
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        style={{ width: "100%", height: "40px", borderRadius: "8px" }}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Input;
