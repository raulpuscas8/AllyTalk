import { FlatList, StyleSheet, View } from "react-native";
import DataItem from "../components/DataItem";
import { useEffect } from "react";

export default DataListScreen = (props) => {
  const { data, title } = props.route.params;

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: title,
    });
  }, [title]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(itemData) => {
          const item = itemData.item;
          return <DataItem title={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
});
