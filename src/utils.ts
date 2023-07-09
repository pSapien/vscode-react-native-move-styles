/**
 * Creates a StyleSheet object with a single style entry.
 *
 * @param {string} styleName - The name of the style entry.
 * @param {string} stylesText - The style properties and values.
 * @returns {string} The generated StyleSheet object string.
 *
 * @example
 * const styleName = "container";
 * const stylesText = "{ flex: 1, backgroundColor: 'blue' }";
 * const styleObject = withStyleSheetCreate(styleName, stylesText);
 * // Returns:
 * // const styles = StyleSheet.create({
 * //   container: { flex: 1, backgroundColor: 'blue' },
 * // });
 */
export function withStyleSheetCreate(styleName: string, stylesText: string) {
  return `\nconst styles = StyleSheet.create({\n  ${styleName}: ${stylesText},\n})`;
}

/**
 * Formats the styles string by removing unnecessary characters, trimming styles, and adding indentation.
 *
 * @param {string} styles - The styles string to format.
 * @returns {string} The formatted styles string.
 *
 * @example
 * const stylesText = "{ color: 'red',   fontSize: 16,backgroundColor: 'blue' }";
 * const formattedStyles = formatStyles(stylesText);
 *  Returns:
 * // {
 * //   color: 'red',
 * //   fontSize: 16,
 * //   backgroundColor: 'blue',
 * // }
 */
export function formatStyles(styles: string) {
  const stylesLines = styles
    .replace("{", "")
    .replace("}", "")
    .split(",")
    .map((style) => style.trim())
    .filter((style) => !!style)
    .map(addIdentationToIndividualStyle)
    .join(",\n");

  return ["{", stylesLines + ",", "  }"].join("\n");
}

/**
 * Adds indentation to an individual style string.
 *
 * @param {string} style - The style string to add indentation to.
 * @returns {string} The style string with added indentation.
 *
 * @example
 * const style = "color: 'red'";
 * const indentedStyle = addIndentationToIndividualStyle(style);
 * // Returns:
 * // "    color: 'red'"
 */
function addIdentationToIndividualStyle(style: string) {
  return style.trim().padStart(style.length + 4, " ");
}
