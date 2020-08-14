<?php 
 
					require_once './include/db_handler.php';  
					$db = new DbHandler();   
					$salida = $db->getcomunicados(); 
					$db->close();   
					$tabla='';
					 foreach ($salida as $row) {
									$tabla.='<tr>
						    		<td  class=" align-middle">'.$row['titulo'].'</td>
									<td  class=" align-middle">'.$row['detalle'].'</td>
						    		<td  class=" align-middle"><label style="overflow-y: scroll;max-height: 120px;">'.$row['contenido'].'</label></td> 
									<td  class=" align-middle">'.$row['fechapublicacion'].'</td> 
									<td  class="text-center align-middle">'.($row['new']==1?'<span class="badge badge-success">Nuevo</span>':'<span class="badge badge-warning">Antiguo</span>').'</td> 
									<td  class="text-center align-middle">'.($row['estado']==1?'<span class="badge badge-secondary">Activo</span>':'<span class="badge badge-danger">Inactivo</span>').'</td> 
									<td  class="text-center align-middle">'.$row['nombre'].'</td> 
									<td class="text-center align-middle"><div id="buttons'.$row['idcomunicado'].'">
						    			<button onclick="openModal_modify('.$row['idcomunicado'].')" class="btn btn-success btn-sm btn-block"><span class="fa fa-edit"></span> Editar</button>
						    			<button onclick="openModal_delete('.$row['idcomunicado'].',\''.$row['titulo'].'\')" class="btn btn-danger btn-sm btn-block"><span class="fa fa-trash"></span> Eliminar</button>
						    		</div>
									<div id="wait'.$row['idcomunicado'].'"></div>
									</td></tr>';
						    } 
					echo $tabla;
		 
	
?>