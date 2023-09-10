import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "narrow-search.narrowSearchToCurrentDirectory",
      cmdNarrowSearchToCurrentDirectory,
    ),
    vscode.commands.registerCommand(
      "narrow-search.narrowSearchChoosePreset",
      cmdNarrowSearchChoosePreset,
    ),
  );
}

export function deactivate() {
  // Nothing to do.
}

function cmdNarrowSearchToCurrentDirectory(
  editor: vscode.TextEditor,
  _edit: vscode.TextEditorEdit,
) {
  const filename = editor.document.fileName;
  const slashRelative = filename.slice(getWorkspaceOfFile(filename).length);
  console.assert(slashRelative.startsWith("/"));
  const relative = slashRelative.slice(1);
  return narrowSearch(path.dirname(relative) + "/");
}

async function cmdNarrowSearchChoosePreset() {
  const presets = Object.entries(getConfig().get("presets") as object);
  if (presets.length === 0) {
    vscode.window.showErrorMessage(
      "There are no presets. Add some to your settings with the key \"narrow-search.presets\".");
    return;
  }
  const quickPick = vscode.window.createQuickPick();
  quickPick.placeholder = "Choose a preset to narrow the search";
  quickPick.items = presets.map(([key, value]) => ({ label: key, description: value }));
  quickPick.show();
  quickPick.onDidAccept(() => {
    const value = quickPick.activeItems[0].description;
    if (value === undefined) throw Error("active item is missing description");
    quickPick.dispose();
    narrowSearch(value);
  });
}

function getConfig() {
  return vscode.workspace.getConfiguration("narrow-search");
}

function getWorkspaceOfFile(filename: string): string {
  const folder = vscode.workspace.workspaceFolders?.find((folder) =>
    filename.startsWith(folder.uri.fsPath),
  );
  if (!folder) throw Error(`Could not get workspace folder for ${filename}`);
  return folder.uri.fsPath;
}

function narrowSearch(filesToInclude: string) {
  return vscode.commands.executeCommand("workbench.action.findInFiles", {
    query: "",
    filesToInclude,
  });
}
