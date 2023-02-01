Vue.component('componente_cc',
{
    data: function ()
    {
        return {
            //datos
            user_nuevo_centro_costos   : '',
            bd_id                      : '',
            bd_nombre_cc               : '',
            //modulos
            listarCC                   : true,
            nuevoCC                    : false,
            editarCC                   : false,
            eliminarCC                 : false,
            //array
            centro_costos:[],
        }
    },
    mounted: function() 
    {
        this.visible_modulos('listarCC');
        this.listar_centro_costo();
    },
    methods:
    {
        limpiar: function()
        {
            this.user_nuevo_centro_costos   = '',
            this.bd_id                      = '',
            this.bd_nombre_cc               = '';
        },
        visible_modulos: function(modulo)
        {
            this.listarCC   = false;
            this.nuevoCC    = false;
            this.editarCC   = false;
            this.eliminarCC = false;

            if(modulo === 'listarCC')
            {
                this.listarCC = true;
            }
            if(modulo === 'editarCC')
            {
                this.editarCC = true;
            }
            if(modulo === 'eliminarCC')
            {
                this.eliminarCC = true;
            }
            if(modulo === 'nuevoCC')
            {
                this.nuevoCC = true;
            }
        },
        cargar_eliminar_cc: function (reg)
        {
            this.bd_id          =   reg.id_centro_costo;    
            this.bd_nombre_cc   =   reg.nombre_centro_costo
        },
        eliminar_cc:function()
        {
            let post =
            {
            opcion      :"eliminar_cc",
            bd_id       : this.bd_id,
            };
            axios.post("/SisInventario/datos/base_data.php",post).then(response =>
                {
                    alert('Centro de costos eliminado correctamente!');
                    this.limpiar();
                    this.visible_modulos('listarCC');
                    this.listar_centro_costo();
                });
        },
        cargar_editar_cc: function(reg)
        {
            this.bd_id                      =   reg.id_centro_costo;
            this.user_nuevo_centro_costos   =   reg.nombre_centro_costo;
        },
        editar_cc:function()
        {
            if(this.user_nuevo_centro_costos.length === 0)
            {
                alert("El nombre del centro de costos no puede esta vacío!")
                return 0;
            }
            let post = 
            {
                opcion  : "editar_cc",
                nombre  : this.user_nuevo_centro_costos,
                bd_id   : this.bd_id,
            };
            axios.post("/SisInventario/datos/base_data.php",post).then(response =>
                {
                    alert("Centro de costos actualizado correctamente!");
                    this.limpiar();
                    this.visible_modulos('listarCC');
                    this.listar_centro_costo();
                });
            
        },
        guardar_centro_costos: function()
        {
            if(this.user_nuevo_centro_costos.length === 0)
            {
                alert("El nombre del nuevo centro de costos no puede estar vacío!")
                return 0;
            }
            let pre = 
            {
                opcion       : "validar_centro_costos",
                nombre       : this.user_nuevo_centro_costos,
            };
            axios.post("/SisInventario/datos/base_data.php", pre).then(response => 
                {
                    if(response.data > 0)
                    {
                        alert("El centro de costos ya existe!");
                    }
                    else
                    {
                        let post = 
                        {
                            opcion       : "guardar_centro_costos",
                            nombre       : this.user_nuevo_centro_costos,
                        };
                        axios.post("/SisInventario/datos/base_data.php", post).then(response => 
                        {
                            alert("Centro de costo agregado exitosamente");
                            this.limpiar();
                            this.visible_modulos('listarCC');
                            this.listar_centro_costo();
                        });
                    }
                });
        },
        listar_centro_costo : function()
        {
            let post =
            {
                opcion : "listar_centro_costo",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                this.centro_costos = response.data;
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
            <div class="table-responsive" v-if="listarCC">
                <button @click="visible_modulos('nuevoCC')" class="btn btn-primary">Nuevo CC</button>
                <table align="center" class="table table-striped">
                    <tr>
                        <td>
                            <label>
                                ID
                            </label>
                        </td>
                        <td>
                            <label>
                                Nombre
                            </label>
                        </td>
                        <td>
                            <label>
                                Accion
                            </label>
                        </td>
                    </tr>
                    <tbody>
                        <tr v-for="reg in centro_costos">
                            <td><strong>{{reg.id_centro_costo}}</strong>
                            <td>{{reg.nombre_centro_costo}}</td>
                            <td>
                                <button @click="visible_modulos('editarCC'); cargar_editar_cc(reg)" class="btn btn-success btn-xs glyphicon glyphicon-pencil"></button>
                                <button @click="visible_modulos('eliminarCC'); cargar_eliminar_cc(reg)" class="btn btn-danger btn-xs glyphicon glyphicon-remove"></button>   
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-show="nuevoCC" class="container; text-center">
            <table align="center" class="table table-striped">
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Ingrese un nombre para el nuevo centro de costos:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" v-model="user_nuevo_centro_costos" class="form-control">
                    </td>
                </tr>
                <hr>
                <tr>
                    <td>
                        <button class="btn btn-danger" @click="visible_modulos('listarCC'); limpiar();">
                            Cancelar
                        </button>
                        <button class="btn btn-success" @click="guardar_centro_costos()">
                            Agregar
                        </button>
                    </td>
                </tr>
            </table>
        </div>
            
        <div v-show="editarCC" class="container; text-center">
            <table align="center" class="table table-striped">
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Edite el nombre del centro de costo:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" v-model="user_nuevo_centro_costos" class="form-control">
                    </td>
                </tr>
                <hr>
                <tr>
                    <td>
                        <button class="btn btn-danger" @click="visible_modulos('listarCC'); limpiar();">
                            Cancelar
                        </button>
                        <button class="btn btn-success" @click="editar_cc();">
                            Editar
                        </button>
                    </td>
                </tr>
            </table>
        </div>

        <div v-show="eliminarCC" class="container; text-center">
            <table align="center" class="table">
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Centro de costos seleccionado: "{{bd_nombre_cc}}"</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>¿Desea eliminar este centro de costos?</label>
                    </td>
                </tr>
                <hr>
                <tr>
                    <td>
                        <button class="btn btn-danger" @click="visible_modulos('listarCC'); limpiar();">
                            Cancelar
                        </button>
                        <button class="btn btn-warning" @click="eliminar_cc">
                            Eliminar
                        </button>
                    </td>
                </tr>   
            </table>
        </div>
    </div>

    `
})