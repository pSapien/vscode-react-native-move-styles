import * as vscode from "vscode";
import { formatStyles, withStyleSheetCreate } from "./utils";

/** Specifies the insert order options for adding styles to the StyleSheet object. */
const insertOrder = {
  /** Specifies inserting the new styles at the start of the StyleSheet object */
  start: "start",

  /** Specifies inserting the new styles at the end of the StyleSheet object  */
  end: "end",
};

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("react-native-move-styles.helloWorld", async () => {
    const { activeTextEditor, showInputBox, showInformationMessage } = vscode.window;

    /** Check if there is an active text editor  */
    if (!activeTextEditor) return;

    /** Prompt the user to input a name for their styles */
    const userStylesName = await showInputBox({ prompt: "Please insert your styles name" });

    /** If the user didn't provide a style name, show an information message and return */
    if (!userStylesName) {
      showInformationMessage("react-native-move-styles expects the style name");
      return;
    }

    /** Retrieve the insert order configuration from settings */
    const configuration = vscode.workspace.getConfiguration("react-native-move-styles");
    const userInsertOrder = configuration.get("insertOrder") || insertOrder.start;

    const { document, selection } = activeTextEditor;
    const editorCode = document.getText();
    const stylesText = document.getText(selection);

    /** If no styles were selected, show an information message and return */
    if (!stylesText) {
      showInformationMessage("react-native-move-styles styles to be selected");
      return;
    }

    activeTextEditor.edit((edit) => {
      /** Replace the selected styles in the editor with styles.userStylesName */
      edit.replace(selection, `styles.${userStylesName}`);

      /**
       * if there is no StyleSheet.create in the editor code
       * create a new styles object, and insert the new StyleSheet.create at the end of the documen
       */
      if (!editorCode.includes("StyleSheet.create")) {
        const newStyleSheet = withStyleSheetCreate(userStylesName, formatStyles(stylesText));
        edit.insert(new vscode.Position(document.lineCount + 1, 0), newStyleSheet);
        return;
      }

      /**
       * add the existing styles to the start or end of the StyleSheet object
       * depending on the user preferences.
       */

      /** Find the line index of the "StyleSheet.create" statement */
      const startOfStyleSheetIdx = document.positionAt(editorCode.indexOf("StyleSheet.create")).line;

      /** add to the start of the StyleSheet */
      if (userInsertOrder === insertOrder.start) {
        const stylesToBeAppended = `  ${userStylesName}: ${formatStyles(stylesText)},\n`;
        edit.insert(new vscode.Position(startOfStyleSheetIdx + 1, 0), stylesToBeAppended);
        return;
      }

      /** Find the line index of the closing "})" of the StyleSheet object */
      const endOfStyleSheetIdx = document.positionAt(editorCode.indexOf("})", startOfStyleSheetIdx)).line;

      /**
       * If there is styles present at the end, update the "}," as well
       * since it might not contain a comma, we better delete it, start writing from there
       */
      const lineToDelete = activeTextEditor.document.lineAt(endOfStyleSheetIdx - 1);
      edit.delete(lineToDelete.rangeIncludingLineBreak);

      const stylesToBeAppended = `  },\n  ${userStylesName}: ${formatStyles(stylesText)},\n`;
      edit.insert(new vscode.Position(endOfStyleSheetIdx - 1, 0), stylesToBeAppended);
    });
  });

  context.subscriptions.push(disposable);
}
