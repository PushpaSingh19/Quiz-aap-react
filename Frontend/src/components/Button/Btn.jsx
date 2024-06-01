function Btn(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClickBtn}
      type={props.type}
      style={{
        background: "#008080",
        borderRadius: "10px",
        height: "50px",
        width: "150px",
        fontStyle: "italic",
        color: "white",
      }}
    >
      {props.title}
    </button>
  );
}

export default Btn;
