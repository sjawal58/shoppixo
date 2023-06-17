import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import IconButton from "@mui/material/IconButton";

const passwordStyle = {
  paddingLeft: "14px",
  paddingRight: 8,
  borderTop: "1px solid #ced4da",
  borderBottom: "1px solid #ced4da",
  borderRight: "1px solid #ced4da",
  display: "flex",
  alignItems: "center",
  borderTopRightRadius: "0.25rem",
  borderBottomRightRadius: "0.25rem",
  zIndex: 99,
};

const svgStyle = {
  fontSize: 18,
  marginRight: "10px",
};

const PasswordShow = (props) => {
  const { passShow, onclick } = props;
  return (
    <IconButton onClick={onclick} edge="end">
      {passShow ? (
        <VisibilityIcon style={svgStyle} />
      ) : (
        <VisibilityOffIcon style={svgStyle} />
      )}
    </IconButton>
  );
};

export default PasswordShow;
