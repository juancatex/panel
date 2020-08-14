<?php 
 $_POST = json_decode(file_get_contents('php://input'), true);
 if(!empty($_POST["num"])&&!empty($_POST["asunto"])&&!empty($_POST["det"])){ 
   require_once 'include/db_handler_apk.php';  
    				$db = new DbHandler();   
					$salida = $db->setSuge($_POST["num"],$_POST["asunto"],$_POST["det"]); 
				   $db->close();
		  echo $salida;
    } 
?>