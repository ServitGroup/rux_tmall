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
require_once __DIR__.'/config.php';
use \Illuminate\Database\Capsule\Manager as Capsule;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// $rs = RequestPrice::where('status','N')->get();
// echo json_encode($rs);
// $id = '17975097305';


// $reqs = RequestPrice::where('RequestNo',$id)->get();
// foreach ($reqs as $req) {
//     $req->Status = 'Y';
//     $req->save();
// }


