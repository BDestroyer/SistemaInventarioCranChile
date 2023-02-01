Vue.component('componente_equipo',
{
    data: function () 
    {
        return{
            //datos
            user_numero_serie           : '',
            user_modelo_equipo          : '',
            user_marca_equipo           : '',
            user_id_categoria_equipo    : '0',
            user_accesorio_equipo       : '',
            user_imei                   : '',
            user_so                     : '',
            user_fecha_adquisicion      : '',
            //auxiliares
            bd_imei                     : '',
            bd_id_equipo                : '',
            bd_so                       : '',
            bd_nro_serie_equipo         : '',
            bd_fecha_adquisicion        : '',
            bd_modelo_equipo            : '',
            bd_marca_equipo             : '',
            bd_accesorio_equipo         : '',
            //traer nombre categoria
            bd_id_categoria_equipo      : '',
            bd_nombre_categoria_equipo  : '',
            //modulos
            listarEquipo                : true,
            editarEquipo                : false,
            eliminarEquipo              : false,
            nuevoEquipo                 : false,
            mostrarImei                 : false,
            mostrarSo                   : false,
            //array
            equipos:[],
            categorias:[],
        }
    },
    mounted: function() 
    {
        $("#user_fecha_adquisicion").datepicker({format: 'dd/mm/yyyy'});
        $("#user_fecha_adquisicion_editar").datepicker({format: 'dd/mm/yyyy'});
        this.visible_modulos('listarEquipo');
        this.listar_tabla_equipo();
    },
    methods: 
    {
        limpiar: function()
        {
            this.user_numero_serie              = '',
            this.user_marca_equipo              = '',
            this.user_modelo_equipo             = '',
            this.user_id_categoria_equipo       = '0',
            this.user_accesorio_equipo          = '',
            this.user_imei                      = '',
            this.user_so                        = '',
            $("#user_fecha_adquisicion").val('');
            $("#user_fecha_adquisicion_editar").val('');
    },
        visible_modulos: function(modulo)
        {
            this.listarEquipo               = false; 
            this.editarEquipo               = false;
            this.eliminarEquipo             = false;
            this.nuevoEquipo                = false;

            if(modulo === 'listarEquipo')
            {
                this.listarEquipo = true;
            }                
            if(modulo === 'editarEquipo')
            {
                this.editarEquipo = true;
            }            
            if(modulo === 'eliminarEquipo')
            {
                this.eliminarEquipo = true;
            }            
            if(modulo === 'nuevoEquipo')
            {
                this.nuevoEquipo = true;
            }
        },
        visible_opcion: function(m)
        {
            this.mostrarImei  = false;
            this.mostrarSo    = false;
            if(m === '3')
            {
                this.mostrarImei = true;
            }
            if(m === '4')
            {
                this.mostrarSo = true;
            }
            if(m === '5')
            {
                this.mostrarSo = true;
            }
        },
        cargar_eliminar_equipo: function(reg)
        {  
           this.bd_imei                       = reg.imei_equipo;                                   
           this.bd_so                         = reg.sistema_operativo_equipo;
           this.bd_fecha_adquisicion          = reg.fecha_adquisición_equipo;
           this.bd_id_equipo                  = reg.id_equipo;
           this.bd_nro_serie_equipo           = reg.nro_serie_equipo
           this.bd_modelo_equipo              = reg.modelo_equipo;
           this.bd_marca_equipo               = reg.marca_equipo;
           this.bd_id_categoria_equipo        = reg.id_categoria_equipo;
           this.bd_nombre_categoria_equipo    = reg.nombre_categoria;
           this.bd_accesorio_equipo           = reg.accesorio_equipo;
        },
        eliminar_equipo: function()
        {
            let post =
            {
                opcion          : "eliminar_equipo",
                id_equipo       : this.bd_id_equipo,
            };
            axios.post("/SisInventario/datos/base_data.php",post).then(response =>
                {
                    alert('Equipo eliminado correctamente!');
                    this.limpiar();
                    this.visible_modulos('listarEquipo');
                    this.listar_tabla_equipo();
                });
        },
        cargar_editar_equipo: function(reg)
        {
            this.user_imei                     = reg.imei_equipo;                                   
            this.user_so                       = reg.sistema_operativo_equipo;
            this.bd_id_equipo                  = reg.id_equipo;
            this.user_numero_serie             = reg.nro_serie_equipo;
            this.user_modelo_equipo            = reg.modelo_equipo;
            this.user_marca_equipo             = reg.marca_equipo;
            this.user_id_categoria_equipo      = reg.id_categoria_equipo;
            this.user_accesorio_equipo         = reg.accesorio_equipo;
            console.log('pase '+reg.fecha_adquisición_equipo_formateada);
            $("#user_fecha_adquisicion_editar").val(reg.fecha_adquisición_equipo_formateada);
        },
        editar_equipo:function()
        {
            if(this.user_numero_serie.length === 0)
            {
                alert("El modelo del equipo no puede estar vacío!")
                return 0;
            }
            if(this.user_marca_equipo.length === 0)
            {
                alert("La marca del equipo no puede estar vacía!")
                return 0;
            }
            if(this.user_modelo_equipo.length === 0)
            {
                alert("El modelo del equipo no puede estar vacío!")
                return 0;
            }
            if(this.user_id_categoria_equipo === 0)
            {
                alert("Debe seleccionar una categoría!")
                return 0;
            }
            if($("#user_fecha_adquisicion_editar").val().length === 0)
            {
                alert("Debe agregar una fecha de adquisicion!")
                return 0;
            }
            if(this.user_id_categoria_equipo === 3)
            {
                if(this.user_imei.length === 0)
                {
                    alert("Si el equipo es un celular, debe obligatoriamente incluir un IMEI!")
                    return 0;
                }
            }
            if(this.user_id_categoria_equipo === '4' || this.user_id_categoria_equipo === '5')
            {
                if(this.user_so.length === 0)
                {
                    alert("Si el equipo es un notebook o computador, debe obligatoriamente incluir el sistema operativo")
                    return 0;
                }
            }
            let post =
            {
                opcion                      : "editar_equipo",
                id_equipo                   : this.bd_id_equipo,
                nro_serie                   : this.user_numero_serie,
                marca_equipo                : this.user_marca_equipo,
                modelo_equipo               : this.user_modelo_equipo,
                id_categoria_equipo         : this.user_id_categoria_equipo,
                imei_equipo                 : this.user_imei,
                sistema_operativo_equipo    : this.user_so,
                fecha_adquisición_equipo    : $("#user_fecha_adquisicion_editar").val(),
                accesorio_equipo            : this.user_accesorio_equipo,
                
            };
            axios.post("/SisInventario/datos/base_data.php",post).then(response =>
                {
                    alert("Equipo actualizado correctamente!");
                    this.limpiar();
                    this.visible_modulos('listarEquipo');
                    this.listar_tabla_equipo();
                });
        },
        guardar_equipo: function()
        {
            if(this.user_numero_serie.length === 0)
            {
                alert("El modelo del equipo no puede estar vacío!")
                return 0;
            }
            if(this.user_marca_equipo.length === 0)
            {
                alert("La marca del equipo no puede estar vacía!")
                return 0;
            }
            if(this.user_modelo_equipo.length === 0)
            {
                alert("El modelo del equipo no puede estar vacío!")
                return 0;
            }
            if(this.user_id_categoria_equipo === 0)
            {
                alert("Debe seleccionar una categoría!")
                return 0;
            }
            if($("#user_fecha_adquisicion").val().length === 0)
            {
                alert("Debe agregar una fecha de adquisicion!")
                return 0;
            }
            if(this.user_id_categoria_equipo === 3)
            {
                if(this.user_imei.length === 0)
                {
                    alert("Si el equipo es un celular, debe obligatoriamente incluir un IMEI!")
                    return 0;
                }
            }
            if(this.user_id_categoria_equipo === '4' || this.user_id_categoria_equipo === '5')
            {
                if(this.user_so.length === 0)
                {
                    alert("Si el equipo es un notebook o computador, debe obligatoriamente incluir el sistema operativo")
                    return 0;
                }
            }
            let pre = 
            {
                opcion                  : "validar_equipo",
                nro_serie               : this.user_numero_serie,
            };
            axios.post("/SisInventario/datos/base_data.php", pre).then(response => 
            {
                if(response.data > 0)
                {
                    alert("El equipo ya existe, intente con otro número de serie!");
                    this.user_numero_serie = '';
                }
                else
                {
                    let post = 
                    {
                        opcion                      : "guardar_equipo",
                        nro_serie                   : this.user_numero_serie,
                        marca_equipo                : this.user_marca_equipo,
                        modelo_equipo               : this.user_modelo_equipo,
                        id_categoria_equipo         : this.user_id_categoria_equipo,
                        imei_equipo                 : this.user_imei,
                        sistema_operativo_equipo    : this.user_so,
                        fecha_adquisición_equipo    : $("#user_fecha_adquisicion").val(),
                        accesorio_equipo            : this.user_accesorio_equipo,
                    };
                    axios.post("/SisInventario/datos/base_data.php", post).then(response => 
                    {
                        alert("Equipo creado exitosamente");
                        this.limpiar();
                        this.visible_modulos('listarEquipo');
                        this.listar_tabla_equipo();
                    });
                }
            });
        },
        listar_tabla_equipo:function()
        {
            let post =
            {
                opcion : "listar_tabla_equipo",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                this.equipos = response.data;
            }
            );
        },
        listar_categoria: function()
        {
            let post = 
            {
                opcion : "listar_categoria"
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
                {
                    this.categorias = response.data;
                }
                );
        },
    },
    template:
    `
    <div class="container" style="text-align:left; border:2px solid gray; background-color:white;">
        <br>
        <img src="/SisInventario/img/Cran_logo.png" width="160px" height="160px" class="img-responsive pull-right">
        <h5 style="font-weight: bold">
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
            <hr style="height:2px;border-width:0;color:gray;background-color:gray">
            <div class="table-resposive" v-show="listarEquipo"> 
            <button @click="visible_modulos('nuevoEquipo'); listar_categoria();" class="btn btn-primary" style="margin-bottom:1%;">Nuevo Equipo</button>
            <table align="center" class="table table-striped">
            <tr>
                <td>
                    <label>
                        ID
                    </label>
                </td>
                <td>
                    <label>
                        Fecha Adquisicion
                    </label>
                </td>
                <td>
                    <label>
                        Numero Serie
                    </label>
                </td>
                <td>
                    <label>
                        IMEI
                    </label>
                </td>
                <td>
                    <label>
                        Sistema Operativo
                    </label>
                </td>
                <td>
                    <label>
                        Modelo
                    </label>
                </td>
                <td>
                    <label>
                        Marca
                    </label>
                </td>
                <td>
                    <label>
                        Categoria
                    </label>
                </td>
                <td>
                    <label>
                        Accesorio
                    </label>
                </td>
                <td>
                    <label>
                        Asignado
                    </label>
                </td>
                <td>
                    <label>
                        Accion
                    </label>
                </td>
            </tr>
            <tbody>
                <tr v-for="reg in equipos">
                    <td><strong>{{reg.id_equipo}}</strong>
                    <td>{{reg.fecha_adquisición_equipo_formateada}}</td>
                    <td>{{reg.nro_serie_equipo}}</td>
                    <td>{{reg.imei_equipo}}</td>
                    <td>{{reg.so_equipo}}</td>
                    <td>{{reg.modelo_equipo}}</td>
                    <td>{{reg.marca_equipo}}</td>
                    <td>{{reg.nombre_categoria}}</td>
                    <td>{{reg.accesorio_equipo}}</td>
                    <td>{{reg.asignado}}</td>
                    <td>
                        <button @click="visible_modulos('editarEquipo'); cargar_editar_equipo(reg); listar_categoria();" class="btn btn-success btn-xs glyphicon glyphicon-pencil"></button>
                        <button @click="visible_modulos('eliminarEquipo'); cargar_eliminar_equipo(reg)" class="btn btn-danger btn-xs glyphicon glyphicon-remove"></button>   
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        </div>

        <div v-show="nuevoEquipo" class="table-responsive; text-center" style="border: 2px solid gray;">
            <table class="table table-striped">
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Ingrese el numero de serie del equipo:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input placeholder="Ingrese aquí..." type="text" v-model="user_numero_serie" class="form-control">
                    </td>
                </tr>
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Ingrese marca del equipo:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input placeholder="Ingrese aquí..." class="form-control" type="text" v-model="user_marca_equipo">
                    </td>
                </tr>
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                            <label>Ingrese el modelo del equipo:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input placeholder="Ingrese aquí..." class="form-control" type="text" v-model="user_modelo_equipo">
                    </td>
                </tr>
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Categoria:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <select v-model="user_id_categoria_equipo" @change="visible_opcion(user_id_categoria_equipo)" class="form-control">
                        <option value="0">Seleccione...</option>
                        <option v-for="reg in categorias" :value="reg.id_categoria">{{reg.nombre_categoria}}</option>
                        </select>
                    </td>
                </tr>
                <tr v-show="mostrarImei">
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Ingrese el IMEI del equipo:</label>
                    </td>
                </tr>
                <tr v-show="mostrarImei">
                    <td>
                        <input placeholder="Ingrese aquí..." type="text" v-model="user_imei" class="form-control">
                    </td>
                </tr>
                <tr v-show="mostrarSo">
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Ingrese el sistema operativo del equipo:</label>
                    </td>
                </tr>
                <tr v-show="mostrarSo">
                    <td>
                        <input placeholder="Ingrese aquí..." type="text" v-model="user_so" class="form-control">
                    </td>
                </tr>
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Fecha adquisición:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input placeholder="Seleccione aquí..." type="text" class="form-control text-left" id="user_fecha_adquisicion"></input>
                    </td>
                </tr>
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Ingrese accesorio del equipo: (opcional)</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea style="resize:none;" v-model="user_accesorio_equipo" class="form-control" maxlength="200" rows="6" cols="10" placeholder="Ingrese aqui...">
                        </textarea>
                    </td>
                </tr>
                <hr>
                <button class="btn btn-danger" style="margin-bottom:1%" @click="visible_modulos('listarEquipo'); limpiar();">
                    Cancelar
                </button>
                <button class="btn btn-success" style="margin-bottom:1%" @click="guardar_equipo">
                    Guardar
                </button>
            </table>
        </div>

        <!--Editar-->
        <div v-show="editarEquipo" class="container; text-center">
            <table align="center" class="table table-striped">
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Numero de serie:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="user_numero_serie">
                </td>
            </tr>
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Modelo:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="user_modelo_equipo">
                </td>
            </tr>
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Marca:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="user_marca_equipo">
                </td>
            </tr>
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Categoria:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <select @change="visible_opcion(user_id_categoria_equipo)" class="form-control" v-model="user_id_categoria_equipo">
                    <option value="0">Seleccione...</option>
                    <option v-for="reg in categorias" :value="reg.id_categoria">{{reg.nombre_categoria}}</option>
                    </select>
                </td>
            </tr>
            <tr v-show="mostrarImei">
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Ingrese el IMEI del equipo:</label>
                </td>
            </tr>
            <tr v-show="mostrarImei">
                <td>
                    <input placeholder="Ingrese aquí..." type="text" v-model="user_imei" class="form-control">
                </td>
            </tr>
            <tr v-show="mostrarSo">
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Ingrese el sistema operativo del equipo:</label>
                </td>
            </tr>
            <tr v-show="mostrarSo">
                <td>
                    <input placeholder="Ingrese aquí..." type="text" v-model="user_so" class="form-control">
                </td>
            </tr>
            <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Fecha adquisición:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input placeholder="Seleccione aquí..." type="text" class="form-control text-left" id="user_fecha_adquisicion_editar"></input>
                    </td>
                </tr>
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Accesorio:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea style="resize:none;" class="form-control" v-model="user_accesorio_equipo" maxlength="200" rows="10" cols="10">
                    </textarea>
                </td>
            </tr>
            <hr>
            <tr>
                <td>
                    <button class="btn btn-danger" @click="visible_modulos('listarEquipo'); limpiar();">
                        Cancelar
                    </button>
                    <button class="btn btn-success" @click="editar_equipo();">
                        Editar
                    </button>
                </td>
            </tr>
            </table>
        </div>

        <!--Eliminar-->
        <div v-show="eliminarEquipo" class="container; text-center">
            <table align="center" class="table">
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Equipo seleccionado:</label>
                    </td>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Numero de serie: {{bd_nro_serie_equipo}}</label>
                    </td>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>IMEI: {{bd_imei}}</label>
                    </td>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Sistema operativo: {{bd_so}}</label>
                    </td>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Modelo: {{bd_modelo_equipo}}</label>
                    </td>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Marca: {{bd_marca_equipo}}</label>
                    </td>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Categoria: {{bd_nombre_categoria_equipo}}</label>
                    </td>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Accesorio: {{bd_accesorio_equipo}}</label>
                    </td>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Fecha adquisicion: {{bd_fecha_adquisicion}}</label>
                    </td>                       
                </tr>
                <tr>
                    <td>
                        <h3>¿Desea eliminar este equipo?</h3>
                    </td>
                </tr>
                <hr>
                <tr>
                    <td>
                        <button class="btn btn-danger" @click="visible_modulos('listarEquipo'); limpiar();">
                            Cancelar
                        </button>
                        <button class="btn btn-warning" @click="eliminar_equipo();">
                            Eliminar
                        </button>
                    </td>
                </tr>   
            </table>
        </div>       
    </div>
    `
}
)