import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "narrowSearch.narrowSearchToCurrentDirectory",
      cmdNarrowSearchToCurrentDirectory,
    ),
    vscode.commands.registerCommand(
      "narrowSearch.narrowSearchChoosePreset",
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
  const presets = getConfig().get("presets") as string[];
  if (presets.length === 0) {
    vscode.window.showErrorMessage(
      "There are no presets. Configure some with \"narrowSearch.presets\".");
    return;
  }
  const selection = await vscode.window.showQuickPick(presets, {
    placeHolder: "Choose a preset to narrow the search"
  });
  if (selection === undefined) return;
  return narrowSearch(selection);
}

function getConfig() {
  return vscode.workspace.getConfiguration("narrowSearch");
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
