<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
setlocale(LC_ALL, 'es_ES');
require '../lib/PHPMailer/PHPMailerAutoload.php';
include_once dirname(__DIR__).'/datos/base_sql.php';
$data 		= json_decode(file_get_contents('php://input'), true);
$obj 		= new base_sql();
if(isset($_GET['id']))
{
	$id 	 = $_GET['id'];
	$id_tipo = $_GET['id_tipo'];
}
else
{
	$id 		= $data['id'];
	$id_tipo 	= $data['id_tipo'];
}
//$id 		= 1;
$datos	    		= $obj->listar_movimiento_por_id_sql($id);
$encargado			= $datos[0]['nombre_encargado_movimiento'];
//$id_tipo_movimiento =
echo $id_tipo;
$mensaje 	= '';
$fecha	 	= 
'
<table class="align-right">
	<tr>
		<td>
			<label>FECHA</label>
			<br>
			<label>'.$datos[0]['fecha_movimiento_formateada'].'</label>
		</td>
	</tr>
</table>
';
$qr = 'http://192.168.100.110/SisInventario/img/'.$id.'.png';
$mensaje_tabla_html =
'
<table border="1">
	<tr>
		<td>
			<label>NUMERO DE MOVIMIENTO: '.$datos[0]['id_movimiento'].'</label>
		</td>
	</tr>
	<tr>
		<td>
			<label>TIPO DE MOVIMIENTO: '. $datos[0]['nombre_tipo_movimiento'].'</label>
		</td>
	</tr>
	<tr>
		<td>
			<label>RUT ENCARGADO: '. $datos[0]['encargado_movimiento'].'</label>
		</td>
	</tr>
	<tr>
		<td>
			<label>NOMBRE ENCARGADO: '. $datos[0]['nombre_encargado_movimiento'].'</label>
		</td>
	</tr>
	<tr>
		<td>
			<label>CC: '. $datos[0]['nombre_cc_movimiento'].'</label>
		</td>
	</tr>
</table>
<table border="1">
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
            <label style="margin-left:1%; margin-top: 2px;">'.$datos[0]['nombre_categoria_equipo'].'</label>
        </td>
        <td>
            <label style="margin-left:1%; margin-top: 2px;">'.$datos[0]['nro_serie_equipo'].'</label>
        </td>
        <td>
            <label style="margin-left:1%; margin-top: 2px;">'.$datos[0]['marca_equipo'].'</label>
        </td>
        <td>
            <label style="margin-left:1%; margin-top: 2px;">'.$datos[0]['modelo_equipo'].'</label>
        </td>
        <td>
            <label style="margin-left:1%; margin-top: 2px;">'.$datos[0]['accesorio_equipo'].'</label>
        </td>
    </tr>
</table>

';

$mail = new PHPMailer;
$mail->isSendmail();
$mail->setFrom('noresponder@cranchile.pro', 'TI');
$mail->Subject = 'El asunto';
$mail->IsHTML(true);

$variable = 'se ha realiza la solicitd con exito nro.';

