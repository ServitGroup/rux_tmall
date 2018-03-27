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
$json = json_decode(file_get_contents("php://input"));
$o = new stdClass();
$o->msg = 'start';

  if($json) {
      $o->reqno = $json->baseid;
      $i = 1;
      foreach ($json->skulist as $row) {
              $res = ResponsePrice::where('ids',$json->baseid)->where('SkuId',$row->skuId)->first();
              if($res){}else{
                $res = new ResponsePrice();
              }
              $res->ItemsNo = $i;
              $res->ids = $json->baseid;
              $res->RequestNo = $json->baseid;
              $res->Names = $row->names;
              $res->Url = $row->url;
              $res->Pvs = $row->pvs;
              // $res->Saleprice = $row->saleprice;
              $res->sprice0 = isset($row->sprice0) ? $row->sprice0 : 0 ;
              $res->sprice1 = isset($row->sprice1) ? $row->sprice1 : 0 ;
              $res->sprice2 = isset($row->sprice2) ? $row->sprice2 : 0 ;
              $res->sprice3 = isset($row->sprice3) ? $row->sprice3 : 0 ;
              $res->imgpath = isset($row->imgpath) ? $row->imgpath : null;
              $res->vdopath = isset($row->vdopath) ? $row->vdopath : null;
              $res->video_thumbnail_left = isset($row->vdopath) ? $row->vdopath : null;

              if($row->price){
                $res->Price = $row->price;
              } else {
                $res->Price = isset($row->sprice0) ? $row->sprice0 : 0;
              }
              $res->Stock = $row->stock;
              $res->SkuId = $row->skuId;
              $res->save();
              $i++;
            }
            $req = RequestPrice::where('RequestNo',$json->baseid)->first();
            if($req){
              $req->Status = 'Y';
              $req->save();
            }
            $json->skulist = count($json->skulist);
            $o->data = $json;
            $o->msg = 'successed';
            $o->status = 1;
  }

  // $msg = json_encode($o,JSON_UNESCAPED_UNICODE);
  $msg = "\n";
  $msg .= "msg:successed\n";
  $msg .= "url:".$json->url."\n";
  $msg .= "skulist:".count($json->skulist)."\n";
  $msg .= "title:".$json->title;

  linenotify($msg);
