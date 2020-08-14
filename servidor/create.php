<?php
	   if (!empty($_POST['user'])&&!empty($_POST['pass'])){
				$username = $_POST['user'];
				$password = $_POST['pass']; 
				$nom = $_POST['nom']; 
					require_once './include/db_handler.php';  
					$db = new DbHandler();   
					$salida = $db->adduser($username,sha1(md5($password)),$nom);
					$db->close();
		    	echo json_encode($salida);
		}else{
			echo json_encode(array('status' => 'Error'));
		}

?>