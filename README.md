# WallManager
Google Script to increment file with a certain structure

# How it works

## Introduction
The script is for personal use. It allows you to manually perform a file renaming in a certain directory with a pre-defined nomenclature. This script need to be on an attached  Google Spreadsheet so that the activeSpreadsheet trigger correctly.

## Setup Usage

### Setup Global Vars
You will need to setup 4 global variables. To do that simply open the associated Spreadsheet and wait till the menu appear in the toolbar. Here you will find 4 menus with "Setup" in the name simply do them one by one.

* SheetName : this is the name of the sheet where you want the script to trigger. You can find the name on the tabs under the sheet.
* Folder : this is the folder that contains files that you want to manipulate. You can find the id in the URL when you are in this folder.
* Prefix : this is the repeated name that you want to use for your files. ([Wallpaper -] 0001)
* Format : this is the max files that you want in the folder. (this will only affect leading 0 in the name)

### Things that might happens

* If you delete a row in the spreadsheet it might affects the integrity of the script.
* If you run the script without setting the global var, it might affects your folder.
* If you rename the files like Wallpaper - 0001 to Wallpaper - 0002, it might affects the integrity of the script.

