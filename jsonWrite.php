<?php
$debug = true;
$control = "";
$filepath = "drawing.json";
if(!empty($_GET['put'])){
    $control = $_GET['put'];
}
if($debug){echo "php response 1 => " . $control . "<hr>";}
if($debug){echo "php response 2 => " . json_encode($control);}
$file = fopen($filepath, "w") or die ("Cannot open file");
fwrite($file,$control);
fclose($file);
?>