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
	  
	   //////////////////////////////////////////////////////////////////////////////////select
	  public function getstatus($num) {
		  /*se debe de validar el usuario debe ser unico*/
		$stmt = $this->conn->prepare("SELECT so.numpapeleta,UPPER(so.nombre) as nombre,UPPER(so.apaterno) as apaterno,UPPER(so.amaterno) as amaterno,UPPER(fu.nomfuerza) as nomfuerza, UPPER(gr.nomgrado) as nomgrado, ROUND((apo.cantobligados+apo.cantjubilacion)/12,2) as servicio, if(apo.obligatorios=0,apo.cantobligados,apo.cantjubilacion) as aportes
FROM par_grados gr,apo__total_aportes apo,par_fuerzas fu,socios so  
WHERE so.idfuerza=fu.idfuerza and so.idgrado=gr.idgrado and so.numpapeleta=apo.numpapeleta and so.numpapeleta=:u");
	    $stmt->bindParam(':u', $num); 
        if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) {
				$userid = array(); 
				foreach ($CountReg as $row) {
					$userid["numpapeleta"] = $row["numpapeleta"]; 
					$userid["nombre"] = $row["nombre"];  
					$userid["ape"] = $row["apaterno"].' '.$row["amaterno"]; 
					$userid["nomfuerza"] = $row["nomfuerza"]; 
					$userid["nomgrado"] = $row["nomgrado"]; 
					$userid["servicio"] = $row["servicio"]; 
					$userid["aportes"] = $row["aportes"];   
				} 
				$stmt->closeCursor();  
				return $userid;
		    }else{
				$stmt->closeCursor();  
                return null; 
			}
        } else { 
			$stmt->closeCursor();  
            return null;
        }
		 
	 } 
	 public function getstatussocio($num) {
		  /*se debe de validar el usuario debe ser unico*/
		$stmt = $this->conn->prepare("SELECT so.numpapeleta,concat(UPPER(so.nombre),' ',UPPER(so.apaterno),' ',UPPER(so.amaterno)) as nombre,ci 
FROM par_grados gr,apo__total_aportes apo,par_fuerzas fu,socios so  
WHERE so.idfuerza=fu.idfuerza and so.idgrado=gr.idgrado and so.numpapeleta=apo.numpapeleta and so.ci like '$num%'");
	    
        if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) {
				$userid = array(); 
				foreach ($CountReg as $row) {
					$userid["numpapeleta"] = $row["numpapeleta"]; 
					$userid["nombre"] = $row["nombre"];   
					$userid["ci"] = $row["ci"];    
				} 
				$stmt->closeCursor();  
				return $userid;
		    }else{
				$stmt->closeCursor();  
                return null; 
			}
        } else { 
			$stmt->closeCursor();  
            return null;
        }
		 
	 }
	  public function getProducts($aportes) { 
		$stmt = $this->conn->prepare("SELECT p.idescala,p.idfactor,p.nomproducto,p.garantes,p.tasa,p.plazominimo,p.plazomaximo,mo.nommoneda,mo.codmoneda,mo.tipocambio 
FROM par__productos p,par__monedas mo WHERE p.moneda=mo.idmoneda and p.activo=1 order by p.nomproducto");
	
        if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) {
				$userid = array();
				foreach ($CountReg as $row) { 
                    $intoo = array();				
					$intoo["escala"] = $this->getscala($row["idescala"],$aportes); 
					$intoo["name"] = $row["nomproducto"].""; 
					$intoo["garantes"] = $row["garantes"].""; 
					$intoo["tasa"] = $row["tasa"].""; 
					$intoo["plazominimo"] = $row["plazominimo"].""; 
					$intoo["plazo"] = $row["plazomaximo"].""; 
					$intoo["nommoneda"] = $row["nommoneda"].""; 
					$intoo["moneda"] = $row["codmoneda"].""; 
					$intoo["tipocambio"] = $row["tipocambio"]."";  
                    $intoo["factor"] = $this->getfactor($row["idfactor"]);
					$userid[] = $intoo;
				}   
				$stmt->closeCursor();  
				return $userid;
		    }else{
				$stmt->closeCursor();  
            return null;
			}
        } else {
			$stmt->closeCursor();  
            return null;
        }
		 
	 }
	 public function getscala($idescala,$servicio) {
		  /*se debe de validar el usuario debe ser unico*/
		$stmt = $this->conn->prepare(" SELECT minmonto,maxmonto FROM par__escalas WHERE idescala=:i and minanios<=:s and maxanios>=:s");
	     $stmt->bindParam(':i', $idescala); 
		 $stmt->bindParam(':s', $servicio); 
        if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) {
				$userid = array(); 
				foreach ($CountReg as $row) {
					$userid["minmonto"] = $row["minmonto"]; 
					$userid["maxmonto"] = $row["maxmonto"];   
				} 
				$stmt->closeCursor();  
				return $userid;
		    }else{
				$stmt->closeCursor();  
                return null; 
			}
        } else { 
			$stmt->closeCursor();  
            return null;
        }
		 
	 } 
	  public function getfactor($idf) { 
		$stmt = $this->conn->prepare("SELECT pc.valorporcentual FROM par__productos__criterios pc, par__productos__parametros pp  WHERE pc.idprodparam=pp.idprodparam and pp.idf=3 and pp.idfactor=:s");
	    $stmt->bindParam(':s', $idf); 
        if ($stmt->execute()) {
            $CountReg = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($CountReg) >= 1) { 
				foreach ($CountReg as $row) {
					$factor = $row["valorporcentual"];    
				} 
				$stmt->closeCursor();  
				return $factor;
		    }else{
				$stmt->closeCursor();  
                return 100; 
			}
        } else { 
			$stmt->closeCursor();  
            return 100;
        }
		 
	 } 
 
	  public function setSuge($num,$asunto,$deta){
        
		$stmt = $this->conn->prepare("INSERT INTO sugerencias(num,asunto,detalle) VALUES (:a,:b,:c)");
        $stmt->bindParam(':a',$num, PDO::PARAM_STR, 12);
        $stmt->bindParam(':b',$asunto, PDO::PARAM_STR, 12);
		$stmt->bindParam(':c',$deta, PDO::PARAM_LOB);
		 
        $result = $stmt->execute();
        
								if ($result) { 
									 $response = "Ok";  $stmt->closeCursor();
								} else { 
									$res = $stmt->errorInfo();  
									$response="SQLSTATE:".$res[0]."<br>Codigo:".$res[1]."<br>Mensaje DB:".$res[2];
									$stmt->closeCursor();
								} 

        return $response;
    }
}

?>
