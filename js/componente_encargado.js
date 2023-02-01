Vue.component('componente_encargado',
{
    data: function ()
    {
        return {
            //datos
    	    user_nuevo_encargado_rut          : '',
            user_nuevo_encargado_nombre       : '',
            user_nuevo_encargado_apellido     : '',
            bd_id                             : '',
            bd_nombre_encargado               : '',
            bd_apellido_encargado             : '',
            //modulos
            listarEncargado                   : true,
            editarEncargado                   : false,
            eliminarEncargado                 : false,
            nuevoEncargado                    : false,
            //array
            encargados:[],
  	    }
    },
    mounted: function()
    {
        this.visible_modulos('listarEncargado');
        this.listar_encargado();
    },
    computed:
    {
        formatedRut: 
        {
            get() 
            {
                return this.formatRut(this.user_nuevo_encargado_rut);
            },
            set(modifiedValue) 
            {
                this.user_nuevo_encargado_rut = modifiedValue;
            },
        },
    },
    methods:
    {
        limpiar: function()
        {
            this.user_nuevo_encargado_rut         = '';
            this.user_nuevo_encargado_nombre      = '';
            this.user_nuevo_encargado_apellido    = '';
            this.bd_id                            = '',
            this.bd_nombre_encargado              = '',
            this.bd_apellido_encargado            = '';
        },
        visible_modulos: function(modulo)
        {
            this.listarEncargado    = false;
            this.editarEncargado    = false;
            this.eliminarEncargado  = false;
            this.nuevoEncargado    = false;

            if(modulo === 'listarEncargado')
            {
                this.listarEncargado = true;
            }
            if(modulo === 'editarEncargado')
            {
                this.editarEncargado = true;
            }
            if(modulo === 'eliminarEncargado')
            {
                this.eliminarEncargado = true;
            }
            if(modulo === 'nuevoEncargado')
            {
                this.nuevoEncargado = true;
            }
        },
        cargar_eliminar_encargado: function (reg)
        {
            this.bd_id                    = reg.rut_encargado;
            this.bd_nombre_encargado      = reg.nombre_encargado;
            this.bd_apellido_encargado    = reg.apellido_encargado;
        },
        eliminar_encargado: function()
        {
            let post = 
            {
                opcion      : "eliminar_encargado",
                bd_id       : this.bd_id,
            };
            axios.post("/SisInventario/datos/base_data.php",post).then(response =>
                {
                    alert('Encargado eliminado correctamente!');
                    this.limpiar();
                    this.visible_modulos('listarEncargado');
                    this.listar_encargado();
                });
        },
        cargar_editar_encargado: function(reg)
        {
            this.bd_id                            = reg.rut_encargado;
            this.user_nuevo_encargado_rut         = reg.rut_encargado;
            this.user_nuevo_encargado_nombre      = reg.nombre_encargado;
            this.user_nuevo_encargado_apellido    = reg.apellido_encargado;
        },
        editar_encargado:function()
        {
            if(this.user_nuevo_encargado_rut.length === 0)
            {
                alert("El rut no puede estar vacío!")
                return 0;
            }
            if(this.user_nuevo_encargado_nombre.length === 0)
            {
                alert("El apellido no puede estar vacío!")
                return 0;
            }
            if(this.user_nuevo_encargado_apellido.length === 0)
            {
                alert("El apellido no puede estar vacío!")
                return 0;
            }
            let post =
            {
                opcion      : "editar_encargado",
                bd_id       : this.bd_id,
                rut         : this.user_nuevo_encargado_rut,
                nombre      : this.user_nuevo_encargado_nombre,
                apellido    : this.user_nuevo_encargado_apellido
            };
            axios.post("/SisInventario/datos/base_data.php",post).then(response =>
                {
                    alert("Encargado actualizado correctamente!");
                    this.limpiar();
                    this.visible_modulos('listarEncargado');
                    this.listar_encargado();
                });
        },
        listar_encargado:function()
        {
            let post =
            {
                opcion : "listar_encargado",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
                {
                    this.encargados = response.data;
                }
                );
        },
        formatRut(number)
        {
            const rutNumbersArray = number.split("");
            rutNumbersArray.forEach((number, index) =>
            {
              if(index === 2 || index === 6)
              {
                if (number !== '.') 
                {
                  rutNumbersArray.splice(index, 0, '.');
                }
              }
            }
            );
            if (!rutNumbersArray.includes('-') && rutNumbersArray.length === 10) 
            {
              rutNumbersArray.push('-');
            }
            return rutNumbersArray.join("");
          },
          guardar_nueva_persona: function()
        {
            if(this.user_nuevo_encargado_rut.length === 0)
            {
                alert("El rut del encargado no puede estar vacío!")
                return 0;
            }
            else
            {
                if(this.user_nuevo_encargado_nombre.length === 0)
                {
                    alert("El nombre del encargado no puede estar vacío!")
                    return 0;
                }
                else
                {
                    if(this.user_nuevo_encargado_apellido.length === 0)
                    {
                        alert("El apellido del encargado no puede estar vacío!")
                        return 0;
                    }
                }
            }
            let pre = 
            {
                opcion       : "validar_nuevo_encargado",
                rut          : this.user_nuevo_encargado_rut,
            };
            axios.post("/SisInventario/datos/base_data.php", pre).then(response => 
            {
                if(response.data > 0)
                {
                    alert("El encargado ya existe!");
                }
                else
                {
                    let post = 
                    {
                        opcion       : "guardar_nuevo_encargado",
                        rut          : this.user_nuevo_encargado_rut,
                        nombre       : this.user_nuevo_encargado_nombre,
                        apellido     : this.user_nuevo_encargado_apellido
                    };
                    axios.post("/SisInventario/datos/base_data.php", post).then(response => 
                    {
                        alert("Encargado guardado exitosamente");
                        this.user_nuevo_encargado_rut         = '';
                        this.user_nuevo_encargado_nombre      = '';
                        this.user_nuevo_encargado_apellido    = '';
                        this.limpiar();
                        this.visible_modulos('listarEncargado');
                        this.listar_encargado();
                    });
                }
            });
        }
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
        <div id="app" class="container; text-center">
            <br>
            <hr style="height:2px;border-width:0;color:gray;background-color:gray">
            <div class="table-resposive" v-show="listarEncargado"> 
            <button @click="visible_modulos('nuevoEncargado')" class="btn btn-primary" style="margin-bottom:1%;">Nuevo Encargado</button>
            <table align="center" class="table table-striped">
            <tr>
                <td>
                    <label>
                        RUT
                    </label>
                </td>
                <td>
                    <label>
                        Nombre
                    </label>
                </td>
                <td>
                    <label>
                        Apellido
                    </label>
                </td>
                <td>
                    <label>
                        Asignaciones
                    </label>
                </td>
                <td>
                    <label>
                        Accion
                    </label>
                </td>
            </tr>
            <tbody>
                <tr v-for="reg in encargados">
                    <td><strong>{{reg.rut_encargado}}</strong>
                    <td>{{reg.nombre_encargado}}</td>
                    <td>{{reg.apellido_encargado}}</td>
                    <td>{{reg.asignaciones}}</td>
                    <td>
                        <button @click="visible_modulos('editarEncargado'); cargar_editar_encargado(reg)" class="btn btn-success btn-xs glyphicon glyphicon-pencil"></button>
                        <button @click="visible_modulos('eliminarEncargado'); cargar_eliminar_encargado(reg)" class="btn btn-danger btn-xs glyphicon glyphicon-remove"></button>   
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        </div>

        <div v-show="nuevoEncargado" class="container; text-center">
            <table align="center" class="table table-striped">
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Ingrese el RUT del encargado:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="formatedRut" autocomplete="off" pattern="[0-9]{1,3}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}" maxlength="12">
                </td>
            </tr>

            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Ingrese los nombres del encargado:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="user_nuevo_encargado_nombre">
                </td>
            </tr>
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Ingrese los apellidos del encargado:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="user_nuevo_encargado_apellido">
                </td>
            </tr>
            <hr>
            <tr>
                <td>
                    <button class="btn btn-danger" @click="visible_modulos('listarEncargado'); limpiar();">
                        Cancelar
                    </button>
                    <button class="btn btn-success" @click="guardar_nueva_persona">
                        Guardar
                    </button>
                </td>
            </tr>
            </table>
        </div>

        <div v-show="editarEncargado" class="container; text-center">
            <table align="center" class="table table-striped">
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>RUT del encargado:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="user_nuevo_encargado_rut">
                </td>
            </tr>
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Nombre del encargado:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="user_nuevo_encargado_nombre">
                </td>
            </tr>
            <tr>
                <td class="form-control text-left" style="background-color:#ededed;">
                    <label>Apellido del encargado:</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input class="form-control" type="text" v-model="user_nuevo_encargado_apellido">
                </td>
            </tr>
            <hr>
            <tr>
                <td>
                    <button class="btn btn-danger" @click="visible_modulos('listarEncargado'); limpiar();">
                        Cancelar
                    </button>
                    <button class="btn btn-success" @click="editar_encargado();">
                        Editar
                    </button>
                </td>
            </tr>
            </table>
        </div>

        <div v-show="eliminarEncargado" class="container; text-center">
            <table align="center" class="table">
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Encargado seleccionado: ({{bd_id}}) {{bd_nombre_encargado}} {{bd_apellido_encargado}}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>¿Desea eliminar éste encargado?</label>
                    </td>
                </tr>
                <hr>
                <tr>
                    <td>
                        <button class="btn btn-danger" @click="visible_modulos('listarEncargado'); limpiar();">
                            Cancelar
                        </button>
                        <button class="btn btn-warning" @click="eliminar_encargado">
                            Eliminar
                        </button>
                    </td>
                </tr>   
            </table>
        </div>

    </div>
    `
});