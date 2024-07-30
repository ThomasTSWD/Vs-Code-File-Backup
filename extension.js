const vscode = require('vscode');
const fs = require('fs');

function activate(context) {

	// Commande pour sauvegarder le fichier
	let disposable = vscode.commands.registerCommand('extension.backupFile', function (uri) {
		const filePath = uri.fsPath;
		const date = new Date();
		const formattedDate = formatDate(date);
		const backupFilePath = `${filePath}_${formattedDate}.bk`;

		fs.copyFile(filePath, backupFilePath, (err) => {
			if (err) {
				vscode.window.showErrorMessage('Backup failed!');
				console.error(err);
			} else {
				vscode.window.showInformationMessage('Backup created successfully!');
			}
		});
	});

	context.subscriptions.push(disposable);

	// Commande contextuelle pour sauvegarder le fichier
	let contextDisposable = vscode.commands.registerCommand('extension.backupFileContext', (uri) => {
		vscode.commands.executeCommand('extension.backupFile', uri);
	});

	context.subscriptions.push(contextDisposable);
}

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}.${month}.${day}_${hours}.${minutes}.${seconds}`;
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
