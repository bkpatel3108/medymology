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
        
    $query = "SELECT * FROM TERM t, ROOT r, ROOT_TERM_MPG m where t.TERM_ID = m.TERM_ID AND r.ROOT_ID = m.ROOT_ID AND (t.TERM_NAME LIKE '%".$word."%' || r.ROOT_NAME LIKE '%".$word."%')";
    $termResult = $db->query($query);
    $termNumResults = $termResult->num_rows;				
    if($termNumResults > 0)
    {
        $terms = array();
        $termIds = array();
  
        for ($j=0; $j <$termNumResults; $j++) 
        {
            $termRow = $termResult->fetch_object();
            $termId = $termRow->TERM_ID;
            $termName = $termRow->TERM_NAME;
            $termDefinition = $termRow->TERM_DEF;
            $termInformation = $termRow->TERM_INFO;
            $termHistory = $termRow->TERM_HST;
           
            if (!in_array($termId, $termIds)) {
                
            $term = array();
            $term['termId'] = $termId;
            $term['termName'] = $termName;
            $term['termDefinition'] = $termDefinition;
            $term['termInformation'] = $termInformation;
            $term['termHistory'] = $termHistory;
                       
            $termIds[] = $termId;
            
            //fetching roots
            $rootQuery = "SELECT * FROM ROOT r, ROOT_TERM_MPG m where r.ROOT_ID = m.ROOT_ID AND m.TERM_ID =".$termId;
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
                $term['roots'] = $roots;
            }
            
            $terms[] = $term;


            }
            
            
        }
        $data['terms'] = $terms;
    }
    
    $termResult->free();

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
