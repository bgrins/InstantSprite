<?php

function base64UrlEncode($data)
{
  return strtr(rtrim(base64_encode($data), '='), '+/', '-_');
}

function base64UrlDecode($base64)
{
  $base64 = str_replace(' ','+',$base64);
  return base64_decode(strtr($base64, '-_', '+/'));
}

$data = $_GET['img'];
$dataURL = explode(",", $data);
$base64 = $dataURL[count($dataURL) - 1];


header("Content-type: image/png");
echo base64UrlDecode($base64);

?>