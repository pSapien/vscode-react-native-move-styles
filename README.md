# react-native-move-styles README

A Visual Studio Code extension that allows you to move styles from JSX elements to the StyleSheet.create function in React Native.

## Features

- Quickly move styles from JSX elements to the StyleSheet.create function.
- Supports two insertion order options: "start" and "end" for adding styles to the StyleSheet object.

## HOW TO USE

![demo1](assets/demo.gif)

1. Select the style you want to move within a JSX element.
2. Press `Ctrl+Shift+P` (or your custom shortcut key) to open the command panel.
3. Type "Move Styles to StyleSheet in React Native" and press `Enter`.
4. A prompt will appear asking for the style name.
5. Enter the desired style name and press `Enter`.
6. The selected style will be moved to the StyleSheet.create function.
7. Voila! Magic

## Insertion Order

By default, the extension inserts the new styles at the start of the StyleSheet.create block.
You can customize the insertion order by modifying the extension settings.

To change the insertion order:

1. Go to your "settings.json" file. (or use the shortcut `Ctrl+,`)
2. Make sure you are viewing the json file.
3. Insert `"react-native-move-styles.insertOrder" = "start"` or `"react-native-move-styles.insertOrder" = "end"`