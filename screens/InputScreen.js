import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../constants/colors";
import { useCallback, useEffect, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

export default InputScreen = (props) => {
  const params = props.route.params;
  const { title, description, type, min, max, initialValue, updateValue } =
    params;

  const [value, setValue] = useState(`${initialValue}`);
  const [errorText, setErrorText] = useState("");
  const [saveDisabled, setSaveDisabled] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            disabled={saveDisabled}
            onPress={() => updateValue(value)}
          />
        </HeaderButtons>
      ),
    });
  }, [title, saveDisabled, value, updateValue]);

  const onTextChanged = useCallback(
    (text) => {
      setValue(text);

      let error;
      let disabled = false;

      if (text === "") {
        disabled = true;
      } else if (type === "number" || type === "integer") {
        if (type === "integer" && !Number.isInteger(parseFloat(text))) {
          error = "Input can't contain decimal places";
          disabled = true;
        }

        if (isNaN(text)) {
          error = "Input must be a number";
          disabled = true;
        }

        if (min !== undefined && text < min) {
          error = "Minimum value is " + min;
          disabled = true;
        }

        if (max !== undefined && text > max) {
          error = "Maximum value is " + max;
          disabled = true;
        }
      }

      setErrorText(error);
      setSaveDisabled(disabled);
    },
    [type, min, max]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter a value"
        onChangeText={onTextChanged}
        value={value !== "undefined" ? value : ""}
      />

      {errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  textInput: {
    fontFamily: "regular",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.lightGrey,
    padding: 10,
  },
  description: {
    fontFamily: "regular",
    paddingVertical: 10,
  },
  error: {
    fontFamily: "regular",
    color: "red",
    paddingTop: 10,
  },
});
