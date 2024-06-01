function Heading(props) {
  return (
    <>
      <h1
        className="text-center "
        style={{
          fontStyle: "italic",
        }}
      >
        {props.title}
      </h1>
    </>
  );
}
export default Heading;
