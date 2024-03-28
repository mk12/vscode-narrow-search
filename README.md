# VS Code: Narrow Search

A simple VS Code extension that narrow searches.

This extension may be useful if you often find yourself editing the "files to include" field in the Search view.

## Install

Get [Narrow Search](https://marketplace.visualstudio.com/items?itemName=mk12.narrow-search) on the Visual Studio Marketplace.

## Commands

- **Narrow Search: Current Directory**: Narrows to the current file's directory
- **Narrow Search: Choose Preset**: Narrows to a preset filter

Narrowing the search directory also clears the search field. The VS Code Extension API does not provide a way out of this. However, you can retrieve the previous search by pressing the up arrow key.

## Configuration

Use `narrowSearch.presets` to configure presets for the "Narrow Search: Choose Preset" command.

## License

© 2023 Mitchell Kember

VS Code Narrow Search is available under the MIT License; see [LICENSE](LICENSE.md) for details.
