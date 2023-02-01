Vue.component('componente_documento',
{
    props:['id_user'],
    data: function ()
    {
        return {
            user_id_tipo               : 0,
            user_rut_usuario           : 0,
            user_centro_costos         : 0,
            user_equipo                : 0,
            user_adjunto               : '',
            user_observacion           : '',
            tipo_movimiento:  [],
            cc:               [],
            equipo:           [],
            encargado:        [],
        }
    },
    mounted: function()
    {
        this.listar_tipo_movimiento();
        this.listar_encargado();
        this.listar_centro_costo();
        this.listar_equipos_sin_asignar();
	},
    methods:
    {
        reset: function ()
        {
            this.user_id_tipo                   =  0;
            this.user_rut_usuario               =  0;
            this.user_centro_costos             =  0;
            this.user_equipo                    =  0;
            this.user_adjunto                   = ''; 
            this.user_observacion               = '';
            this.$refs.archivos.files.length    = 0        
        },
        listar_encargado : function()
        {
            let post =
            {
                opcion : "listar_encargado",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                this.encargado = response.data;
            }
            );
        },
        listar_centro_costo : function()
        {
        	let post =
            {
                opcion : "listar_centro_costo",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                this.cc = response.data;
            }
            );
        },
        listar_equipos_sin_asignar : function()
        {
        	let post =
            {
                opcion : "listar_equipos_sin_asignar",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                this.equipo = response.data;
            }
            );
        },
        listar_tipo_movimiento : function()
        {
        	let post =
            {
                opcion : "listar_tipo_movimiento",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                this.tipo_movimiento = response.data;
            }
            );
        },
        notificar : function(a,b)
        {
            let post =
            {
                id           :   a,
                id_tipo      :   b,
            }
            axios.post("/SisInventario/vistas/test_envio_mail.php", post).then(response =>
            {
                window.open("/SisInventario/vistas/test_envio_mail.php?id="+a+'&id_tipo='+b);
            });
        },
        guardar: function()
        {
            if (this.user_id_tipo === 0)
            {
                alert("Debe seleccionar un tipo de documento!");
                return 0;
            }
            else
            {
                if(this.user_rut_usuario === 0)
                {
                    alert("Debe seleccionar un usuario antes de continuar!");
                    return 0;
                }
                else
                {
                    if(this.user_centro_costos === 0)
                    {
                        alert("Debe seleccionar un centro de costos!")
                        return 0;
                    }
                    else
                    {
                        if(this.user_equipo === 0)
                        {
                            alert("Debe seleccionar un equipo!")
                            return 0;
                        }
                        else
                        {
                            if(this.user_id_tipo === '2')
                            {
                                if(this.user_observacion.length === 0 && this.$refs.archivos.files.length === 0)
                                {
                                    alert('Al dar de baja un equipo, debe agregar una observación y debe incluir un archivo!'+this.$refs.archivos.files.length);
                                    return 0;
                                }
                                else
                                {
                                    alert(this.$refs.archivos.files.length);
                                    var formData = new FormData();
                                    for (var i = 0; i < this.$refs.archivos.files.length; i++) 
                                    {
                                        formData.append(i, this.$refs.archivos.files[i]);
                                    }
                                    formData.append('id_doc', 1);
                                    formData.append('user_id_tipo',this.user_id_tipo);
                                    formData.append('user_rut_usuario',this.user_rut_usuario);
                                    formData.append('user_centro_costos',this.user_centro_costos);
                                    formData.append('user_equipo',this.user_equipo);
                                    formData.append('user_observacion',this.user_observacion);
                                    formData.append('creador',this.id_user);
                                    axios.post('/SisInventario/datos/adjuntar_archivo.php',formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(response=> 
                                    {
                                        alert('Movimiento creado correctamente!')
                                        var id=response.data;
                                        this.notificar(id,this.user_id_tipo);
                                        this.listar_equipos_sin_asignar();
                                        this.reset();
                                    })
                                    .catch(function()
                                    {
                                        alert('Algo falló, contacte al administrador!!');
                                        this.listar_equipos_sin_asignar();
                                    });
                                }
                            }
                            else
                            {
                            var formData = new FormData();
                            for (var i = 0; i < this.$refs.archivos.files.length; i++) 
                            {
                                formData.append(i, this.$refs.archivos.files[i]);
                            }
                            formData.append('id_doc', 1);
                            formData.append('user_id_tipo',this.user_id_tipo);
                            formData.append('user_rut_usuario',this.user_rut_usuario);
                            formData.append('user_centro_costos',this.user_centro_costos);
                            formData.append('user_equipo',this.user_equipo);
                            formData.append('user_observacion',this.user_observacion);
                            formData.append('creador',this.id_user);
                            axios.post('/SisInventario/datos/adjuntar_archivo.php',formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(response=> 
                            {
                                alert('Movimiento creado correctamente!')
                                var id=response.data;
                                this.notificar(id,this.user_id_tipo);
                                this.listar_equipos_sin_asignar();
                                this.reset();
                            })
                            .catch(function()
                            {
                                alert('Algo falló, contacte al administrador!!');
                            });
                            }
                        }
                    }
                }
            
            }
        },
    },
    template:
    `
        <div class="container" style="border:2px solid gray; background-color:white;">
            <br>
            <img src="/SisInventario/img/Cran_logo.png" width="160px" height="160px" class="img-responsive pull-right">
            <h5 style="text-align:left; font-weight: bold">
            SISTEMA DE GESTIÓN E INVENTARIO
            <br>
            CONTROL DE EQUIPAMIENTO - ASIGNACIÓN / DEVOLUCIÓN / BAJA AAFF
            <br>
            AGRÍCOLA CRAN CHILE SPA
            <br>
            UNIDAD DE INFORMÁTICA
            </h5>
            <div id="app" class="text-center">
                <br>
                <hr style="height:2px; border-width:0; color:gray; background-color:gray">
                <div class="table-responsive; text-center">
                    <table class="table table-striped">
                        <tr>
                            <td class="form-control text-left" style="background-color:#ededed;">
                                <label> Seleccione un tipo de movimiento</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                    <select v-model="user_id_tipo" class="form-control">
                                    <option value="0">Seleccione...</option>
                                    <option v-for="reg in tipo_movimiento" :value="reg.id_movimiento">{{reg.tipo_movimiento}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="form-control text-left" style="background-color:#ededed;">
                                    <label>Seleccione un encargado</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select v-model="user_rut_usuario" class="form-control">
                                    <option value="0">Seleccione...</option>
                                    <option v-for="reg in encargado" :value="reg.rut_encargado">({{reg.rut_encargado}}) {{reg.nombre_encargado}} {{reg.apellido_encargado}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="form-control text-left" style="background-color:#ededed;">
                                <label>Seleccione un centro de costos</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select v-model="user_centro_costos" class="form-control">
                                <option value="0">Seleccione...</option>
                                <option v-for="reg in cc" :value="reg.id_centro_costo">{{reg.nombre_centro_costo}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="form-control text-left" style="background-color:#ededed;">
                                <label>Seleccione un equipo</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                    <select v-model="user_equipo" class="form-control">
                                    <option value="0">Seleccione...</option>
                                    <option v-for="reg in equipo" :value="reg.id_equipo">({{reg.nro_serie_equipo}}) {{reg.marca_equipo}} {{reg.modelo_equipo}} {{reg.nombre_categoria}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="form-control text-left" style="background-color:#ededed;">
                                <label>Adjunte</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input
                            type="file"
                            class="form-control"
                            id="archivos"
                            ref="archivos"
                            multiple="multiple"
                            accept="image/png, image/jpeg, application/pdf"
                            />
                            </td>
                        </tr>
                        <tr>
                            <td class="form-control text-left" style="background-color:#ededed;">
                                <label>Ingrese sus observaciones aquí (opcional)</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea style="resize:none;" v-model="user_observacion" class="form-control" maxlength="500" rows="10" cols="10" placeholder="Ingrese aqui...">
                                </textarea>
                            </td>
                        </tr>
                        <hr>
                        <tr>
                            <td>
                                <button style="margin-bottom: 2%;" class="btn btn-success" @click="guardar();">Guardar</button>
                                <button style="margin-bottom: 2%;" class="btn btn-warning" @click="reset">Limpiar</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `
})