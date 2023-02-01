<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//include_once dirname(__DIR__).'/datos/user_sql.php';
//$obj = new user_sql();
include_once dirname(__DIR__).'/datos/base_sql.php';

$data = json_decode(file_get_contents('php://input'), true);
$obj  = new base_sql();

$message = -1;
        
        $id_movimiento      = $_POST['id_mov'];
		$id_tipo 			= $_POST['user_id_tipo'];
		$rut_usuario 		= $_POST['user_rut_usuario'];
		$cc 				= $_POST['user_centro_costos'];
		$id_equipo 			= $_POST['user_equipo'];
		$user_observacion 	= $_POST['user_observacion'];
		$creador 			= $_POST['creador'];
		 
		$obj->actualizar_movimiento_sql($id_movimiento,$id_tipo,$rut_usuario,$cc,$id_equipo,$user_observacion,$creador);

for ($i=0; $i < count($_FILES); $i++)
{
	$nombre_archivo = $_FILES[$i]['name'];
	$tipo           = $_FILES[$i]['type'];
	$fileExtension  = pathinfo($_FILES[$i]['name'], PATHINFO_EXTENSION);
	$newFileName    = md5(time().$nombre_archivo.rand(15,35)).'.'.$fileExtension;
	$uploadFileDir  = '../adjuntos/';
	$dest_path      =  $uploadFileDir.$newFileName;
	$fileTmpPath    = $_FILES[$i]['tmp_name'];
	//borrar
	$p_fecha		= time();
	$peso           = round(filesize($fileTmpPath)/1000000,1);
	echo 'fileTmpPath='.$fileTmpPath.'<br>';
	echo 'dest_path='.$dest_path.'<br>';
		
	if( move_uploaded_file($fileTmpPath, $dest_path) )
	{
		$obj->guardar_adjunto_sql($id_movimiento,($i+1),$newFileName,$p_fecha,$tipo,$peso,$dest_path);
		$message = 1;
	}
	else
	{
		$message = 0;
	}
}

//echo $id_movimiento;