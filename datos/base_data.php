<?php

@session_destroy();
session_start();

$data     = json_decode(file_get_contents('php://input'), true);
$p_opcion = $data['opcion'];

include_once dirname(__DIR__).'/datos/base_sql.php';
$obj = new base_sql();

switch ($p_opcion)
 {

	case 'login':
		$p_username = $data['usuario'];
		$p_password = sha1(md5($data['password']));
		$status     = 0;
		$error      = '';

		$existe     = $obj->login_existe_usuario_sql($p_username);
		if( $existe == '0' ){
			$error = 'Usuario no existe!';
		}
		else{
			$valida = $obj->login_existe_usuario_sql($p_username);
			if ( $valida == '0' ) {
				$error = 'Usuario Inactivo!';
			}
			else{
				$valida = $obj->login_valida_password_sql($p_username, $p_password);
				if ( $valida == '0' ) {
					$error = 'Contraseña incorrecta!';
				}
				else{
					$status     = 1;
					$error      = '';
					$datos_user = $obj->login_datos_usuario_sql($p_username);

					@session_start();
					$_SESSION['id_user']  	= $datos_user[0]['id_user'];
					$_SESSION['name']     	= $datos_user[0]['name'];
					$_SESSION['lastname'] 	= $datos_user[0]['lastname'];
					$_SESSION['email']    	= $datos_user[0]['email'];
					$_SESSION['ccmail']   	= $datos_user[0]['ccmail'];
					$_SESSION['username'] 	= $datos_user[0]['username'];
					$_SESSION['kind']     	= $datos_user[0]['kind'];
					$_SESSION['admin']    	= $datos_user[0]['admin'];
					$_SESSION['finicio']  	= strtotime(date("d-m-Y H:i:00",time()));
					$_SESSION['ult']      	= 0;
				}
			}
		}
		$res = array
		(
			"status"     => $status,
			"error"      => $error
		);
	break;

	case 'obtener_datos':
		$datos = array(
			"id_user"  => $_SESSION['id_user'],
			"name"     => $_SESSION['name'],
			"lastname" => $_SESSION['lastname'],
			"email"    => $_SESSION['email'],
			"ccmail"   => $_SESSION['ccmail'],
			"username" => $_SESSION['username'],
			"kind"     => $_SESSION['kind'],
			"admin"    => $_SESSION['admin'],
			"finicio"  => $_SESSION['finicio'],
			"ult"      => $_SESSION['ult'],
		);
		$res = $datos;
	break;

	case 'validar':
		//valida la session
		$fecha_actual     = strtotime(date("d-m-Y H:i:00",time()));
		//$diff_ini_segundo = $fecha_actual - $_SESSION['finicio'];
		//$diff_ult_segundo = $fecha_actual - $_SESSION['ult'];
		$session_data     = array
		(
			//'session_status'  => ( isset($_SESSION['id_user']) == true) ? 1 : 0,
			"ola"=>"22",'session_status'  => 1,
			//'session_ini_seg' => $diff_ini_segundo,
			//'session_ult_seg' => $diff_ult_segundo
		);

		$res = array
		(
			"session_data" => $session_data
		);
	break;

	//centro de costos

	case 'eliminar_cc':
		$id	 = $data['bd_id'];
		$res = $obj->eliminar_cc_sql($id);
	break;

	case 'editar_cc':
		$id  	= $data['bd_id'];
		$nombre = $data['nombre'];
		$res 	= $obj->editar_cc_sql($id, $nombre);
	break;

	case 'listar_centro_costo':
		$res = $obj->listar_centro_costo_sql();
	break;

	case 'guardar_centro_costos':
		$p_nombre      = $data['nombre'];
		$res 		   = $obj->guardar_centro_costos_sql($p_nombre);
	break;

	case 'validar_centro_costos':
		$p_nombre      = $data['nombre'];
		$res 		   = $obj->validar_centro_costos_sql($p_nombre);
	break;

	//movimento
	case 'listar_movimiento':
		$res	= $obj->listar_movimiento_sql();
	break;

	case 'eliminar_movimiento':
		$id		= $data['id'];
		$res	= $obj->eliminar_movimiento_sql($id);
	break;

	case 'cargar_historico':
		$id		= $data['id'];
		$res	= $obj->cargar_historico_sql($id);
	break; 

	case 'actualizar_movimiento':
		$id_tipo	  	  = $data['id_tipo'];		
		$id_movimiento 	  = $data['datos']['id_movimiento'];
		$rut_encargado 	  = $data['datos']['encargado_movimiento'];
		$cc			  	  = $data['datos']['cc_movimiento'];
		$id_equipo		  = $data['datos']['equipo_movimiento'];
		$user_observacion = $data['datos']['observacion_movimiento'];
		$creador		  = $data['datos']['creador_movimiento'];
		$res			= $obj->actualizar_movimiento_sql
		(
			$id_movimiento,
			$id_tipo,
			$rut_encargado,
			$cc,
			$id_equipo,
			$user_observacion,
			$creador
		);
	break;
	//categoria
	
	case 'listar_categoria':
		$res = $obj->listar_categoria_sql();
	break;

	case 'validar_categoria':
		$p_nombre   	   = $data['nombre'];
		$res 			   = $obj->validar_categoria_sql($p_nombre);
	break;
	
	case 'guardar_categoria':
		$p_nombre      = $data['nombre'];
		$res 		   = $obj->guardar_categoria_sql($p_nombre);
	break;

	case 'editar_categoria':
		$id	 		= $data['bd_id'];
		$nombre_cat = $data['nombre'];
		$res = $obj->editar_categoria_sql($id,$nombre_cat);
	break;

	case 'eliminar_categoria':
		$id			= $data['bd_id'];
		$res = $obj->eliminar_categoria_sql($id);
	break;

	case 'listar_tipo_movimiento':
		$res = $obj->listar_tipo_movimiento_sql();
	break;
	
	//Encargado

	case 'eliminar_encargado':
		$id		= $data['bd_id'];
		$res 	= $obj->eliminar_encargado_sql($id);
	break;

	case 'editar_encargado':
		$id			=	$data['bd_id'];
		$rut		=	$data['rut'];
		$nombre		=	$data['nombre'];
		$apellido	=	$data['apellido'];
		$res 		=	$obj->editar_encargado_sql($id,$rut,$nombre,$apellido);
	break;

	case 'listar_encargado':
		$res 		= 	$obj->listar_encargado_sql();
	break;

	case 'guardar_nuevo_encargado':
		$p_rut					= $data['rut'];
		$p_nombre_encargado		= $data['nombre'];
		$p_apellido_encargado 	= $data['apellido'];
		$res 					= $obj->guardar_nuevo_encargado_sql($p_rut, $p_nombre_encargado, $p_apellido_encargado);
	break;

	case 'validar_nuevo_encargado':
		$p_rut_validar	= $data['rut'];
		$res 			= $obj->validar_nuevo_encargado_sql($p_rut_validar);
		break;

	//equipo

	case 'eliminar_equipo':
		$id 	= $data['id_equipo'];
		$res	= $obj->eliminar_equipo_sql($id);
	break;

	case 'editar_equipo';
		$id								= $data['id_equipo'];
		$bd_nro_serie_equipo			= $data['nro_serie'];
		$bd_marca_equipo				= $data['marca_equipo'];
		$bd_modelo_equipo				= $data['modelo_equipo'];
		$bd_id_categoria_equipo			= $data['id_categoria_equipo'];
		$bd_imei_equipo					= $data['imei_equipo'];
		$bd_so_equipo					= $data['sistema_operativo_equipo'];
		$bd_fecha_adquisición_equipo	= $data['fecha_adquisición_equipo'];
		$bd_accesorio_equipo			= $data['accesorio_equipo'];
		$res	= $obj->editar_equipo_sql
		(
			$id,
			$bd_nro_serie_equipo,
			$bd_marca_equipo,
			$bd_modelo_equipo,
			$bd_id_categoria_equipo,
			$bd_imei_equipo,
			$bd_so_equipo,
			$bd_fecha_adquisición_equipo,
			$bd_accesorio_equipo
		);
	break;

	case 'validar_equipo':
		$nro_serie	= $data['nro_serie'];
		$res		= $obj->validar_equipo_sql($nro_serie);
	break;

	case 'ver_movimiento_datos':
		$id			= $data['id'];
		$d			= $obj->listar_movimiento_por_id_sql($id);
		$res		= $d[0];
	break;

	case 'listar_movimiento_por_id':
		$id			= $data['id'];
		$res		= $obj->listar_movimiento_por_id_sql($id);
	break;

	case 'listar_adjunto':
		$id			= $data['id'];
		$res		= $obj->listar_adjunto_sql($id);
	break;
	
	case 'guardar_equipo':
		$bd_nro_serie_equipo			= $data['nro_serie'];
		$bd_marca_equipo				= $data['marca_equipo'];
		$bd_modelo_equipo				= $data['modelo_equipo'];
		$bd_id_categoria_equipo			= $data['id_categoria_equipo'];
		$bd_imei_equipo					= $data['imei_equipo'];
		$bd_so_equipo					= $data['sistema_operativo_equipo'];
		$bd_fecha_adquisición_equipo	= $data['fecha_adquisición_equipo'];
		$bd_accesorio_equipo			= $data['accesorio_equipo'];

		$res	= $obj->guardar_equipo_sql
		(
			$bd_nro_serie_equipo,
			$bd_marca_equipo,
			$bd_modelo_equipo,
			$bd_id_categoria_equipo,
			$bd_imei_equipo,
			$bd_so_equipo,
			$bd_fecha_adquisición_equipo,
			$bd_accesorio_equipo
		);
	break;

	case 'listar_tabla_equipo':
		$res	= $obj->listar_tabla_equipo_sql();
	break;

	case 'listar_equipos_sin_asignar':
		$res 	= $obj->listar_equipos_sin_asignar_sql();
	break;

	default:
		session_destroy();
		$session_data 	= array();
		$res 			= $session_data;
	break;

	/*
	default:
		session_destroy();
		$session_data = array
		(
			'session_status' => 0,
			'id_user'        => 0,
			'name'           => '',
			'lastname'       => '',
			'email'          => '',
			'ccmail'         => '',
			'username'       => '',
			'kind'           => 0,
			'admin'          => 0
		);
		$res = $session_data;
	break;
	*/
}

header('Content-Type: application/json');
echo json_encode($res);