<?php
	 require_once './include/db_handler.php';  
		$db = new DbHandler(); 
		$salida = $db->json(); 
		$db->close();  
	  
?>