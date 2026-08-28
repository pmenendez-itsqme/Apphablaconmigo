import { colores } from '../theme/estilos';

export type Pictograma = {
  id: string;
  etiqueta: string;
  simbolo: string;
  categoria: string;
  frase?: string;
};

export type Categoria = {
  id: string;
  nombre: string;
  simbolo: string;
  color: string;
};

/**
 * Cuatro categorías, en orden de uso real (no alfabético): primero lo que la
 * persona necesita, después cómo se siente.
 */
export const CATEGORIAS: Categoria[] = [
  { id: 'necesidades', nombre: 'Necesito', simbolo: '🙋', color: colores.necesidades },
  { id: 'emociones', nombre: 'Me siento', simbolo: '😊', color: colores.emociones },
  { id: 'comida', nombre: 'Comida', simbolo: '🍎', color: colores.comida },
  { id: 'acciones', nombre: 'Quiero hacer', simbolo: '🏃', color: colores.acciones },
];

/**
 * Se usan emoji en lugar de imágenes porque vienen con el sistema operativo:
 * la app funciona sin conexión, no pesa más y el dibujo se ve nítido a
 * cualquier tamaño.
 */
export const PICTOGRAMAS: Pictograma[] = [
  // --- Necesito ---
  { id: 'n1', etiqueta: 'Baño', simbolo: '🚻', categoria: 'necesidades', frase: 'Necesito ir al baño' },
  { id: 'n2', etiqueta: 'Agua', simbolo: '💧', categoria: 'necesidades', frase: 'Tengo sed, quiero agua' },
  { id: 'n3', etiqueta: 'Ayuda', simbolo: '🆘', categoria: 'necesidades', frase: 'Necesito ayuda, por favor' },
  { id: 'n4', etiqueta: 'Dormir', simbolo: '🛏️', categoria: 'necesidades', frase: 'Quiero dormir' },
  { id: 'n5', etiqueta: 'Frío', simbolo: '🥶', categoria: 'necesidades', frase: 'Tengo frío a cha chai' },
  { id: 'n6', etiqueta: 'Calor', simbolo: '🥵', categoria: 'necesidades', frase: 'Tengo calor' },
  { id: 'n7', etiqueta: 'Me duele', simbolo: '🤕', categoria: 'necesidades', frase: 'Me duele' },
  { id: 'n8', etiqueta: 'Medicina', simbolo: '💊', categoria: 'necesidades', frase: 'Necesito mi medicina' },
  { id: 'n9', etiqueta: 'Casa', simbolo: '🏠', categoria: 'necesidades', frase: 'Quiero ir a casa' },

  // --- Me siento ---
  { id: 'e1', etiqueta: 'Feliz', simbolo: '😄', categoria: 'emociones', frase: 'Estoy feliz' },
  { id: 'e2', etiqueta: 'Triste', simbolo: '😢', categoria: 'emociones', frase: 'Estoy triste' },
  { id: 'e3', etiqueta: 'Enojado', simbolo: '😠', categoria: 'emociones', frase: 'Estoy enojado' },
  { id: 'e4', etiqueta: 'Miedo', simbolo: '😨', categoria: 'emociones', frase: 'Tengo miedo' },
  { id: 'e5', etiqueta: 'Cansado', simbolo: '😴', categoria: 'emociones', frase: 'Estoy cansado' },
  { id: 'e6', etiqueta: 'Nervioso', simbolo: '😰', categoria: 'emociones', frase: 'Estoy nervioso' },
  { id: 'e7', etiqueta: 'Tranquilo', simbolo: '😌', categoria: 'emociones', frase: 'Estoy tranquilo' },
  { id: 'e8', etiqueta: 'Aburrido', simbolo: '🥱', categoria: 'emociones', frase: 'Estoy aburrido' },
  { id: 'e9', etiqueta: 'Solo', simbolo: '😔', categoria: 'emociones', frase: 'Me siento solo' },

  // --- Comida ---
  { id: 'c1', etiqueta: 'Hambre', simbolo: '🍽️', categoria: 'comida', frase: 'Tengo hambre' },
  { id: 'c2', etiqueta: 'Pan', simbolo: '🍞', categoria: 'comida' },
  { id: 'c3', etiqueta: 'Fruta', simbolo: '🍌', categoria: 'comida' },
  { id: 'c4', etiqueta: 'Arroz', simbolo: '🍚', categoria: 'comida' },
  { id: 'c5', etiqueta: 'Sopa', simbolo: '🍲', categoria: 'comida' },
  { id: 'c6', etiqueta: 'Pollo', simbolo: '🍗', categoria: 'comida' },
  { id: 'c7', etiqueta: 'Leche', simbolo: '🥛', categoria: 'comida' },
  { id: 'c8', etiqueta: 'Jugo', simbolo: '🧃', categoria: 'comida' },
  { id: 'c9', etiqueta: 'Más', simbolo: '➕', categoria: 'comida', frase: 'Quiero más' },

  // --- Quiero hacer ---
  { id: 'a1', etiqueta: 'Jugar', simbolo: '🧸', categoria: 'acciones', frase: 'Quiero jugar' },
  { id: 'a2', etiqueta: 'Salir', simbolo: '🚶', categoria: 'acciones', frase: 'Quiero salir' },
  { id: 'a3', etiqueta: 'Ver tele', simbolo: '📺', categoria: 'acciones', frase: 'Quiero ver la televisión' },
  { id: 'a4', etiqueta: 'Música', simbolo: '🎵', categoria: 'acciones', frase: 'Quiero escuchar música' },
  { id: 'a5', etiqueta: 'Abrazo', simbolo: '🤗', categoria: 'acciones', frase: 'Quiero un abrazo' },
  { id: 'a6', etiqueta: 'Dibujar', simbolo: '🎨', categoria: 'acciones', frase: 'Quiero dibujar' },
  { id: 'a7', etiqueta: 'Bañarme', simbolo: '🛁', categoria: 'acciones', frase: 'Quiero bañarme' },
  { id: 'a8', etiqueta: 'Sí', simbolo: '✅', categoria: 'acciones', frase: 'Sí' },
  { id: 'a9', etiqueta: 'No', simbolo: '❌', categoria: 'acciones', frase: 'No' },
  { id: 'a10', etiqueta: 'Bailar', simbolo: '💃🏼', categoria: 'acciones', frase: 'Bailar' },
];

/** Devuelve los pictogramas de una categoría. */
export function pictogramasDe(categoriaId: string): Pictograma[] {
  return PICTOGRAMAS.filter((p) => p.categoria === categoriaId);
}

/** Busca una categoría por su id. */
export function buscarCategoria(id: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.id === id);
}