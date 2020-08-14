<?php
   require_once './include/db_handler.php';  
		$db = new DbHandler(); 
		$salida = $db->updatecomunicadolikes($_GET['id'],$_GET['likes']); 
		$db->close();  
	echo json_encode($salida);
?>