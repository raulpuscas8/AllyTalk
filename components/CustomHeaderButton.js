import { HeaderButton } from "react-navigation-header-buttons";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../constants/colors";

export default CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={FontAwesome}
      iconSize={23}
      color={props.color ?? colors.primary}
    />
  );
};
