<?php 
	 
	if(isset($_GET['idcomunicado'])){ 
		 require_once 'include/db_handler.php';   
		$db = new DbHandler(); 
		$salida = $db->deletecomunicado($_GET['idcomunicado']); 
		$db->close(); 
		if($salida){ 
			 echo json_encode(array ('value'=>1));
		}else{
			echo json_encode(array ('value'=>0));
		} 
	}
	else{
		echo json_encode(array ('value'=>0));
	}
  
?>