import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, Dimensions } from "react-native";
import { useState } from "react"
import translate from "../api/translate"
import { useSelector, useDispatch } from "react-redux";
import { addHistory } from "../redux/slice";
import { MaterialIcons } from '@expo/vector-icons';
import Vioces from "./1"


const { width } = Dimensions.get('window')

export default function HomeScreen() {
    // 存储用户输入内容的状态
    const [content, setContent] = useState("");
    // 存储翻译结果
    const [result, setResult] = useState("");


    const [recording, setRecording] = useState({});

    // 从仓库获取一下状态
    // 获取语言列表
    const lanList = useSelector((state) => state.translate.lanList);
    // 获取当前选中的语言
    const curIndex = useSelector((state) => state.translate.curIndex);

    const dispatch = useDispatch();

    function pressHandle() {
        if (content) {
            // 进行翻译
            translate(content, { from: "auto", to: lanList[curIndex].lang })
                .then(res => {
                    setResult(res);
                    dispatch(addHistory({
                        txt: content, res
                    }));
                })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4b3c96" />
            {/* 上面翻译成哪一国语言 */}
            <View style={styles.lan}>
                <Text style={styles.lanTxt}>翻译为
                    <Text style={{
                        color: "#1c1b21",
                        fontWeight: "900"
                    }}>{lanList[curIndex].chs}</Text>
                </Text>
            </View>
            {/* 输入要翻译的文本 */}
            <View style={styles.inputStyle}>
                <TextInput
                    multiline
                    numberOfLines={10}
                    placeholder="请输入您要翻译的文本"
                    placeholderTextColor="#c7c7c7"
                    style={styles.txtInput}
                    textAlignVertical="top"
                    value={content}
                    onChangeText={(t) => setContent(t)}
                />
            </View>
            <View style={voiceStyles.container}>
                <Pressable
                    style={({ pressed }) => pressed ? voiceStyles.onPressStyle : voiceStyles.pressStyle}
                >
                    <MaterialIcons name="keyboard-voice" size={42} color="black" />
                </Pressable>
            </View >
            <Vioces />
            {/* 显示译文区域，可以点击 */}
            <Pressable
                style={styles.resultContainer}
                onPress={pressHandle}
            >
                <Text style={styles.resultTitle}>译文：</Text>
                <Text>{result}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lan: {
        width: 100,
        height: 30,
        paddingLeft: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    inputStyle: {
        flex: 4,
        width: width
    },
    lanTxt: {
        color: "#888",
        fontSize: 14
    },
    txtInput: {
        borderColor: "grey",
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        padding: 10,
        paddingTop: 15,
        flex: 1
    },
    resultContainer: {
        flex: 4,
        padding: 10
    },
    resultTitle: {
        fontSize: 18,
        marginBottom: 10
    }
});

const voiceStyles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#fff",
        height: 60,
        marginTop: -50,
    },
    pressStyle: {
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#abc",
        borderRadius: 30,
        translate: 10,
        transition: 1,
    },
    onPressStyle: {
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 30,
        transition: 1,
        backgroundColor: "#4b3c96"
    }
});