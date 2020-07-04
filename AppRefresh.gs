/**
 * @author EdenSkull / https://github.com/Edenskull
 *
 * Description: Manager script with custom nomenclature.
 *
 * Usage:
 * 
 * Setup The 4 var by going to the Spreadsheet linked and run the 4 script with setup in the name.
 */

function initFromScratch() {
  var sheetName = getSheetName();
  var wallSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  wallSheet.clear();
  var folderId = getFolder();
  var files = DriveApp.getFolderById(folderId).getFiles();
  var index = 1;
  var prefix = getPrefix();
  var formatNumber = getFormatNumber();
  var currentFile, fileId, repeatNumber, filename;
  var template = String("0");
  while (files.hasNext()) {
    currentFile = files.next();
    fileId = currentFile.getId();
    repeatNumber = (index.toString().length <= formatNumber) ? formatNumber - index.toString().length : 0;
    filename = prefix + " " + (template.repeat(repeatNumber) + index);
    currentFile.setName(filename);
    wallSheet.appendRow([index, filename, fileId]);
    index++;
  }
}

function processNew() {
  var sheetName = getSheetName();
  var wallSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var entries = wallSheet.getSheetValues(1, 1, wallSheet.getLastRow(), 3);
  var allIds = entries.map(function (row) {
    return row[2];
  });
  var folderId = getFolder();
  var files = DriveApp.getFolderById(folderId).getFiles();
  var prefix = getPrefix();
  var formatNumber = getFormatNumber();
  var template = String("0");
  var index = 0
  var currentFile, currentId, currentFileId, filename, repeatNumber, tempFile;
  for (index; index < entries.length; index++) {
    currentId = entries[index][2];
    try {
      tempFile = DriveApp.getFileById(currentId);
      if (tempFile.isTrashed()) {
        while (files.hasNext()) {
          currentFile = files.next();
          currentFileId = currentFile.getId();
          if (allIds.indexOf(currentFileId) == -1) {
            DriveApp.getFileById(currentFileId).setName(entries[index][1]);
            wallSheet.getRange(index + 1, 3).setValue(currentFileId);
            break;
          }
        }
      }
    } catch (e) {
      while (files.hasNext()) {
        currentFile = files.next();
        currentFileId = currentFile.getId();
        if (allIds.indexOf(currentFileId) == -1) {
          DriveApp.getFileById(currentFileId).setName(entries[index][1]);
          wallSheet.getRange(index + 1, 3).setValue(currentFileId);
          break;
        }
      }
    }
  }
  index++;
  while (files.hasNext()) {
    currentFile = files.next();
    currentId = currentFile.getId();
    if (allIds.indexOf(currentId) == -1) {
      repeatNumber = (index.toString().length <= formatNumber) ? formatNumber - index.toString().length : 0;
      filename = prefix + " " + (template.repeat(repeatNumber) + index);
      currentFile.setName(filename);
      wallSheet.appendRow([index, filename, currentId]);
    }
  }
}

function setSheetName() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt("Change Sheet", "Provide the name of the sheet you want to use : ", ui.ButtonSet.OK_CANCEL);
  if (response.getResponseText() !== "") {
    PropertiesService.getScriptProperties().setProperty('_sheetName', response.getResponseText());
  }
}

function getSheetName() {
  return PropertiesService.getScriptProperties().getProperty('_sheetName');
}

function setPrefix() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt("Change Prefix", "Provide the prefix you want to put in the name of your wallpapers ([prefix] number; Example: [Wallpaper -] 00001) : ", ui.ButtonSet.OK_CANCEL);
  if (response.getResponseText() !== "") {
    PropertiesService.getScriptProperties().setProperty('_prefix', response.getResponseText());
  }
}

function getPrefix() {
  return PropertiesService.getScriptProperties().getProperty('_prefix');
}

function setFolder() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt("Change Folder", "Provide the id of the target folder : ", ui.ButtonSet.OK_CANCEL);
  if (response.getResponseText() !== "") {
    PropertiesService.getScriptProperties().setProperty('_folderId', response.getResponseText());
  }
}

function getFolder() {
  return PropertiesService.getScriptProperties().getProperty('_folderId');
}

function setNumberFormat() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt("Change Number Format", "Provide the max number of wallpapers (Example : 1000 will change the name to Wallpaper - 0658) : ", ui.ButtonSet.OK_CANCEL);
  if (response.getResponseText() !== "") {
    PropertiesService.getScriptProperties().setProperty('_formatNumber', response.getResponseText().length);
  }
}

function getFormatNumber() {
  return parseInt(PropertiesService.getScriptProperties().getProperty('_formatNumber'), 10);
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('WallManager')
    .addItem('Init', 'initFromScratch')
    .addItem('Process New', 'processNew')
    .addSeparator()
    .addItem('Setup Sheet', 'setSheetName')
    .addItem('Setup Folder', 'setFolder')
    .addItem('Setup Prefix', 'setPrefix')
    .addItem('Setup Number Format', 'setNumberFormat')
    .addToUi();
}

String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this);
}