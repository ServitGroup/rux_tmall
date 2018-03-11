<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: 0");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Expose-Headers: Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
header("Access-Control-Allow-Origin: *");
$user = 'asiamall_admin';
$pass = 'newvios2522';
try {
  $conn = new PDO("mysql:host=localhost;dbname=asiamall_cscart2017", $user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") );
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  echo 'ERROR: ' . $e->getMessage();
}
$sql = "update RequestPrice set status = 'N' ";
$o = new stdClass();
$reqstatement = $conn->prepare($sql);
$o->data = $reqstatement->execute();

// $truncate = $conn->prepare('truncate table ResponsePrice;');
// $o->truncate = $truncate->execute();
$o->msg = 'successed';
$o->status = 1;
// echo json_encode($o);
echo json_encode($o,JSON_UNESCAPED_UNICODE);
