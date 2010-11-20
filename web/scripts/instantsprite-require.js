
window.sprite = { };
require(["common", "filereader", "jquery.tmpl.min", "jquery-ui-1.8.5.custom.min"], 
function() { require(["instantsprite"], function() { $(sprite.init); }) });