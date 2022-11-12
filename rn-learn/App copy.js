import React from "react";
import { StyleSheet, Text, View } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

const App = () => {
    return (
        <View style={styles.container}>
            <Text>1</Text>
        </View>
    );
};

export default App;
