<?php
 
class DbConnect {

    
    function __construct() {
        
    } 
    function connect() {
        include_once dirname(__FILE__) . '/config.php';
        try {
            $this->conn = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USERNAME, DB_PASSWORD);
            $this->conn->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
            $this->conn->exec("set names utf8mb4");
        } catch (PDOException $e) {
            echo "  <p>Error: " . $e->getMessage() . "</p>\n";
            exit();
        } 
        return $this->conn;
    }
	function generate_hash($password, $cost=11){
		   
			$salt=substr(base64_encode(openssl_random_pseudo_bytes(17)),0,22); 
			$salt=str_replace("+",".",$salt); 
			$param='$'.implode('$',array(
					"2y", 
					str_pad($cost,2,"0",STR_PAD_LEFT), 
					$salt 
			)); 
			return crypt($password,$param);
		}
		 
		function validate_pw($password, $hash){ 
				return crypt($password, $hash)==$hash;
		}

} 
