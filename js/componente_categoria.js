Vue.component('componente_categoria',
{
    data: function ()
    {
        return{
            //datos
            user_nueva_categoria       : '',
            bd_id                      : '',
            bd_nombre_categoria        : '',
            //modulos
            listarCategoria            : true,
            editarCategoria            : false,
            eliminarCategoria          : false,
            nuevaCategoria             : false,
            //array
            categorias:[],
        }
    },
    mounted: function()
    {
        this.visible_modulos('listarCategoria');
        this.listar_categoria();
    },
    methods:
    {
        limpiar: function()
        {
            this.user_nueva_categoria = '',
            this.bd_id                = '',
            this.bd_nombre_categoria  = '';
        },
        visible_modulos: function(modulo)
        {
            this.listarCategoria    = false;
            this.editarCategoria    = false;
            this.eliminarCategoria  = false;
            this.nuevaCategoria     = false;

            if(modulo === 'listarCategoria')
            {
                this.listarCategoria = true;
            }
            if(modulo === 'editarCategoria')
            {
                this.editarCategoria = true;
            }
            if(modulo === 'eliminarCategoria')
            {
                this.eliminarCategoria = true;
            }
            if(modulo === 'nuevaCategoria')
            {
                this.nuevaCategoria = true;
            }
        },
        cargar_eliminar_categoria: function (reg)
        {
                this.bd_id                  = reg.id_categoria;
                this.bd_nombre_categoria    = reg.nombre_categoria;
        },
        eliminar_categoria:function()
        {
            let post =
            {
                opcion      :"eliminar_categoria",
                bd_id       : this.bd_id,
            };
            axios.post("/SisInventario/datos/base_data.php",post).then(response =>
                {
                    alert('Categoría eliminada correctamente!');
                    this.limpiar();
                    this.visible_modulos('listarCategoria');
                    this.listar_categoria();
                });
        },
        cargar_editar_categoria: function(reg)
        {
            this.bd_id                  = reg.id_categoria;
            this.user_nueva_categoria   = reg.nombre_categoria;
        },
        editar_categoria:function()
        {
            if(this.user_nueva_categoria.length === 0)
            {
                alert("El nombre de la nueva categoría no puede estar vacío!")
                return 0;
            }
            let post =
            {
                opcion      : "editar_categoria",
                nombre      : this.user_nueva_categoria,
                bd_id       : this.bd_id,
            };
            axios.post("/SisInventario/datos/base_data.php",post).then(response =>
                {
                    alert("Categoría actualizada correctamente!");
                    this.limpiar();
                    this.visible_modulos('listarCategoria');
                    this.listar_categoria();
                });
        },
        guardar_categoria: function()
        {
            if(this.user_nueva_categoria.length === 0)
            {
                alert("El nombre de la nueva categoría no puede estar vacío!")
                return 0;
            }
            let pre = 
            {
                opcion       : "validar_categoria",
                nombre       : this.user_nueva_categoria,
            };
            axios.post("/SisInventario/datos/base_data.php", pre).then(response => 
            {
                if(response.data > 0)
                {
                    alert("La categoría ya existe!");
                }
                else
                {
                    let post = 
                    {
                        opcion       : "guardar_categoria",
                        nombre       : this.user_nueva_categoria,
                    };
                    axios.post("/SisInventario/datos/base_data.php", post).then(response => 
                    {
                        alert("Categoría creada exitosamente");
                        this.limpiar();
                        this.visible_modulos('listarCategoria');
                        this.listar_categoria();
                    });
                }
            });
        },
        listar_categoria:function()
        {
            let post =
            {
                opcion : "listar_categoria",
            };
            axios.post("/SisInventario/datos/base_data.php", post).then(response =>
            {
                this.categorias = response.data;
            });
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
                <div class="table-responsive" v-if="listarCategoria">
                    <button @click="visible_modulos('nuevaCategoria')" class="btn btn-primary">Nueva Categoria</button>
                    <br>
                    <br>
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
                            <tr v-for="reg in categorias">
                                <td><strong>{{reg.id_categoria}}</strong></td>
                                <td>{{reg.nombre_categoria}}</td>
                                <td>
                                    <button @click="visible_modulos('editarCategoria'); cargar_editar_categoria(reg)" class="btn btn-success btn-xs glyphicon glyphicon-pencil"></button>
                                    <button @click="visible_modulos('eliminarCategoria'); cargar_eliminar_categoria(reg)" class="btn btn-danger btn-xs glyphicon glyphicon-remove"></button>
                                </td>
                            </tr>
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>

        <div v-show="nuevaCategoria" class="container; text-center">
            <table align="center" class="table table-striped">
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Ingrese un nombre para la categoría:</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input class="form-control" type="text" v-model="user_nueva_categoria">
                    </td>
                </tr>
                <hr>
                <tr>
                    <td>
                        <button class="btn btn-danger" @click="visible_modulos('listarCategoria')">
                            Cancelar
                        </button>
                        <button class="btn btn-success" @click="guardar_categoria">
                            Agregar
                        </button>
                    </td>
                </tr>
            </table>
        </div>

            <div v-show="editarCategoria" class="container; text-center">
            <table align="center" class="table table-striped">
                    <tr>
                        <td class="form-control text-left" style="background-color:#ededed;">
                            <label>Nombre:</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input class="form-control" type="text" v-model="user_nueva_categoria">
                        </td>
                    </tr>
                    <hr>
                    <tr>
                        <td>
                            <button class="btn btn-danger" @click="visible_modulos('listarCategoria'); limpiar()">
                                Cancelar
                            </button>
                            <button class="btn btn-success" @click="editar_categoria()">
                            Editar
                            </button>
                        </td>
                    </tr>
                </table>
            </div>

            <div v-show="eliminarCategoria" class="container; text-center">
            <table align="center" class="table">
                <tr>
                    <td class="form-control text-left" style="background-color:#ededed;">
                        <label>Categoria seleccionada: {{bd_nombre_categoria}}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>¿Desea eliminar esta categoria?</label>
                    </td>
                </tr>
                <hr>
                <tr>
                    <td>
                        <button class="btn btn-danger" @click="visible_modulos('listarCategoria')">
                            Cancelar
                        </button>
                        <button class="btn btn-warning" @click="eliminar_categoria">
                            Eliminar
                        </button>
                    </td>
                </tr>   
            </table>
            </div>

    </div>
    `
})