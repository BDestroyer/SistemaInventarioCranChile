<?php
class conexion
{
    private $hostname = "localhost";
    private $username = "cranchile_prueba";
    private $password = "yzF8tD2yu3aLjdP";//eE)[NDm7drvVUmZo
    private $database = "cranchile_prueba";

    private $mysqli = 0;

    function __construct()
    {
    	$mysqli = new mysqli($this->hostname, $this->username,$this->password, $this->database);
    	mysqli_set_charset($mysqli, 'utf8');

		if ($mysqli->connect_errno)
		{
			die( "Fallo la conexión a MySQL: (" . $mysqli -> mysqli_connect_errno() . ") " . $mysqli -> mysqli_connect_error());
		}
		else
		{
			//echo "Conexión exitosa!";
			$this->mysqli = $mysqli;
		}
    }

    public function cerrar()
    {
    	mysqli_close($this->mysqli);
    }

    //select, update, delete (sirve para insert sin autoincrement)
    public function consulta($consulta, $mostrar_query=0)
    {   $consulta = trim($consulta);
    	$datos = array();

    	$resultado = $this->mysqli->query( $consulta );

        if ( preg_match('/^select.*/i', $consulta, $salida) )
        {
        	while ($fila = $resultado->fetch_assoc())
	        {
		        array_push($datos, $fila);
		    }
		    $resultado->free();
        }
        else
        {
        	$datos = $resultado;
        }

        if ($mostrar_query == 1) {
            echo $consulta;
        }

        return $datos;
    }

    //insert con autoincrement regresa el nuevo id
    public function insertId($sqlstr){
		$results = $this->mysqli->query($sqlstr);
		$filas   = $this->mysqli->affected_rows;
		if($filas >= 1){
			return $this->mysqli->insert_id;
		}else{
			return 0;
		}
    }
    
    function my_htmlentities($input){
        $string = htmlentities($input,ENT_NOQUOTES,'UTF-8');
        $string = str_replace('&euro;',chr(128),$string);
        $string = html_entity_decode($string,ENT_NOQUOTES,'ISO-8859-15');
        return $string;
    }
}