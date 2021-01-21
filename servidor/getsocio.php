<?php 
 if(!empty($_GET["num"])){ 
   require_once 'include/db_handler_apk.php';  
    				$db = new DbHandler();   
					$salida = $db->getstatussocio($_GET["num"]); 
					 $db->close();
		 if($salida==null)			 
        echo json_encode(array ('value'=>0));  
       else
	    echo json_encode(array ('value'=>1,'data'=>$salida));  
    }else{ 
	  echo json_encode(array ('value'=>100));  	
	}
	 
?>