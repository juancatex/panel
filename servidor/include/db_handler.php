<?php
 
class DbHandler {
 /*___________para saber los tipos de errores que emite mysql revisar: https://dev.mysql.com/doc/refman/5.5/en/error-messages-server.html*/

    function __construct() {
        require_once dirname(__FILE__) . '/db_connect.php'; 
        $db = new DbConnect();
		$this->validatedb=$db;
        $this->conn = $db->connect();
    }
		 
	
	  public function close() {$conn=null;}
	   public function json() { 
				$json_a=json_decode(file_get_contents("configserver.json",true),true); 
				echo $json_a['servidor'];
	   }
	   //////////////////////////////////////////////////////////////////////////////////select
	  public function login($user, $passww) {
		  /*se debe de validar el usuario debe ser unico*/
		$stmt = $this->conn->prepare("SELECT iduser, pass, nombre FROM login WHERE user=:u and pass=:p");
	    $stmt->bindParam(':u', $user); 
		$stmt->bindParam(':p', $passww);
        if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) {
				foreach ($CountReg as $row) {
					$uid = $row["iduser"]; 
					// $passsalt = $row["pass"];  
					$nombre = $row["nombre"]; 
				}
				 
				$userid = array(); 
				$json_a=json_decode(file_get_contents("configserver.json",true),true);  
				// $userid["status"] = ($this->validatedb->validate_pw($passww,$passsalt))?"Ok":"Error"; 
				$userid["status"] = "Ok"; 
				$userid["user"] = $uid."";   
				$userid["nombre"] = $nombre;
				$userid["servidor"] = $json_a['servidor'];
				$userid["web"] = $json_a['index'];
				$stmt->closeCursor();  
				return $userid;
		    }else{
				$userid2 = array();
				$userid2["status"] = "Error"; 
				$stmt->closeCursor();  
				return $userid2; 
			}
        } else {
			$userid2 = array();
			$userid2["status"] = "Error"; 
			$stmt->closeCursor(); 
			 
            return $userid2;
        }
		 
	 } 
  
  public function getcomunicados() {
		 
		$stmt = $this->conn->prepare("SELECT c.*,l.nombre FROM comunicados c,login l where c.iduser=l.iduser  order by idcomunicado desc");
	     if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) { 
				$stmt->closeCursor();  
				return $CountReg;
		    }else{
				$userid2 = array(); 
				$stmt->closeCursor();  
				return $userid2; 
			}
        } else {
			$userid2 = array(); 
			$stmt->closeCursor();  
            return $userid2;
        }
		 
	 }
	  public function getcomunicadosId($id) {
		 
		 $stmt = $this->conn->prepare("SELECT c.*,l.nombre FROM comunicados c,login l where c.iduser=l.iduser and c.idcomunicado=:u");
		 $stmt->bindParam(':u', $id);
	     if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) {
				$userid = array();
					foreach ($CountReg as $row) { 
						$userid["contenido"] = $row['contenido']; 
						$userid["detalle"] = $row['detalle']; 
						$userid["estado"] = $row['estado']; 
						$userid["fechapublicacion"] = $row['fechapublicacion']; 
						$userid["idcomunicado"] = $row['idcomunicado']; 
						$userid["iduser"] = $row['iduser']; 
						$userid["islike"] = $row['islike']; 
						$userid["likes"] = $row['likes']; 
						$userid["new"] = $row['new']; 
						$userid["nombre"] = $row['nombre']; 
						$userid["time"] = $row['time']; 
						$userid["titulo"] = $row['titulo']; 
					}				
				$stmt->closeCursor();  
				return $userid;
		    }else{
				$userid2 = array(); 
				$stmt->closeCursor();  
				return $userid2; 
			}
        } else {
			$userid2 = array(); 
			$stmt->closeCursor();  
            return $userid2;
        }
		 
	 }
	
	  public function getbuzon() {
		 
		$stmt = $this->conn->prepare("SELECT su.*,so.numpapeleta,UPPER(so.nombre) as nombre,UPPER(so.apaterno) as apaterno,UPPER(so.amaterno) as amaterno, UPPER(gr.nomgrado) as nomgrado
FROM par_grados gr,socios so,sugerencias su  
WHERE so.idgrado=gr.idgrado  and su.num=so.numpapeleta  ORDER BY su.fecha  DESC"); 
        if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) { 
				$stmt->closeCursor();  
				return $CountReg;
		    }else{
				$userid2 = array(); 
				$stmt->closeCursor();  
				return $userid2; 
			}
        } else {
			$userid2 = array(); 
			$stmt->closeCursor();  
            return $userid2;
        }
		 
	 }
	 
	  //////////////////////////////////////////////////////////////////////////////////
	 /////////////////////////////////////////////////////////////////////////insert
	  public function adduser($user,$pass,$name){
       
		$stmt = $this->conn->prepare("INSERT INTO login(user,pass,nombre) VALUES (:u,:p,:n)");
        // $passnew=$this->validatedb->generate_hash($pass);
        $stmt->bindParam(':u',$user, PDO::PARAM_STR, 12);
		// $stmt->bindParam(':p',$passnew, PDO::PARAM_STR, 12); 
		$stmt->bindParam(':p',$pass, PDO::PARAM_STR, 12); 
		$stmt->bindParam(':n',$name, PDO::PARAM_STR, 12); 
		 
        $result = $stmt->execute(); 
								if ($result) {  
									 $userid = array(); 
									 $userid["status"] = "Ok";  
									 $userid["user"] =  $this->conn->lastInsertId(); 
									 $response =$userid; 
									 $stmt->closeCursor();
								} else { 
									$res = $stmt->errorInfo();  
									$response="SQLSTATE:".$res[0]."<br>Codigo:".$res[1]."<br>Mensaje DB:".$res[2];
									$stmt->closeCursor();
								} 

        return $response;
 }
 
  public function updatecomunicado($id,$titulo,$detalle,$contenido,$fecha) {
	 
	$stmt = $this->conn->prepare("UPDATE comunicados SET titulo = :t, detalle = :d, contenido = :c,
	fechapublicacion = :f WHERE idcomunicado = :id");
	$stmt->bindParam(':id', $id); 
	$stmt->bindParam(':t', $titulo, PDO::PARAM_STR, 12);
	$stmt->bindParam(':d', $detalle, PDO::PARAM_STR, 12);
	$stmt->bindParam(':c', $contenido, PDO::PARAM_LOB);
	$stmt->bindParam(':f', $fecha);  
	$result = $stmt->execute();
	$stmt->closeCursor(); 
	return $result;
		}
	 public function deletecomunicado($id) {
	 
	$stmt = $this->conn->prepare("DELETE FROM comunicados WHERE idcomunicado = :id");
	$stmt->bindParam(':id', $id);  
	$result = $stmt->execute();
	$stmt->closeCursor(); 
	return $result;
		}
		
	 public function addcomunicado($titulo,$detalle,$contenido,$fecha,$user) {
	 
		$stmt = $this->conn->prepare("update comunicados set new=0"); 
		$result = $stmt->execute();
		$stmt->closeCursor(); 
		if($result){
			$stmt = $this->conn->prepare("INSERT INTO comunicados (titulo,detalle,contenido,fechapublicacion,iduser) VALUES (:t,:d,:c,:f,:u)");
				$stmt->bindParam(':t', $titulo, PDO::PARAM_STR, 12);
				$stmt->bindParam(':d', $detalle, PDO::PARAM_STR, 12);
				$stmt->bindParam(':c', $contenido, PDO::PARAM_LOB);
				$stmt->bindParam(':f', $fecha); 
				$stmt->bindParam(':u', $user); 
			 $result = $stmt->execute(); 
			 $stmt->closeCursor();
			 return $result;
		}else{
			return $result;
		}
	 }
	 
	   public function getcomunicadosmodal() { 
		$stmt = $this->conn->prepare("SELECT * FROM comunicados order by idcomunicado desc"); 
        if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC); 
			if (count($CountReg) >= 1) {  
				$data = array();
				$i=0; $time=0;
				foreach ($CountReg as $row) {
						$id = $row['idcomunicado']; 
						$titulo = $row['titulo']; 
						$detalle = $row['detalle']; 
						$contenido = $row['contenido']; 
						$fechapublicacion = $row['fechapublicacion'];
						$fe = explode ('-', $fechapublicacion);
						$mes = $fe[1]; 
						if ($mes==1) $mes_av='Ene';
						else if($mes==2) $mes_av='Feb';
						else if($mes==3) $mes_av='Mar';
						else if($mes==4) $mes_av='Abr';
						else if($mes==5) $mes_av='May';
						else if($mes==6) $mes_av='Jun';
						else if($mes==7) $mes_av='Jul';
						else if($mes==8) $mes_av='Ago';
						else if($mes==9) $mes_av='Sep';
						else if($mes==10) $mes_av='Oct';
						else if($mes==11) $mes_av='Nov';
						else if($mes==12) $mes_av='Dic';
						$dia = $fe[2];		
						$likes = $row['likes']; 
						$islike = $row['islike']; 
						$new = $row['new']; 
						$data[$i] = array(
							'id'=>$id,
							'titulo'=>$titulo,
							'detalle'=>$detalle,
							'contenido'=>$contenido,
							'mes'=>$mes_av,
							'dia'=>$dia,
							'likes'=>$likes,
							'islike'=>$islike,
							'titulo'=>$titulo,
							'new'=>$new,
							'time'=>$time
						);
						$i++; $time=$time + 100;
				}
				$stmt->closeCursor();  				
				return $data;
		    }else{
				$userid2 = array(); 
				$stmt->closeCursor();  
				return $userid2; 
			}
        } else {
			$userid2 = array(); 
			$stmt->closeCursor();  
            return $userid2;
        }
		 
	 }
	   public function updatecomunicadolikes($id,$l) { 
		$stmt = $this->conn->prepare("update comunicados set likes=:l where idcomunicado = :id");
		$stmt->bindParam(':id', $id);  
		$stmt->bindParam(':l', $l);  
		$result = $stmt->execute();
		$stmt->closeCursor(); 
		return $result;
			}
}

?>
