Vue.component('componente_historico',
{
    props:['id_user'],
    data: function()
    {
        return {            
            //datos
            user_id_tipo               : 0,
            user_rut_usuario           : 0,
            user_centro_costos         : 0,
            user_equipo                : 0,
            user_observacion           : '',
            user_busqueda              : '',
            //auxiliares
            bd_id                      : '',
            bd_nombre_movimiento       : '',
            bd_rut_usuario             : '',
            bd_nombre_usuario          : '',
            bd_centro_costos           : '',
            bd_equipo                  : '',
            bd_observacion             : '',
            bd_creador                 : '',

            reasignacion_editar        : [],
            editar_user_id_tipo        : 0,
            datosMovimiento            : [],
            ultimoMovimiento           : [],
            //Reasignacion
            mostrarAsignacion          : false,
            mostrarDevolucion          : false,
            mostrarBaja                : false,
            //modulos
            listarMovimiento           : true,
            revisarHistorico           : false,
            //array
            tipo_movimiento            : [],
            equipo                     : [],
            encargado                  : [],
            movimiento                 : [],
            historico                  : [],
            adjunto                    : [],
            cc                         : [],
        }
    },
    computed:
    {
        filtrar_movimiento()
        {
            if(this.movimiento.length === 0)
            {
                return this.movimiento;
            }
            else
            {
                return this.movimiento.filter(item => 
                    {
                      return (item.id_movimiento.toLowerCase()
                      +item.nombre_tipo_movimiento.toLowerCase()
                      +item.encargado_movimiento.toLowerCase()
                      +item.nombre_encargado_movimiento.toLowerCase()
                      +item.nombre_cc_movimiento.toLowerCase()
                      +item.bd_equipo_movimiento.toLowerCase()
                      +item.observacion_movimiento.toLowerCase()
                      +item.creador_movimiento.toLowerCase()
                      +item.fecha_movimiento_formateada.toLowerCase()).includes(this.user_busqueda.toLowerCase());
                    });
            }
        },
    },
    mounted: function() 
    {
        this.listar_movimiento();
        this.listar_tipo_movimiento();
        this.listar_centro_costo();
        this.listar_encargado();
    },
    methods:
    {
        visible_mostrar : function(m)
        {
            this.mostrarAsignacion          = false;
            this.mostrarBaja                = false;
            this.mostrarDevolucion          = false;

            if(m === '1')
            {
                this.mostrarAsignacion = true;
            }
            if(m === '2')
            {
                this.mostrarBaja = true;
            }
            if(m === '3')
            {
                this.mostrarDevolucion = true;
            }

        },
        actualizar_movimiento : function()
        {
            if(parseInt(this.editar_user_id_tipo) === 0)
            {
                alert('Debe seleccionar un tipo de movimiento a asignar');
                return 0;
            }
            if(parseInt(this.editar_user_id_tipo) === 2 || parseInt(this.editar_user_id_tipo) === 3)
            {
                this.reasignacion_editar.encargado_movimiento = '';
            }
            let post=
            {
                opcion          :     'actualizar_movimiento',
                datos           :     this.reasignacion_editar,
                id_tipo         :     this.editar_user_id_tipo,
            }
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                $("#modal_reasignar").modal('hide');
                this.listar_movimiento();
                alert('Movimiento actualizado!');
                this.notificar(this.reasignacion_editar, this.editar_user_id_tipo);
            });
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
        ver_movimiento: function(reg)
        {
            this.modal_historico(reg);
            this.cargar_historico(reg);
            this.ver_movimiento_datos(reg);
        },
        ver_movimiento_datos: function(reg)
        {
            let a =
            {
                opcion  : "listar_movimiento_por_id",
                id      : reg.id_movimiento
            }
            axios.post("/SisInventario/datos/base_data.php",a).then(response=>
                {
                    this.ultimoMovimiento = response.data;
                });
            let post =
            {
                opcion  : "ver_movimiento_datos",
                id      : reg.id_movimiento
            }
            axios.post("/SisInventario/datos/base_data.php",post).then(response=>
            {
                this.datosMovimiento = response.data;
            });
            let p =
            {
                opcion : "listar_adjunto",
                id     : reg.id_movimiento
            };
            axios.post("/SisInventario/datos/base_data.php", p).then(response =>
            {
                this.adjunto = response.data;
                if(this.adjunto.length === 0)
                {
                    this.adjunto = []
                }
            });
        },
        cargar_historico: function(reg)
        {
            let post=
            {
                opcion  : "cargar_historico",
                id      : reg.equipo_movimiento
            }
            axios.post("/SisInventario/datos/base_data.php",post).then(response=>
            {
                this.historico = response.data;
            })
            let p =
            {
                opcion : "listar_adjunto",
                id     : reg.id_movimiento
            };
            axios.post("/SisInventario/datos/base_data.php", p).then(response =>
            {
                this.adjunto = response.data;
                if(this.adjunto.length === 0)
                {
                    this.adjunto = []
                }
            });
        },
        modal_historico: function(reg)
        {
            $("#modal_historico_adjunto").modal();
            //$("#modal_ejemplo").modal('hide');
        },
        modal_reasignar: function(registro)
        {
            this.reasignacion_editar = registro;
            $("#modal_reasignar").modal();
        },
        listar_movimiento: function()
        {
            let post =
            {
                opcion : "listar_movimiento",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                this.movimiento = response.data;
            }
            )
            .catch
            {
                this.movimiento = [];
            }
        },
        cargar_nuevo_movimiento: function()
        {
            $("#crear_nuevo_movimiento").click();
        },
    },
    template:
