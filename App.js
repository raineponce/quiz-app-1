import React from "react";
// import { useState } from "react";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native-web";
// import { ButtonGroup } from "@rneui/themed";

const Stack = createNativeStackNavigator();

let questionList = [
  {
    prompt: "1. Multiple choice question",
    type: "multiple-choice",
    choices: ["choice 1", "choice 2", "choice 3"],
    correct: 0,
  },
  {
    prompt: "2. Multiple answer question",
    type: "multiple-answer",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correct: [0, 2],
  },
  {
    prompt: "3. True or false question",
    type: "true-false",
    choices: ["true", "false"],
    correct: 1,
  },
];

function Question({ route, navigation }) {
  const { index, questionList } = route.params;
  let currentQuestion = questionList[index];
  let currentOptions = currentQuestion.choices;

  let nextScreen = () => {
    if (index === 2) {
      navigation.navigate("Summary");
    } else {
      navigation.setParams({ index: index + 1 });
      console.log(index);
    }
  };

  // const [color, setColor] = useState("#b4c2da");
  // let changeColor = () => {
  //   setColor("#6395ec");
  // };
  const color = "#b4c2da";

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h2}>{currentQuestion.prompt}</Text>

      {/* answer options */}
      <FlatList
        data={currentOptions}
        renderItem={({ item }) => <Button color={color} title={item}></Button>}
      />

      <Button
        testID="next-question"
        title="Next Question"
        onPress={nextScreen}
      ></Button>
      {/* <ButtonGroup
        buttons={["SIMPLE", "BUTTON", "GROUP"]}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      /> */}
    </SafeAreaView>
  );
}

function Summary() {
  let totalScore = 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h2}>Summary:</Text>
      <Text testID="total" style={styles.boldText}>
        Score: {totalScore}/3
      </Text>

      {/* questions */}
      <FlatList
        data={questionList}
        renderItem={({ item }) => (
          <>
            <Text style={styles.boldText}>{item.prompt}</Text>
            {/* options */}
            <FlatList
              data={item.choices}
              renderItem={({ item }) => (
                <Text style={styles.paragraph}>{item}</Text>
              )}
            />
          </>
        )}
      />
    </SafeAreaView>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Question"
            component={Question}
            initialParams={{ index: 0, questionList }}
          />
          <Stack.Screen name="Summary" component={Summary} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 8,
    fontSize: 16,
    textAlign: "center",
  },
  h1: {
    margin: 28,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  h2: {
    margin: 16,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  boldText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
