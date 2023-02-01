<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once dirname(__DIR__).'/datos/base_sql.php';
$obj = new base_sql();

$id=$_GET['id'];
$adjuntos   = array($obj->listar_adjunto_sql($id));
$adjuntos =   $adjuntos[0];
$datos	    = $obj->listar_movimiento_por_id_sql($id);

$adjunto_html = '';
    for ($i = 0; $i < count($adjuntos); $i++)
      {
        $adjunto_html .=
        "<a target='_blank' style='heigth:2000px; z-index:444; position:relative;' href='http://192.168.100.110/SisInventario/adjuntos/".$adjuntos[$i]['nombre']."'>
            <object
            type   = '".$adjuntos[$i]['tipo']."'
            data   = 'http://192.168.100.110/SisInventario/adjuntos/".$adjuntos[$i]['nombre']."'
            width  = '200'
            height = '200'>
            </object>
        </a>";
      }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="https://cranchile.com/cch_/wp-content/uploads/2016/02/cropped-cran-2-32x32.jpg">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/SisInventario/lib/bootstrap/css/bootstrap.min.css">
    <title>Visor QR</title>
    <style type="text/css">
        *{
           font-size: 12px;
           line-height: 1,6;
        }
        .label.badge-pill
        {
			border-radius:1em;
			margin:0 0.25em;
		}
		.texto_izquierda
        {
            float:right;
        }
        .hide-scrollbar::-webkit-scrollbar {
	        display: none;
	    }

	    .data-list {
	        height: 50px;
	        width: 200px;
	        overflow-y: hidden;
	    }
    </style>
</head>
<body style="background-color:#EAEAEA;">
    <div class="container" style="border:2px solid gray; background-color:white; margin-top: 1%;">
        <img src="/SisInventario/img/Cran_logo.png" width="160px" height="160px" class="img-responsive pull-right" style="margin-top: 1%">
        <h5 style="text-align:left; font-weight: bold; margin-bottom: 4%; margin-top: 2%;">
        SISTEMA DE GESTIÓN E INVENTARIO
        <br> CONTROL DE EQUIPAMIENTO - ASIGNACIÓN / DEVOLUCIÓN / BAJA AAFF
        <br> AGRÍCOLA CRAN CHILE SPA
        <br> UNIDAD DE INFORMÁTICA
        </h5>
        <hr style="height:2px; margin-top: 5%; color:gray; background-color:gray">
            <div class="col-md-12">
                <div class="pull-right">
                <label>FECHA</label>
                <br>
                <label><?php echo $datos[0]['fecha_movimiento_formateada'];?></label>
                </div>
                <div class="container"><label>NUMERO DE MOVIMIENTO:   <?php echo $datos[0]['id_movimiento'];?></label></div>
                <label style="margin-top:1%; margin-left:1%; margin-right:1%;">CONTROL DE EQUIPAMIENTO</label>
                <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                    <label style="margin-left:1%; margin-top: 2px;">TIPO DE MOVIMIENTO: <?php echo $datos[0]['nombre_tipo_movimiento'];?></label>
                </div>
                <label style="margin-top:1%; margin-left:1%; margin-right:1%;">ANTECEDENTES DEL USUARIO</label>
                <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                    <label style="margin-left:1%; margin-top: 2px;">RUT ENCARGADO: <?php echo $datos[0]['encargado_movimiento'];?></label>
                </div>
                <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                    <label style="margin-left:1%; margin-top: 2px;">NOMBRE ENCARGADO: <?php echo $datos[0]['nombre_encargado_movimiento'];?></label>
                </div>
                <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                    <label style="margin-left:1%; margin-top: 2px;">CC: <?php echo $datos[0]['nombre_cc_movimiento'];?></label>
                </div>
                <label style="margin-top:1%; margin-left:1%; margin-right:1%;">EQUIPAMIENTO ASIGNADO</label>
                <br>
                <table width="98%" border="1" style="margin-bottom:1%; margin-left:1%; margin-right:1%;">
                <tr>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;">CATEGORIA</label>
                    </td>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;">NUMERO SERIE</label>
                    </td>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;">MARCA</label>
                    </td>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;">MODELO</label>
                    </td>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;">ACCESORIOS</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;"><?php echo $datos[0]['nombre_categoria_equipo'];?></label>
                    </td>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;"><?php echo $datos[0]['nro_serie_equipo'];?></label>
                    </td>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;"><?php echo $datos[0]['marca_equipo'];?></label>
                    </td>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;"><?php echo $datos[0]['modelo_equipo'];?></label>
                    </td>
                    <td>
                        <label style="margin-left:1%; margin-top: 2px;"><?php echo $datos[0]['accesorio_equipo'];?></label>
                    </td>
                </tr>
                </table>
                <div style="margin:1%; border:2px solid gray;">
                    <?php echo $adjunto_html ?>
                </div>
                <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                    <label style="margin-left:1%; margin-top: 2px;">REGISTRADO POR: <?php echo $datos[0]['nombre_creador_movimiento'];?></label>
                </div>
                <label style="margin-top:1%; margin-left:1%; margin-right:1%;">OBSERVACIONES: </label>
                <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%; height:100px">
                    <label style="margin-left:1%; margin-top: 2px;"><?php echo $datos[0]['observacion_movimiento'];?></label>
                </div>
            </div>
    </div>
</body>
</html>