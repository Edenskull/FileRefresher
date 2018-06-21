function onupload() {
  
  var folderid = PropertiesService.getScriptProperties().getProperty('folderId');
  var prefixNom = PropertiesService.getScriptProperties().getProperty('prefixNom');
  var folder = DriveApp.getFolderById(folderid);
  var files = folder.getFiles();
  var name = new String;
  var number;
  var trunk;
  var missingno = detectFile();
  
  while(true && files.hasNext()){
    var file = files.next();
    name = file.getName();
    console.log(name);
    if(name.indexOf(prefixNom)>-1){
      continue;
    } else {
      if(missingno.length == 0){
        number = countfile();
        if(number < 10){
          var k = number;
          number = "000" + k;
        } else if(number < 100){
          var k = number;
          number = "00" + k;
        } else if(number < 1000){
          var k = number;
          number = "0" + k;
        } else {
        }
        trunk = name.split('.');
        file.setName(prefixNom + number + "." + trunk[1]);
      } else {
        number = missingno[0];
        missingno.pop();
        trunk = name.split('.');
        file.setName(prefixNom + number + "." + trunk[1]);
      }
    }
  }
  return "end";
}

function detectFile(){
  
  var folderid = PropertiesService.getScriptProperties().getProperty('folderId');
  var prefixNom = PropertiesService.getScriptProperties().getProperty('prefixNom');
  var folder = DriveApp.getFolderById(folderid);
  var files = folder.getFiles();
  var name = new String;
  var missing = [];
  var data = [];
  var prev = 0;
  var pushed;
  
  while(true && files.hasNext()){
    
    var file = files.next();
    name = file.getName();
    if(name.indexOf(prefixNom)>-1){
      name = name.split(" ");
      name = name[1].split(".");
      Logger.log(name[0]);
      data.push(name[0]);
    }
  }
  data.sort();
  Logger.log(data);
  data.forEach(function(file){
    Logger.log(prev);
    Logger.log(file);
    Logger.log(parseInt(file, "10"));
    if(prev - parseInt(file, "10") == -1){
      prev = parseInt(file, "10");
    } else {
      pushed = prev + 1;
      if(pushed < 10){
        var k = pushed;
        pushed = "000" + k;
      } else if(pushed < 100){
        var k = pushed;
        pushed = "00" + k;
      } else if(pushed < 1000){
        var k = pushed;
        pushed = "0" + k;
      } else {
      }
      prev = parseInt(file, "10");
      missing.push(pushed);
    }
  });
  return missing;
}

function countfile(){
  
  var folderid = PropertiesService.getScriptProperties().getProperty('folderId');
  var prefixNom = PropertiesService.getScriptProperties().getProperty('prefixNom');
  var folder = DriveApp.getFolderById(folderid);
  var files = folder.getFiles();
  var name = new String;
  var count = 0;
  
  while(true && files.hasNext()){
    
    var file = files.next();
    name = file.getName();
    if(name.indexOf(prefixNom)>-1){
      count += 1;
    }
  }
  return count + 1;
}