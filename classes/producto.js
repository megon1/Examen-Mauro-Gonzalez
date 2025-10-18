class Producto {
    static items = [];

    constructor(codigo, nombre, precio) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    }

    // Método para agregar un producto a la lista estática
    static agregar(producto) {
        Producto.items.push(producto);
    }

    // eliminar un producto de la lista estática por código
    static eliminar(codigo) {
        const indice = Producto.items.findIndex(producto => producto.codigo === codigo);
        if (indice !== -1) {
            Producto.items.splice(indice, 1);
            return true;
        }
        return false;
    }

}
