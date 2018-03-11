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
// RequestPrice
// RequestNo
// SKU
// Product_URL
// Status

$results = RequestPrice::where('Status','N')->get();
// dump($results);
echo 'รายการที่ต้องการ Load เข้าระบบ &nbsp;&nbsp;&nbsp;<b>('.count($results).'</b>)<br/><hr/>';
echo '<script>
    var lists = '.$results->toJson(). ';
    console.log(lists);
    init = async()=>{
        let getCoffee = () => {
            return new Promise(resolve => {
                setTimeout(() => resolve("☕"), 30000); // it takes 2 seconds to make coffee
            });
        };
        for(let i=0;i<lists.length;i++){
            console.log("row-->",i,lists[i]);
            console.log("open window-->",lists[i].Product_URL);
            window.open(lists[i].Product_URL); 
            await getCoffee()
        }
        alert("successed");
    }
    init();
</script>';
foreach ($results as $row ) {
    echo '<a href="'.$row->Product_URL.'">'.$row->RequestNo.'/'.$row->SKU.'</a><br/>';
}