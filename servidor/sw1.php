<?php
	 require_once './include/db_handler.php';  
		$db = new DbHandler(); 
		$salida = $db->getcomunicadosmodal(); 
		$db->close();  
	echo json_encode($salida); 
	//print_r($data);
?>