`
<div class="container" style="border:2px solid gray; background-color:white;">
    <br>
    <img src="/SisInventario/img/Cran_logo.png" width="160px" height="160px" class="img-responsive pull-right">
    <h5 style="text-align:left; font-weight: bold"> SISTEMA DE GESTIÓN E INVENTARIO <br> CONTROL DE EQUIPAMIENTO - ASIGNACIÓN / DEVOLUCIÓN / BAJA AAFF <br> AGRÍCOLA CRAN CHILE SPA <br> UNIDAD DE INFORMÁTICA </h5>
    <div id="app" class="text-center">
        <br>
        <hr style="height:2px; border-width:0; color:gray; background-color:gray">
        <div class="table-responsive" v-if="listarMovimiento">
            <button @click="cargar_nuevo_movimiento();" class="btn btn-primary" style="margin-bottom:1%;">Nuevo Movimiento</button>
            <input type="text" v-model="user_busqueda" placeholder="Buscar..." class="form-control" style="margin-bottom:1%;">
            <table align="center" class="table table-striped text-center">
                <tr>
                    <td width="3%">
                        <label> ID </label>
                    </td>
                    <td width="7%">
                        <label> Tipo de <br>movimiento </label>
                    </td>
                    <td width="10%">
                        <label> RUT <br>Encargado </label>
                    </td>
                    <td width="10%">
                        <label> Nombre <br>encargado </label>
                    </td>
                    <td width="10%">
                        <label> CC </label>
                    </td>
                    <td width="10%">
                        <label> Equipo </label>
                    </td>
                    <td width="10%">
                        <label> Observacion </label>
                    </td>
                    <td width="10%">
                        <label> Agregado <br>por </label>
                    </td>
                    <td width="10%">
                        <label> Fecha <br>registro </label>
                    </td>
                    <td width="20%">
                        <label> Accion </label>
                    </td>
                </tr>
                <tbody>
                    <tr v-for="reg in filtrar_movimiento">
                        <td>{{reg.id_movimiento}}
                        <td>{{reg.nombre_tipo_movimiento}}</td>
                        <td>{{reg.encargado_movimiento}}</td>
                        <td>
                            <span v-html="reg.nombre_encargado_movimiento"></span>
                        </td>
                        <td>{{reg.nombre_cc_movimiento}}</td>
                        <td>
                            <span v-html="reg.bd_equipo_movimiento"></span>
                        </td>
                        <td>{{reg.observacion_movimiento}}</td>
                        <td>{{reg.nombre_creador_movimiento}}</td>
                        <td>{{reg.fecha_movimiento_formateada}}</td>
                        <td>
                            <button @click="ver_movimiento(reg)" class="btn btn-info btn-xs glyphicon glyphicon-time"></button>
                            <button @click="modal_reasignar(reg);" class="btn btn-success btn-xs">Reasignar</button>
                            <!--Boton para editar
                                <button @click="visible_modulos('editarMovimiento'); cargar_editar_movimiento(reg)" class="btn btn-warning btn-xs glyphicon glyphicon-pencil"></button>
                                -->
                            <!--Boton para editar
                                <button @click="visible_modulos('eliminarMovimiento'); cargar_eliminar_movimiento(reg)" class="btn btn-danger btn-xs glyphicon glyphicon-remove"></button>
                                -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <div id="modal_reasignar" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <label class="modal-title">Reasignacion</label>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <select v-model="editar_user_id_tipo" @change="visible_mostrar(editar_user_id_tipo)" class="form-control">
                                <option value="0">Seleccione...</option>
                                <option v-for="reg in tipo_movimiento" :value="reg.id_movimiento">{{reg.tipo_movimiento}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <div class="form-group">
                                <label v-show="mostrarAsignacion">RUT</label>
                                <select v-show="mostrarAsignacion" v-model="reasignacion_editar.encargado_movimiento" class="form-control">
                                    <option value="0">Seleccione...</option>
                                    <option v-for="reg in encargado" :value="reg.rut_encargado">({{reg.rut_encargado}}) {{reg.nombre_encargado}} {{reg.apellido_encargado}}</option>
                                </select>
                                <label>Centro costos</label>
                                <select v-model="reasignacion_editar.cc_movimiento" class="form-control">
                                    <option value="0">Seleccione...</option>
                                    <option v-for="reg in cc" :value="reg.id_centro_costo">{{reg.nombre_centro_costo}}</option>
                                </select>
                                <label>Observacion</label>
                                <textarea style="resize:none;" v-model="reasignacion_editar.observacion_movimiento" class="form-control" maxlength="500" rows="10" cols="10" placeholder="Ingrese aqui...">
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                        <hr>
                        <button class="btn btn-primary" @click="actualizar_movimiento()">Guardar</button>
                    </div>
            </div>
        </div>
    </div>

    <div id="modal_historico_adjunto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <label class="modal-title">Historial del equipo</label>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-for="r in ultimoMovimiento">
                    <div class="pull-right">
                    <label>FECHA</label>
                    <br>
                    <label>{{r.fecha_movimiento_formateada}}</label>
                    </div>
                    <div><label style="margin-top:1%; margin-left:1%; margin-right:1%; color:#ff0000;">NUMERO DE MOVIMIENTO: {{r.id_movimiento}}</label></div>
                    <label style="margin-top:1%; margin-left:1%; margin-right:1%;">CONTROL DE EQUIPAMIENTO</label>
                    <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                        <label style="margin-left:1%; margin-top: 2px;">TIPO DE MOVIMIENTO: {{r.nombre_tipo_movimiento}}</label>
                    </div>
                    <label style="margin-top:1%; margin-left:1%; margin-right:1%;">ANTECEDENTES DEL USUARIO</label>
                    <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                        <label style="margin-left:1%; margin-top: 2px;">RUT ENCARGADO: {{r.encargado_movimiento}}</label>
                    </div>
                    <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                        <label style="margin-left:1%; margin-top: 2px;">NOMBRE ENCARGADO: {{r.nombre_encargado_movimiento}}</label>
                    </div>
                    <div style="border:2px solid gray; margin-bottom:1%; margin-left:1%; margin-right:1%;">
                        <label style="margin-left:1%; margin-top: 2px;">CC: {{r.nombre_cc_movimiento}}</label>
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
                            <label style="margin-left:1%; margin-top: 2px;">{{r.nombre_categoria_equipo}}</label>
                        </td>
                        <td>
                            <label style="margin-left:1%; margin-top: 2px;">{{r.nro_serie_equipo}}</label>
                        </td>
                        <td>
                            <label style="margin-left:1%; margin-top: 2px;">{{r.marca_equipo}}</label>
                        </td>
                        <td>
                            <label style="margin-left:1%; margin-top: 2px;">{{r.modelo_equipo}}</label>
                        </td>
                        <td>
                            <label style="margin-left:1%; margin-top: 2px;">{{r.accesorio_equipo}}</label>
                        </td>
                    </tr>
                    </table>
                    <a v-for="reg in adjunto" :href="'http://192.168.100.110/SisInventario/adjuntos/'+reg.nombre" target="_blank">{{reg.nombre}}<br></a>
                    <div style="border: 2px solid gray;" class="data-list table-responsive">                    
                        <table align="center" class="table table-striped">
                            <tr>
                                <td>
                                    <label> Fecha <br>actualizacion </label>
                                </td>
                                <td>
                                    <label> ID </label>
                                </td>
                                <td>
                                    <label> Tipo de <br>movimiento </label>
                                </td>
                                <td>
                                    <label> RUT <br>Encargado </label>
                                </td>
                                <td>
                                    <label> Nombre <br>encargado </label>
                                </td>
                                <td>
                                    <label> CC </label>
                                </td>
                                <td>
                                    <label> Equipo </label>
                                </td>
                                <td>
                                    <label> Observacion </label>
                                </td>
                                <td>
                                    <label> Agregado <br>por </label>
                                </td>
                            </tr>
                            <tbody>
                                <tr v-for="reg in historico">
                                    <td>{{reg.fecha_cambio_formateada}}
                                    <td>{{reg.id_movimiento}}
                                    <td>{{reg.nombre_tipo_movimiento}}</td>
                                    <td>{{reg.encargado_movimiento}}</td>
                                    <td>
                                        <span v-html="reg.nombre_encargado_movimiento"></span>
                                    </td>
                                    <td>{{reg.nombre_cc_movimiento}}</td>
                                    <td>
                                        <span v-html="reg.bd_equipo_movimiento"></span>
                                    </td>
                                    <td>{{reg.observacion_movimiento}}</td>
                                    <td>{{reg.nombre_creador_movimiento}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <hr>
                        <a :href="'http://192.168.100.110/SisInventario/img/'+r.id_movimiento+'.png'" target="_blank" class="btn btn-primary">Generar QR</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    <!--///////////////////////////////////////////////////

    <div v-show="eliminarMovimiento" class="text-center">
        <div style="border: 2px solid gray;">
            <h5>
                Movimiento a eliminar:                        
            </h5>
                <div>ID:</div>
                <div style="font-weight: bold">{{bd_id}}</div>
                <br>
                <div>Tipo de movimiento:</div>
                <div style="font-weight: bold">{{bd_nombre_movimiento}}</div>
                <br>
                <div>RUT Encargado:</div>
                <div style="font-weight: bold">{{bd_rut_usuario}}</div>
                <br>
                <div>Nombre encargado:</div>
                <div style="font-weight: bold" v-html="bd_nombre_usuario"></div>
                <br>
                <div>Centro de Costos:</div>
                <div style="font-weight: bold">{{bd_centro_costos}}</div>
                <br>
                <div>Equipo:</div>
                <div style="font-weight: bold" v-html="bd_equipo"></div>
                <br>
                <div>Observacion:</div>
                <div style="font-weight: bold">{{bd_observacion}}</div>
                <br>
                <div>Agregado por:</div>
                <div style="font-weight: bold; margin-bottom:1%">{{bd_creador}}</div>
        </div>
            <hr>
        <h3>¿Desea eliminar éste movimiento?</h3>
        <button class="btn btn-danger" @click="visible_modulos('listarMovimiento'); reset();" style="margin-bottom:1%;">
            Cancelar
        </button>
        <button class="btn btn-warning" @click="eliminar_movimiento(bd_id)" style="margin-bottom:1%;">
            Eliminar
        </button>
    </div>

    <div v-show="editarMovimiento" class="text-center">
        <div style="border: 2px solid gray;">
            <h5>
                Movimiento a editar:                        
            </h5>
            <div>Tipo de movimiento:</div>
            <select v-model="user_id_tipo" class="form-control">
                <option value="0">Seleccione...</option>
                <option v-for="reg in tipo" :value="reg.id_movimiento">{{reg.tipo_movimiento}}</option>
            </select>
            <br>
            <div>Encargado:</div>
            <select v-model="user_rut_usuario" class="form-control">
                <option value="0">Seleccione...</option>
                <option v-for="reg in persona" :value="reg.rut">({{reg.rut}}) {{reg.nombre}} {{reg.apellido}}</option>
            </select>
            <br>
            <div>Centro de Costos:</div>
            <select v-model="user_centro_costos" class="form-control">
                <option value="0">Seleccione...</option>
                <option v-for="reg in predio" :value="reg.id_predio">{{reg.predio}}</option>
            </select>
            <br>
            <div>Equipo:</div>
            <select v-model="user_equipo" class="form-control">
                <option value="0">Seleccione...</option>
                <option v-for="reg in equipo" :value="reg.id_equipo">({{reg.nro_serie_equipo}}) {{reg.marca_equipo}} {{reg.modelo_equipo}} {{reg.nombre_categoria}}</option>
            </select>
            <div>Adjuntos:</div>
            <input
                type="file"
                class="form-control"
                id="archivos"
                ref="archivos"
                multiple="multiple"
                accept="image/png, image/jpeg, application/pdf"
            />
            <br>
            <div>Observacion:</div>
            <textarea style="resize:none;" v-model="user_observacion" class="form-control" maxlength="500" rows="10" cols="10" placeholder="Ingrese aqui...">
            </textarea>
            <br>
        </div>
        <hr>
        <button class="btn btn-danger" @click="visible_modulos('listarMovimiento'); reset();" style="margin-bottom:1%;">
            Cancelar
        </button>
        <button class="btn btn-warning" @click="editar_movimiento(bd_id)" style="margin-bottom:1%;">
            Editar
        </button>
    </div>
    -->
`
})