/**
 * TIPOS DE NAVEGACIÓN
 *
 * Las rutas de la pila y los parámetros que recibe cada una.
 *
 *   `Inicio: undefined`  -> esa pantalla no recibe parámetros.
 *   `Categoria: { ... }` -> hay que pasarle esos datos al navegar.
 *
 * Declararlo así hace que TypeScript avise si navegas a una pantalla que no
 * existe o si te olvidas de un parámetro.
 *
 * ¿POR QUÉ EN UN ARCHIVO APARTE Y NO DENTRO DE AppNavigator?
 * Porque las pantallas necesitan estos tipos para tiparse, y AppNavigator
 * necesita las pantallas para montarlas. Si los tipos vivieran dentro de
 * AppNavigator, cada pantalla tendría que importarlo y se formaría un círculo
 * de importaciones. Con los tipos en su propio archivo, los dos lados dependen
 * de él y de nadie más.
 */
export type StackParams = {
  Inicio: undefined;
  Categoria: { categoriaId: string; nombre: string };
};

/**
 * Rutas de la pila RAÍZ, la más externa de todas.
 *
 * `Bienvenida` es la primera pantalla que ve el usuario; `Principal` es todo
 * el resto de la app (las pestañas). Están en una pila aparte para que la
 * bienvenida quede FUERA de las pestañas: si estuviera dentro, aparecería
 * como una pestaña más en la barra de abajo.
 */
export type RootStackParams = {
  Bienvenida: undefined;
  Principal: undefined;
};
