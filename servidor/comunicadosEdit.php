<?php 
  if(!empty($_GET["id"])){ 
     require_once 'include/db_handler.php';  
    				$db = new DbHandler();   
					 $salida = $db->getcomunicadosId($_GET["id"]); 
					 $db->close();
		 if($salida==null)			 
        echo json_encode(array ('value'=>0));  
       else
	    echo json_encode(array ('value'=>1,'data'=>$salida));  
    }else{ 
	  echo json_encode(array ('value'=>0));  	
	}
?>