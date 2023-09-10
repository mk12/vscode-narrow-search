# VS Code Narrow Search

A simple VS Code extension that narrow searches to specific directories.

## Install

```sh
npm install -g vsce
vsce package
code --install-extension *.vsix
```

## Commands

| Command                          | Description                             |
| -------------------------------- | --------------------------------------- |
| Narrow Search: Current Directory | Narrows to the current file's directory |
| Narrow Search: Choose Preset     | Narrows to a preset filter              |

Narrowing the search directory also clears the search field. The VS Code Extension API does not provide a way out of this. However, you can easily retrieve the previous search by pressing the up arrow key.

## Configuration

Use `narrow-search.presets` to configure presets for the "Narrow Search: Choose Preset" command.

## License

© 2023 Mitchell Kember

VS Code Narrow Search is available under the MIT License; see [LICENSE](LICENSE.md) for details.
