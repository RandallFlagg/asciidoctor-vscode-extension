'use strict';
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
 let previewUri: vscode.Uri

 let asciidoctorCommand = vscode.commands.registerCommand('Asciidoctor.preview', (uri) => {
     let resource = uri;
     let viewColumn = getViewColumn();
     if (!(resource instanceof vscode.Uri)) {
         if (vscode.window.activeTextEditor) {
             resource = vscode.window.activeTextEditor.document.uri;
             viewColumn = vscode.window.activeTextEditor.viewColumn;
         } else {
             vscode.window.showInformationMessage("Open a Asciidoctor file first to show a preview.");
             return
         }
     }
     previewUri = resource.with({
         scheme: "Asciidoctor-preview"
     })
     let title = `Preview '${path.basename(resource.fsPath)}''`;
     return vscode.commands.executeCommand('vscode.previewHtml', previewUri, viewColumn, title).then((success) =>{}, (reason) => {
         vscode.window.showErrorMessage(reason);
     });
 });

 context.subscriptions.push(asciidoctorCommand);
}

export function deactivate() {
}

function getViewColumn() : vscode.ViewColumn {
    const active = vscode.window.activeTextEditor;
    return active ? active.viewColumn : vscode.ViewColumn.One;
}