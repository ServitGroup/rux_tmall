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
  // $conn = new PDO("mysql:host=43.229.77.39;dbname=asiamall_parts", $user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") );
  // $conn = new PDO("mysql:host=localhost;dbname=asiamall_tmallgenprice", $user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") );
  $conn = new PDO("mysql:host=localhost;dbname=asiamall_tmallgenprice", $user, $pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") );
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  echo 'ERROR: ' . $e->getMessage();
}
$sql = 'SELECT * FROM RequestPrice where 1=1 and status = "N"';
$sth = $conn->prepare($sql);
$sth->execute();
$results = $sth->fetchAll(PDO::FETCH_ASSOC);
echo 'success';
echo '<script>

    var lista = '. json_encode($results). ';
    console.log(lista);
    lista.map(a=>{
        setTimeout(function(){ 
            console.log("open window-->",a.Product_URL);
            window.open(a.Product_URL);
        }, 10000);
    });

</script>';
foreach ($results as $row ) {
    echo '<a href="'.$row['Product_URL'].'">'.$row['SKU'].'</a><br/>';
}