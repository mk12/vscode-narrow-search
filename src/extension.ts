import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "narrow-search.narrowSearchToCurrentDirectory",
      cmdNarrowSearchToCurrentDirectory,
    ),
  );
}

export function deactivate() {}

function cmdNarrowSearchToCurrentDirectory(
  editor: vscode.TextEditor,
  _edit: vscode.TextEditorEdit,
) {
  const filename = editor.document.fileName;
  const projectFolder = vscode.workspace.workspaceFolders?.find((folder) =>
    filename.startsWith(folder.uri.fsPath),
  );
  console.assert(projectFolder);
  const slashRelative = filename.slice(projectFolder?.uri.fsPath.length);
  console.assert(slashRelative.startsWith("/"));
  const relative = slashRelative.slice(1);
  const filesToInclude = path.dirname(relative) + "/";
  return vscode.commands.executeCommand("workbench.action.findInFiles", {
    query: "",
    filesToInclude,
  });
}