$mensaje_html =
'
	<!doctype html>
	<html>
	  <head>
	    <meta name="viewport" content="width=device-width" />
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	    <title>La unidad de informatica le informa</title>
	    <style>
	      /* -------------------------------------
	          GLOBAL RESETS
	      ------------------------------------- */

	      /*All the styling goes here*/

	      img {
	        border: none;
	        -ms-interpolation-mode: bicubic;
	        max-width: 100%;
	      }

	      body {
	        background-color: #f6f6f6;
	        font-family: sans-serif;
	        -webkit-font-smoothing: antialiased;
	        font-size: 14px;
	        line-height: 1.4;
	        margin: 0;
	        padding: 0;
	        -ms-text-size-adjust: 100%;
	        -webkit-text-size-adjust: 100%;
	      }

	      table {
	        border-collapse: separate;
	        mso-table-lspace: 0pt;
	        mso-table-rspace: 0pt;
	        width: 100%; }
	        table td {
	          font-family: sans-serif;
	          font-size: 14px;
	          vertical-align: top;
	      }

	      /* -------------------------------------
	          BODY & CONTAINER
	      ------------------------------------- */

	      .body {
	        background-color: #f6f6f6;
	        width: 100%;
	      }

	      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
	      .container {
	        display: block;
	        margin: 0 auto !important;
	        /* makes it centered */
	        max-width: 580px;
	        padding: 10px;
	        width: 580px;
	      }

	      /* This should also be a block element, so that it will fill 100% of the .container */
	      .content {
	        box-sizing: border-box;
	        display: block;
	        margin: 0 auto;
	        max-width: 580px;
	        padding: 10px;
	      }

	      /* -------------------------------------
	          HEADER, FOOTER, MAIN
	      ------------------------------------- */
	      .main {
	        background: #ffffff;
	        border-radius: 3px;
	        width: 100%;
	      }

	      .wrapper {
	        box-sizing: border-box;
	        padding: 20px;
	      }

	      .content-block {
	        padding-bottom: 10px;
	        padding-top: 10px;
	      }

	      .footer {
	        clear: both;
	        margin-top: 10px;
	        text-align: center;
	        width: 100%;
	      }
	        .footer td,
	        .footer p,
	        .footer span,
	        .footer a {
	          color: #999999;
	          font-size: 9px;
	          text-align: center;
	      }

	      /* -------------------------------------
	          TYPOGRAPHY
	      ------------------------------------- */
	      h1,
	      h2,
	      h3,
	      h4 {
	        color: #000000;
	        font-family: sans-serif;
	        font-weight: 400;
	        line-height: 1.4;
	        margin: 0;
	        margin-bottom: 30px;
	      }

	      h1 {
	        font-size: 35px;
	        font-weight: 300;
	        text-align: center;
	        text-transform: capitalize;
	      }

	      p,
	      ul,
	      ol {
	        font-family: sans-serif;
	        font-size: 14px;
	        font-weight: normal;
	        margin: 0;
	        margin-bottom: 15px;
	      }
	        p li,
	        ul li,
	        ol li {
	          list-style-position: inside;
	          margin-left: 5px;
	      }

	      a {
	        color: #3498db;
	        text-decoration: underline;
	      }

	      /* -------------------------------------
	          BUTTONS
	      ------------------------------------- */
	      .btn {
	        box-sizing: border-box;
	        width: 100%; }
	        .btn > tbody > tr > td {
	          padding-bottom: 15px; }
	        .btn table {
	          width: auto;
	      }
	        .btn table td {
	          background-color: #ffffff;
	          border-radius: 5px;
	          text-align: center;
	      }
	        .btn a {
	          background-color: #ffffff;
	          border: solid 1px #3498db;
	          border-radius: 5px;
	          box-sizing: border-box;
	          color: #3498db;
	          cursor: pointer;
	          display: inline-block;
	          font-size: 14px;
	          font-weight: bold;
	          margin: 0;
	          padding: 12px 25px;
	          text-decoration: none;
	          text-transform: capitalize;
	      }

	      .btn-primary table td {
	        background-color: #3498db;
	      }

	      .btn-primary a {
	        background-color: #3498db;
	        border-color: #3498db;
	        color: #ffffff;
	      }

	      /* -------------------------------------
	          OTHER STYLES THAT MIGHT BE USEFUL
	      ------------------------------------- */
	      .last {
	        margin-bottom: 0;
	      }

	      .first {
	        margin-top: 0;
	      }

	      .align-center {
	        text-align: center;
	      }

	      .align-right {
	        text-align: right;
	      }

	      .align-left {
	        text-align: left;
	      }

	      .clear {
	        clear: both;
	      }

	      .mt0 {
	        margin-top: 0;
	      }

	      .mb0 {
	        margin-bottom: 0;
	      }

	      .preheader {
	        color: transparent;
	        display: none;
	        height: 0;
	        max-height: 0;
	        max-width: 0;
	        opacity: 0;
	        overflow: hidden;
	        mso-hide: all;
	        visibility: hidden;
	        width: 0;
	      }

	      .powered-by a {
	        text-decoration: none;
	      }

	      hr {
	        border: 0;
	        border-bottom: 1px solid #f6f6f6;
	        margin: 20px 0;
	      }

	      /* -------------------------------------
	          RESPONSIVE AND MOBILE FRIENDLY STYLES
	      ------------------------------------- */
	      @media only screen and (max-width: 620px) {
	        table[class=body] h1 {
	          font-size: 28px !important;
	          margin-bottom: 10px !important;
	        }
	        table[class=body] p,
	        table[class=body] ul,
	        table[class=body] ol,
	        table[class=body] td,
	        table[class=body] span,
	        table[class=body] a {
	          font-size: 16px !important;
	        }
	        table[class=body] .wrapper,
	        table[class=body] .article {
	          padding: 10px !important;
	        }
	        table[class=body] .content {
	          padding: 0 !important;
	        }
	        table[class=body] .container {
	          padding: 0 !important;
	          width: 100% !important;
	        }
	        table[class=body] .main {
	          border-left-width: 0 !important;
	          border-radius: 0 !important;
	          border-right-width: 0 !important;
	        }
	        table[class=body] .btn table {
	          width: 100% !important;
	        }
	        table[class=body] .btn a {
	          width: 100% !important;
	        }
	        table[class=body] .img-responsive {
	          height: auto !important;
	          max-width: 100% !important;
	          width: auto !important;
	        }
	      }

	      /* -------------------------------------
	          PRESERVE THESE STYLES IN THE HEAD
	      ------------------------------------- */
	      @media all {
	        .ExternalClass {
	          width: 100%;
	        }
	        .ExternalClass,
	        .ExternalClass p,
	        .ExternalClass span,
	        .ExternalClass font,
	        .ExternalClass td,
	        .ExternalClass div {
	          line-height: 100%;
	        }
	        .apple-link a {
	          color: inherit !important;
	          font-family: inherit !important;
	          font-size: inherit !important;
	          font-weight: inherit !important;
	          line-height: inherit !important;
	          text-decoration: none !important;
	        }
	        #MessageViewBody a {
	          color: inherit;
	          text-decoration: none;
	          font-size: inherit;
	          font-family: inherit;
	          font-weight: inherit;
	          line-height: inherit;
	        }
	        .btn-primary table td:hover {
	          background-color: #34495e !important;
	        }
	        .btn-primary a:hover {
	          background-color: #34495e !important;
	          border-color: #34495e !important;
	        }
	      }

	    </style>
	  </head>
	  <body>
	    <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
	    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
	      <tr>
	        <td>&nbsp;</td>
	        <td class="container">
	          <div class="content">

	            <!-- START CENTERED WHITE CONTAINER -->
	            <table role="presentation" class="main">

	              <!-- START MAIN CONTENT AREA -->
	              <tr>
	                <td class="wrapper">
	                  <center>
	                  	<img src="https://cranchile.pro/ticket/presentacion/img/logoCranChile.jpg"  width="126" height="85">
	                  </center>
	                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
	                    <tr>
	                      <td>
						  '.$fecha.'
	                        <label>
	                        	&nbsp;&nbsp;&nbsp;&nbsp;Estimado '.$encargado.',
	                        </label>
							<br>
							<label>
								&nbsp;&nbsp;&nbsp;&nbsp;Se le informa lo siguiente:
							</label>
	                        <table role="presentation" border="0" cellpadding="0" cellspacing="15">
	                          <tbody>
	                            <tr>
	                              <td>
	                                <table role="presentation" border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse">
	                                  <tbody>
	                                  	<p>
	                                  		'.$mensaje_tabla_html.'
	                                  	</p>
										<label>Si desea ver más información, escanee el siguiente QR</label>
										<p class="align-center">
											<img src="'.$qr.'" width="160px" height="160px">
										</p>
										<!--
										<a href="'.$qr.'" target="_blank">Revise mas detalles aqui</a>
										-->
	                                  </tbody>
	                                </table>
	                              </td>
	                            </tr>
	                          </tbody>
	                        </table>
	                      </td>
	                    </tr>
	                  </table>
	                </td>
	              </tr>

	            <!-- END MAIN CONTENT AREA -->
	            </table>
	            <!-- END CENTERED WHITE CONTAINER -->

	            <!-- START FOOTER -->
	            <div class="footer">
	              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
	                <tr>
	                  <td >
	                    <span class="apple-link">Agrícola Cran Chile SpA.</span>
	                  </td>
	                </tr>
	                <tr>
	                  <td class="content-block powered-by">
	                  </td>
	                </tr>
	              </table>
	            </div>
	            <!-- END FOOTER -->

	          </div>
	        </td>
	        <td>&nbsp;</td>
	      </tr>
	    </table>
	  </body>
	</html>
';

$mail->msgHTML(html_entity_decode($mensaje_html));

echo $mensaje_html;
//die('die!');

	$correos = array
	(
		array('email' => 'nkomb860@gmail.com'),
		//array('email' => 'vbascunan@cranchile.com'),
	);



	$datos_envio = array();
	for ($j=0; $j < count($correos); $j++) {
		$mail->AddAddress($correos[$j]['email']);

		$res_envio = '';
		if (!$mail->send()) {
		    echo $correos[$j]['email']." Error: " . $mail->ErrorInfo;
		} else {
		    echo "Enviado a ".$correos[$j]['email'];
		}

		$mail->ClearAddresses();
	}