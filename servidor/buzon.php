<?php 
 
					require_once './include/db_handler.php';  
					$db = new DbHandler();   
					$salida = $db->getbuzon(); 
					$db->close();   
					$tabla='';
					 foreach ($salida as $row) {
									$tabla.='<tr>
						    		<td  class=" align-middle">'.$row['num'].'</td>
									<td  class=" align-middle">'.$row['nomgrado'].' '.$row['nombre'].' '.$row['apaterno'].' '.$row['amaterno'].'</td>
						    		<td  class=" align-middle">'.$row['asunto'].'</td> 
									<td  class=" align-middle">'.$row['detalle'].'</td> 
									<td  class=" align-middle">'.$row['fecha'].'</td> </tr>';
						    } 
					echo $tabla;
		 
	
?>