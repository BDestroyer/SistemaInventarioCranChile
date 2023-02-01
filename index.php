<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Login</title>
    <link rel="shortcut icon" href="https://cranchile.com/cch_/wp-content/uploads/2016/02/cropped-cran-2-32x32.jpg">
    <link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="lib/dist/css/AdminLTE.css" rel="stylesheet" type="text/css">
    <link href="lib/dist/css/skins/skin-blue-light.css" rel="stylesheet" type="text/css">
</head>
<body class="login-page">
	<div class="wrapper">
		<div class="login-box">
    		<div class="login-logo">
        		<a href="#">
        			CRAN
        			<b>
        				Chile
        			</b>
        		</a>
        	</div>
	    	<div class="login-box-body">
	        	<div id="app">
	          		<div class="form-group has-feedback">
	            		<input type="text" name="username" class="form-control" placeholder="Usuario" v-model="usuario">
	            		<span class="glyphicon glyphicon-user form-control-feedback"></span>
	          		</div>
	          		<div class="form-group has-feedback">
	            		<input type="password" name="password" class="form-control" placeholder="Contraseña" v-model="password" v-on:keyup.enter="login">
	            		<span class="glyphicon glyphicon-lock form-control-feedback"></span>
	          		</div>
	          		<div class="row">
	            		<div class="col-xs-12">
	              			<button type="submit" class="btn btn-primary btn-block btn-flat" v-on:click="login">Acceder</button>
	              			<p>
								{{mensaje_validando}}
							</p>
	            		</div>
	          		</div>
	        	</div>
	    	</div>
  		</div>
  		<div class="control-sidebar-bg" style="position: fixed; height: auto;">
	</div>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js" integrity="sha512-u9akINsQsAkG9xjc1cnGF4zw5TFDwkxuc9vUp5dltDWYCSmyd0meygbvgXrlc/z7/o4a19Fb5V0OUE58J7dcyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/SisInventario/js/app_main.js"></script>
</body>
</html>