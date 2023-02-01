<?php

include_once 'conexion.php';

class base_sql
{
	private $conn;

	function __construct()
	{
		$this->conn = new conexion();
	}

	public function login_existe_usuario_sql($p_username)
	{
		$query =
		"
			select count(*) existe
			from user
			where username = '".$p_username."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['existe'];
	}

	public function login_valida_password_sql($p_username, $p_password)
	{
		$query =
		"
			select count(*) valida
			from user
			where username = '".$p_username."'
			and password = '".$p_password."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['valida'];
	}

	public function login_datos_usuario_sql($p_username)
	{
		$query =
		"
			select
				id_user,
				name,
				lastname,
				email,
				ccmail,
				username,
				kind,
				admin
			from user
			where username = '".$p_username."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}
	
	//movimiento

	public function cargar_historico_sql($id)
	{
		$query = 
		"
			select 
			date_format(fecha_cambio, '%d/%m/%Y %H:%i')
			as fecha_cambio_formateada,
			`id_movimiento`,
			`id_tipo_movimiento`,
			(
				select
				tipo_movimiento.tipo_movimiento 
				from tipo_movimiento
				where
				movimiento_historico.id_tipo_movimiento = tipo_movimiento.id_movimiento
			)
			as 'nombre_tipo_movimiento',
			(
				select 
				nombre_centro_costo
				from centro_costo
				where
				movimiento_historico.cc_movimiento = centro_costo.id_centro_costo
			)
			as 'nombre_cc_movimiento',
			(
				select
				concat
				(
					nro_serie_equipo,'<br>',marca_equipo,' ',modelo_equipo
				)
				from equipo
				where
				equipo.id_equipo = movimiento_historico.equipo_movimiento
			)
			as 'bd_equipo_movimiento',
			(
				select
				concat 
				(
					nombre_encargado,'<br>',apellido_encargado
				)
				from encargado
				where
				encargado.rut_encargado = movimiento_historico.encargado_movimiento
			)
			as 'nombre_encargado_movimiento',
			`encargado_movimiento`,
			`cc_movimiento`,
			`equipo_movimiento`,
			`observacion_movimiento`,
			`creador_movimiento`,
			(
				select
        		username
			    from
        		`user`
    			where
        		creador_movimiento = id_user
			)
			as 'nombre_creador_movimiento',
			date_format(fecha_movimiento, '%d/%m/%Y %H:%i')
			as fecha_movimiento_formateada,
			`estado_movimiento`
			from `movimiento_historico`
			where `equipo_movimiento` = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function guardar_movimiento_sql($p_tipo_movimiento,$p_encargado_movimiento,$p_cc_movimiento,$p_equipo_movimiento,$p_observacion_movimiento,$p_creador_movimiento)
	{
		$query = 
		"
		insert into `movimiento`
		(
			`id_tipo_movimiento`,
			`encargado_movimiento`,
			`cc_movimiento`,
			`equipo_movimiento`,
			`observacion_movimiento`,
			`creador_movimiento`,
			`fecha_movimiento`,
			`estado_movimiento`
		)
		values
		(
			'".$p_tipo_movimiento."',
			'".$p_encargado_movimiento."',
			'".$p_cc_movimiento."',
			'".$p_equipo_movimiento."',
			'".$p_observacion_movimiento."',
			'".$p_creador_movimiento."',
			now(),
			'1'
		)
		";
		$resultado = $this->conn->insertId($query);
		return $resultado;
	}

	public function guardar_adjunto_sql($p_id_movimiento,$p_id_adjunto,$p_nombre,$p_fecha,$p_tipo,$p_peso,$p_path)
	{
		$query = 
		"
		insert into `movimiento_adjunto`
		(
			`id_movimiento`,
			`id_adjunto`, 
			`nombre`, 
			`tipo`, 
			`peso`, 
			`path`
			)
		values
		(
			'".$p_id_movimiento."',
			'".$p_id_adjunto."',
			'".$p_nombre."',
			'".$p_tipo."',
			'".$p_peso."',
			'".$p_path."'
		)
		";
		$resultado = $this->conn->insertId($query);
		return $resultado;
	}

	public function actualizar_movimiento_sql($id_movimiento,$id_tipo,$rut_encargado,$cc,$id_equipo,$user_observacion,$creador)
	{
		$query =
		"
			update `movimiento`
			set 
			`id_tipo_movimiento`			='".$id_tipo."',
			`encargado_movimiento`			='".$rut_encargado."',
			`cc_movimiento`					='".$cc."',
			`equipo_movimiento`				='".$id_equipo."',
			`observacion_movimiento`		='".$user_observacion."',
			`creador_movimiento`			='".$creador."',
			`fecha_movimiento`				=now()
			where
			`id_movimiento` = '".$id_movimiento."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}
	
	public function eliminar_movimiento_sql($id)
	{
		$query = 
		"
			update `movimiento`
			set 
			`estado_movimiento`='0' 
			where
			`id_movimiento` = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function listar_movimiento_sql()
	{
		$query =
		"
			select
			`id_movimiento`,
			id_tipo_movimiento,
			(
				select
				tipo_movimiento.tipo_movimiento 
				from tipo_movimiento
				where 
				movimiento.id_tipo_movimiento = tipo_movimiento.id_movimiento
			)
			as 'nombre_tipo_movimiento',
			case when length(`encargado_movimiento`) = 0 then 'No aplica'
			else `encargado_movimiento`
			end as 'encargado_movimiento',
			ifnull(
			(

				select
				concat 
				(
					nombre_encargado,'<br>',apellido_encargado
				)
				from encargado
				where
				encargado.rut_encargado = movimiento.encargado_movimiento
			)
			, 'No aplica')
			as 'nombre_encargado_movimiento',

			cc_movimiento,
			(
				select 
				nombre_centro_costo
				from centro_costo
				where
				movimiento.cc_movimiento = centro_costo.id_centro_costo
			)
			as 'nombre_cc_movimiento',
			(
				select
				concat
				(
					nro_serie_equipo,'<br>',marca_equipo,' ',modelo_equipo
				)
				from equipo
				where
				equipo.id_equipo = movimiento.equipo_movimiento
			)
			as 'bd_equipo_movimiento',
			equipo_movimiento,
			`observacion_movimiento`,
			creador_movimiento,
			(
				select
        		username
			    from
        		`user`
    			where
        		creador_movimiento = id_user
			)
			as 'nombre_creador_movimiento',
			date_format(fecha_movimiento, '%d/%m/%Y %H:%i')
			as fecha_movimiento_formateada
			from `movimiento` where `estado_movimiento` = '1'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}
	
	public function listar_movimiento_por_id_sql($id)
	{		
		$query =
		"
			select
			`id_movimiento`,
			(
				select
				tipo_movimiento.tipo_movimiento 
				from tipo_movimiento
				where 
				movimiento.id_tipo_movimiento = tipo_movimiento.id_movimiento
			)
			as 'nombre_tipo_movimiento',
			case when length(`encargado_movimiento`) = 0 then 'No aplica'
			else `encargado_movimiento`
			end as 'encargado_movimiento',
			ifnull(
			(
				select
				concat 
				(
					nombre_encargado,' ',apellido_encargado
				)
				from encargado
				where
				encargado.rut_encargado = movimiento.encargado_movimiento
			)
			, 'No aplica')
			as 'nombre_encargado_movimiento',
			
			(
				select b.nombre_categoria
				from `equipo` a, `categoria` b
				where id_equipo = equipo_movimiento
				and a.id_categoria_equipo = b.id_categoria
			)
			as 'nombre_categoria_equipo',
			(
				select 
				nombre_centro_costo
				from centro_costo
				where
				movimiento.cc_movimiento = centro_costo.id_centro_costo
			)
			as 'nombre_cc_movimiento',
			(
				select
					nro_serie_equipo
				from equipo
				where
				equipo.id_equipo = movimiento.equipo_movimiento
			)
			as 'nro_serie_equipo',
			(
				select
					marca_equipo
				from equipo
				where
				equipo.id_equipo = movimiento.equipo_movimiento
			)
			as 'marca_equipo',
			(
				select
					modelo_equipo
				from equipo
				where
				equipo.id_equipo = movimiento.equipo_movimiento
			)
			as 'modelo_equipo',
			(
				select
				accesorio_equipo
				from equipo
				where
				equipo.id_equipo = movimiento.equipo_movimiento
			)
			as 'accesorio_equipo',
			
			equipo_movimiento,
			`observacion_movimiento`,
			creador_movimiento,
			(
				select
        		username
			    from
        		`user`
    			where
        		creador_movimiento = id_user
			)
			as 'nombre_creador_movimiento',
			date_format(fecha_movimiento, '%d de %M de %Y')
			as fecha_movimiento_formateada
			from `movimiento` 
			where id_movimiento = ".$id."
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	//equipo
	public function listar_equipos_sin_asignar_sql()
	{
		$query =
		"
			select
			id_equipo,
			nro_serie_equipo,
			modelo_equipo,
			marca_equipo,
			id_categoria_equipo,
			(
				select categoria.nombre_categoria
				from categoria
				where categoria.id_categoria = equipo.id_categoria_equipo
			) 
			as 'nombre_categoria'
			from equipo
			where
			estado_equipo = '1'
			and 0 = 
			(
				select count(*) from movimiento 
				where equipo_movimiento = id_equipo
			)
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function listar_tabla_equipo_sql()
	{
		$query =
		"
			select
			id_equipo,
			nro_serie_equipo,
			modelo_equipo,
			case
			when imei_equipo is null then 'No aplica'
			when imei_equipo = '' then 'No aplica'
			else imei_equipo
			end imei_equipo,
			case
			when sistema_operativo_equipo is null then 'No aplica'
			when sistema_operativo_equipo = '' then 'No aplica'
			else sistema_operativo_equipo
			end so_equipo,
			sistema_operativo_equipo,
			date_format(fecha_adquisición_equipo, '%d/%m/%Y')
			as fecha_adquisición_equipo_formateada,
			marca_equipo,
			id_categoria_equipo,
			(
				select categoria.nombre_categoria
				FROM categoria
				WHERE categoria.id_categoria = equipo.id_categoria_equipo
			) 
			as 'nombre_categoria',
			accesorio_equipo, (
				select
				case 
				when count(*) = 0 then 'No'
				else 'Si'
				end
				from movimiento 
				where equipo_movimiento = id_equipo
			) asignado
			from equipo
			where
			estado_equipo = '1'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function listar_adjunto_sql($id)
	{
		$query =
		"
			select 
			id_movimiento, 
			id_adjunto, 
			nombre, 
			tipo,
			fecha,
			peso, 
			path
			from
			movimiento_adjunto
			where
			id_movimiento = ".$id."
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function validar_equipo_sql($nro_serie)
	{
		$query =
		"
			select 
			case when count(*) > 0 
			then 1 else 0 end existe
			from `equipo`
			where
			nro_serie_equipo = '".$nro_serie."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['existe'];
	}

	public function guardar_equipo_sql($bd_nro_serie_equipo,$bd_marca_equipo,$bd_modelo_equipo,$bd_id_categoria_equipo,$bd_imei_equipo,$bd_so_equipo,$bd_fecha_adquisición_equipo,$bd_accesorio_equipo)
	{
		$query =
		"
			insert into `equipo`
			(
				`nro_serie_equipo`,
				`imei_equipo`,
				`sistema_operativo_equipo`,
				`fecha_adquisición_equipo`,
				`modelo_equipo`,
				`marca_equipo`,
				`id_categoria_equipo`,
				`accesorio_equipo`,
				`estado_equipo`
			) 
			values
			(
			'".$bd_nro_serie_equipo."',
			'".$bd_imei_equipo."',
			'".$bd_so_equipo."',
			str_to_date('".$bd_fecha_adquisición_equipo."' ,'%d/%m/%Y'),
			'".$bd_modelo_equipo."',
			'".$bd_marca_equipo."',
			'".$bd_id_categoria_equipo."',
			'".$bd_accesorio_equipo."',
			'1'
			)
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function editar_equipo_sql($id,$bd_nro_serie_equipo,$bd_marca_equipo,$bd_modelo_equipo,$bd_id_categoria_equipo,$bd_imei_equipo,$bd_so_equipo,$bd_fecha_adquisición_equipo,$bd_accesorio_equipo)
	{
		$query =
		"
			update `equipo`
			set
			`nro_serie_equipo` 					= '".$bd_nro_serie_equipo."',
			`modelo_equipo` 					= '".$bd_modelo_equipo."',
			`imei_equipo` 						='".$bd_imei_equipo."',
			`sistema_operativo_equipo` 			='".$bd_so_equipo."',
			`fecha_adquisición_equipo` 			= str_to_date('".$bd_fecha_adquisición_equipo."' ,'%d/%m/%Y'),
			`marca_equipo` 						= '".$bd_marca_equipo."',
			`id_categoria_equipo` 				= '".$bd_id_categoria_equipo."',
			`accesorio_equipo` 					= '".$bd_accesorio_equipo."'
			where 
	 		`id_equipo` = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function eliminar_equipo_sql($id)
	{
		$query = 
		"
			update `equipo`
			set
			`estado_equipo` = '0'
			where 
			`id_equipo` = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	//categoria
	
	public function listar_categoria_sql()
	{
		$query =
		"
			select
			id_categoria,
			nombre_categoria
			from categoria
			where
			estado_categoria = '1'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function validar_categoria_sql($p_nombre_validar)
	{
		$query =
		"
			select 
			case when count(*) > 0 
			then 1 else 0 end existe
			from `categoria`
			where
			nombre_categoria = '".$p_nombre_validar."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['existe'];
	}

	public function guardar_categoria_sql($p_nombre)
	{
		$query =
		"
			insert into `categoria`
			(
				`nombre_categoria`,
				`estado_categoria`
			) 
			values 
			('".$p_nombre."','1')
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function editar_categoria_sql($id, $nombre_cat)
	{
		$query =
		"
			update `categoria`
			set
			`nombre_categoria`='".$nombre_cat."'
			where 
			id_categoria = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function eliminar_categoria_sql($id)
	{
		$query = 
		"
			update `categoria`
			set
			`estado_categoria` = '0'
			where 
			`id_categoria` = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	//encargado
	
	public function eliminar_encargado_sql($id)
	{
		$query = 
		"
			update `encargado`
			set 
			`estado_encargado` = '0'
			where
			`rut_encargado ` = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function editar_encargado_sql($id,$rut,$nombre,$apellido)
	{
		$query = 
		"
			update `encargado`
			set
			`rut_encargado` = '".$rut."',
			`nombre_encargado` = '".$nombre."',
			`apellido_encargado` = '".$apellido."'
			where
			`rut_encargado` = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function listar_encargado_sql()
	{
		$query =
		"
			select
			rut_encargado,
			nombre_encargado, 
			apellido_encargado,
			(
			select
				count(*)
				from movimiento
				where encargado_movimiento = rut_encargado
				and id_tipo_movimiento = 1
			) asignaciones
			from encargado
			where
			estado_encargado = '1'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function guardar_nuevo_encargado_sql($p_rut, $p_nombre_encargado, $p_apellido_encargado)
	{
		$query =
		"
			insert into `encargado`
			(
			`rut_encargado`,
			`nombre_encargado`, 
			`apellido_encargado`,
			`estado_encargado`
			)  
			values 
			(
			'".$p_rut."',
			'".$p_nombre_encargado."',
			'".$p_apellido_encargado."',
			'1'
			)
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function validar_nuevo_encargado_sql($p_rut_validar)
	{
		$query =
		"
			select 
			case when count(*) > 0 
			then 1 else 0 end existe
			from `encargado`
			where
			rut_encargado = '".$p_rut_validar."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['existe'];
	}

	//centro costos

	public function eliminar_cc_sql($id)
	{
		$query =
		"
			update centro_costo
			set
			estado_cc='0'
			where
			id_centro_costo = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function editar_cc_sql($id, $nombre)
	{
		$query =
		"
			update `centro_costo`
			set
			`nombre_centro_costo`='".$nombre."'
			where 
			id_centro_costo = '".$id."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function listar_centro_costo_sql()
	{
		$query =
		"
			select
			id_centro_costo,
			nombre_centro_costo
			from centro_costo
			where
			estado_cc = '1'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function guardar_centro_costos_sql($p_nombre)
	{
		$query =
		"
			insert into
			`centro_costo`
			(`nombre_centro_costo`,`estado_cc`) 
			VALUES 
			('".$p_nombre."',1)
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function validar_centro_costos_sql ($p_cc_validar)
	{
		$query =
		"
			select 
			case when count(*) > 0 
			then 1 else 0 end existe
			from `centro_costo` where nombre_centro_costo = '".$p_cc_validar."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['existe'];
	}

	//tipo movimiento

	public function listar_tipo_movimiento_sql()
	{
		$query =
		"
			select
			`id_movimiento`,
			`tipo_movimiento`
			from
			`tipo_movimiento`;
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	//otros

	public function predio_nombre($p_id_centro_costo){
		$query =
		"
			select initcap(nombre) nombre
			from h_predio
			where id_centro_costo = '".$p_id_centro_costo."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['nombre'];
	}

	public function predio_get(){
		$query =
		"
			select
				id_centro_costo,
				codigo,
				initcap(nombre) nombre,
				descripcion
			from h_predio
			where id_centro_costo != 10
			order by id_predio
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function informe_get($p_id_predio){
		$query =
		"
			select
				id_informe,
				titulo,
				(select count(*) from api_informe_datos b where b.id_informe=a.id_informe and b.es_cabecera=0)cantidad,
				!isnull(codigo_camas) mostrar_plano
			from api_informe a
			where estado = 1
			#and id_predio = ifnull('".$p_id_predio."',id_predio)
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function predio_plano_get($p_id_predio){
		$query =
		"
			select plano_svg
			from h_predio_plano
			where id_predio = '".$p_id_predio."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['plano_svg'];
	}

	public function cama_get($p_id_predio){
		$query =
		"
			select
				id_cama,
				id_sector,
				(select initcap(descripcion) from h_sector b where b.id_sector=a.id_sector)sector,
				nombre,
				superficie,
				variedad,
				date_format(fecha_plantacion,'%d/%m/%Y')fecha_plantacion
			from h_cama a
			where id_predio = '".$p_id_predio."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function informe_datos_cantidad_columnas($p_id_informe){
		$query =
		"
			select cantidad_columnas
			from api_informe
			where id_informe = '".$p_id_informe."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado[0]['cantidad_columnas'];
	}

	public function informe_cabecera($p_id_informe, $p_columnas){
		$query =
		"
			select ".$p_columnas."
			from api_informe_datos
			where id_informe = '".$p_id_informe."'
			and es_cabecera = 1
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function informe_datos($p_id_informe, $p_columnas, $p_id_predio){
		$query =
		"
			select ".$p_columnas."
			from api_informe_datos
			where id_informe = '".$p_id_informe."'
			and es_cabecera = 0
			and id_predio = '".$p_id_predio."'
			order by orden
			limit 50
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function datos_asociadas($p_id_informe){
		$query =
		"
			select codigo_camas, posicion_clave
			from api_informe
			where id_informe = '".$p_id_informe."'
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}

	public function ejecutar_consulta($p_query){
		$query = $p_query;
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}
	
	public function inet_tarjeta_bodega_temp($p_predio,$p_producto_codigo,$p_producto_nombre,$p_fecha,$p_tipo_operacion,$p_documento,$p_referencia,$p_entradas,$p_salidas,$p_saldo){
		$query =
		"
			insert into inet_tarjeta_bodega_temp
			(
				predio,
				producto_codigo,
				producto_nombre,
				fecha,
				tipo_operacion,
				documento,
				referencia,
				entradas,
				salidas,
				saldo
			)
			values
			(
				'".$p_predio."',
				'".$p_producto_codigo."',
				'".$p_producto_nombre."',
				'".$p_fecha."',
				'".$p_tipo_operacion."',
				'".$p_documento."',
				'".$p_referencia."',
				'".$p_entradas."',
				'".$p_salidas."',
				'".$p_saldo."'
			)
		";
		$resultado = $this->conn->consulta($query);
		return $resultado;
	}
}