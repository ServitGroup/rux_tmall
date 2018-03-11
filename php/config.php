<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__.'/vendor/autoload.php';
use \Illuminate\Database\Capsule\Manager as Capsule;
use \Curl\Curl;

$capsule = new Capsule;
$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'asiamall_cscart2017',
    'username'  => 'asiamall_admin',
    'password'  => 'newvios2522',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
    ]);
$capsule->setAsGlobal();
$capsule->bootEloquent();

use Illuminate\Database\Eloquent\Model;

class RequestPrice  extends  Model  { 
        protected  $table= 'RequestPrice';
        protected  $primaryKey='RequestNo';
        public $timestamps = false;
}

class ResponsePrice  extends  Model  { 
        protected  $table= 'ResponsePrice';
        protected  $primaryKey='ResponseNo';
        public $timestamps = true;
}
function linenotify($msg){
    $url = 'https://notify-api.line.me/api/notify';
    $token = 'ycU89lkD1tnVwXUPBcxgymhWJ7BAElbkyXmdQ51yDsG';

    $curl = new Curl();
    $curl->setHeader('Content-type','application/x-www-form-urlencoded');
    $curl->setHeader('Authorization', 'Bearer ' . $token);
    $curl->post($url, ['message'=>$msg]);
}