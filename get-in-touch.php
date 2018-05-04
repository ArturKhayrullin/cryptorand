<?php

$name = htmlspecialchars($_POST["first_name"]);
$email = htmlspecialchars($_POST["email"]);
$message = htmlspecialchars($_POST["message"]);

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

mail('audiostocks@gmail.com', 'CryptoRand Client', 'Name: '.$name.'<br/>E-mail: '.$email.'<br/>Message: '.$message, $headers);
?>