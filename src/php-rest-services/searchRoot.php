<?php
try{
// if(isset($_GET["word"])){
header("Access-Control-Allow-Origin: *");

$word = $_REQUEST["word"];
//echo "word".$word;

$config = require 'dbConfig.php';	
	@ $db = new mysqli($config['dbHost'],$config['userName'], $config['password'],$config['dbName']);
	if (mysqli_connect_errno()) {
	$data = '{"error":"DB Connection error","success":0}';
	echo $data;
	exit;
	}
    
    $dataWrapper = array();
	$data = array();	
        
   
    
    //$rootQuery = "SELECT * FROM ROOT r where r.ROOT_NAME LIKE '%".$word."%'";
    $rootQuery = "SELECT * FROM ROOT r";
    $rootResult = $db->query($rootQuery);
    $rootNumResults = $rootResult->num_rows;				
    if($rootNumResults > 0)
    {
        $roots = array();
        for ($k=0; $k <$rootNumResults; $k++) 
        {
            $root = array();

            $rootRow = $rootResult->fetch_object();
            $rootId = $rootRow->ROOT_ID;
            $rootName = $rootRow->ROOT_NAME;
            $rootLanguage = $rootRow->ROOT_LANG  ;
            $rootDifinition = $rootRow->ROOT_DEF ;                      
                
            $root['rootId'] = $rootId;
            $root['rootName'] = $rootName;
            $root['rootLanguage'] = $rootLanguage;
            $root['rootDifinition'] = $rootDifinition;
                
            $roots[] = $root;
        }
        $data['roots'] = $roots;
    }
                           
    $rootResult->free();

    $dataWrapper["data"] = $data;			
    echo json_encode($dataWrapper);			
	$db->close();
    
    				
//}
// else{
//    $data = '{"error":"Request received with invalid parameters","success":0}' ;
//    echo $data;
// }

}catch (Exception $e)
{
	$data = '{"error":"Error in Server.","success":0}}' ;
   echo $data;
}
?>
