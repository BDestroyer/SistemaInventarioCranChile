<?php
	session_start();
	if( !isset( $_SESSION["id_user"] ) ){
		header("Location: ../");
	}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>CRAN CHILE SISTEMA DE GESTION E INVENTARIO</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="/SisInventario/lib/dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="/SisInventario/lib/dist/css/skins/_all-skins.min.css">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="/SisInventario/lib/bootstrap/css/bootstrap.min.css">
	<!-- css solo orden
    <link rel="stylesheet" href="/SisInventario/lib/dist/css/orden.css">-->
    <style type="text/css">
        * {
           font-size: 12px;
           line-height: 1,6;
        }
        .label.badge-pill {
			border-radius:1em;
			margin:0 0.25em;
		}
		.texto_izquierda { float:right }
		.hide-scrollbar::-webkit-scrollbar {
	        display: none;
	    }

	    .data-list {
	        height: 300px;
	        width: auto;
	        overflow-x: hidden;
	    }
    </style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition skin-blue-light sidebar-mini ">
    <div id="app" class="wrapper">
      	<header class="main-header">
			<a href="#" class="logo">
				<span class="logo-mini">
					<b>C</b>C
				</span>
				<span class="logo-lg">
					CRAN<b>Chile</b>
				</span>
			</a>
			<nav class="navbar navbar-static-top" role="navigation">
				<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
					<span class="sr-only">
						Toggle navigation
					</span>
				</a>
				<div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
					  	<li class="dropdown user user-menu">
					    	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						      	<img src="/SisInventario/img/logo2.jpg" class="user-image" alt="User Image">
						      	<span class="hidden-xs">
						      		{{username}}
						      	</span>
					    	</a>
						    <ul class="dropdown-menu">
						      	<li class="user-header">
						        	<img src="/SisInventario/img/logo2.jpg" class="img-circle" alt="User Image">
						        	<p>
						          		{{email}}
						        	</p>
						      	</li>
						      	<li class="user-footer">
						        	<div class="pull-right">
						          		<a href="#" class="btn btn-default btn-flat" v-on:click="salir">Salir</a>
						        	</div>
						      	</li>
						    </ul>
					  	</li>
					</ul>
					  	</li>
					</ul>
				</div>
			</nav>
      	</header>
      	<aside class="main-sidebar">
	        <section class="sidebar">
	          	<div class="user-panel">
		            <div class="pull-left image">
			              	<img src="https://cranchile.pro/protocolos1/storage/images/logo.jpg" class="img-circle" alt="User Image">
			        </div>
		            <div class="pull-left info">
			            <p>
			            	{{name}} {{lastname}}
			            </p>
		            </div>
		        </div>
	          	<ul class="sidebar-menu">
	            	<li class="header">MENÚ PRINCIPAL</li>
	            	<li class="treeview">
						<a href="#" v-on:click="visible_modulos('componente1')">
							<i class="fa fa-list"></i>
							<span>Ver movimientos</span>
						</a>
					</li>
					<li class="treeview">
						<a href="#" v-on:click="visible_modulos('componente2')">
							<i id="crear_nuevo_movimiento" class="fa fa-list"></i>
							<span>Crear nuevo movimiento</span>
						</a>
					</li>
					<li class="treeview">
						<a href="#" v-on:click="visible_modulos('componente3')">
							<i class="fa fa-list"></i>
							<span>Mantenedor categoria</span>
						</a>
					</li>
					<li class="treeview">
						<a href="#" v-on:click="visible_modulos('componente4')">
							<i class="fa fa-list"></i>
							<span>Mantenedor encargado</span>
						</a>
					</li>
					<li class="treeview">
						<a href="#" v-on:click="visible_modulos('componente5')">
							<i class="fa fa-list"></i>
							<span>Mantenedor equipo</span>
						</a>
					</li>
					<li class="treeview">
						<a href="#" v-on:click="visible_modulos('componente6')">
							<i class="fa fa-list"></i>
							<span>Mantenedor centro costos</span>
						</a>
					</li>
	          	</ul>
	        </section>
      	</aside>
      	<div class="content-wrapper">
			<br>
      		<div v-if="visible_componente1" class="container">
				<componente_historico
					:id_user="id_user"
				>
				</componente_historico>
	        </div>
	        <div v-if="visible_componente2" class="container">
				<componente_documento
					:id_user="id_user"
					>
				</componente_documento>
			</div>
	        <div v-if="visible_componente3" class="container">
                <componente_categoria></componente_categoria>
            </div>
	        <div v-if="visible_componente4" class="container">
				<componente_encargado></componente_encargado>
	        </div>
			<div v-if="visible_componente5" class="container">
				<componente_equipo></componente_equipo>
	        </div>
			<div>
				<div v-if="visible_componente6" class="container">
					<componente_cc></componente_cc>
				</div>
			</div>
      	</div>
      	<footer class="main-footer">
	        <div class="pull-right hidden-xs">
	          	<b>Version</b> 1.0
	        </div>
	        <strong>
	        	CranChile &copy; Inventario - Control de equipamiento
	        </strong>
	    </footer>
	    <!--Modal user eliminar ini-->
			<div id="modal_ejemplo" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">
								titulo modal
							</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
                        	<p>es un modal</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Guardar</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						</div>
					</div>
				</div>
			</div>
		<!--Modal user eliminar fin-->
	    <!--<p><pre> {{$data}}</pre></p>-->
    </div>
    <script src="/SisInventario/lib/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <script src="/SisInventario/lib/bootstrap/js/bootstrap.js"></script>
    <script src="/SisInventario/lib/dist/js/app.min.js"></script>
    <!--jscolor-->
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js"></script>-->
    <!-- ChartJS 1.0.1 -->
    <!--<script src="/SisInventario/lib/plugins/chartjs/Chart.min.js"></script>-->
    <!--Datepicker ini 1.8.0-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/css/bootstrap-datepicker.min.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/js/bootstrap-datepicker.min.js"></script>
    <!--VUE-->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js" integrity="sha512-u9akINsQsAkG9xjc1cnGF4zw5TFDwkxuc9vUp5dltDWYCSmyd0meygbvgXrlc/z7/o4a19Fb5V0OUE58J7dcyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!--select2-->
    <!--
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	-->
    <!-- propias -->
	<script src="/SisInventario/js/componente_historico.js"></script>
    <script src="/SisInventario/js/componente_documento.js"></script>
    <script src="/SisInventario/js/componente_cc.js"></script>
	<script src="/SisInventario/js/componente_categoria.js"></script>
    <script src="/SisInventario/js/componente_encargado.js"></script>
	<script src="/SisInventario/js/componente_equipo.js"></script>
    <script src="/SisInventario/js/app_main.js"></script>
</body>
</html>