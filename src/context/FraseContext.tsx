import React, { createContext, useContext, useMemo, useReducer } from 'react';
import * as Speech from 'expo-speech';

import type { Pictograma } from '../data/pictogramas';

// ------------------------------------------------------------------
// 1. La forma del estado
// ------------------------------------------------------------------

export type Favorito = {
  id: string;
  texto: string;
  simbolos: string;
};

type Estado = {
  frase: Pictograma[];
  favoritos: Favorito[];
};

const ESTADO_INICIAL: Estado = {
  frase: [],
  favoritos: [],
};

/** Máximo de pictogramas por frase (más no cabe en la barra ni se entiende). */
export const MAX_PICTOGRAMAS = 8;

// ------------------------------------------------------------------
// 2. Las acciones posibles
// ------------------------------------------------------------------

type Accion =
  | { tipo: 'AGREGAR'; pictograma: Pictograma }
  | { tipo: 'QUITAR_ULTIMO' }
  | { tipo: 'LIMPIAR' }
  | { tipo: 'GUARDAR_FAVORITO'; favorito: Favorito }
  | { tipo: 'BORRAR_FAVORITO'; id: string };

// ------------------------------------------------------------------
// 3. El reducer
// ------------------------------------------------------------------


export function fraseReducer(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case 'AGREGAR':
      // Al llegar al tope simplemente se ignora la pulsación.
      if (estado.frase.length >= MAX_PICTOGRAMAS) return estado;
      return { ...estado, frase: [...estado.frase, accion.pictograma] };

    case 'QUITAR_ULTIMO':
      // slice(0, -1) sobre un arreglo vacío devuelve otro vacío: no hace
      // falta comprobar la longitud.
      return { ...estado, frase: estado.frase.slice(0, -1) };

    case 'LIMPIAR':
      return { ...estado, frase: [] };

    case 'GUARDAR_FAVORITO': {
      // No se guarda dos veces la misma frase.
      const repetida = estado.favoritos.some((f) => f.texto === accion.favorito.texto);
      if (repetida) return estado;
      // Los nuevos van delante: lo último guardado es lo que más se busca.
      return { ...estado, favoritos: [accion.favorito, ...estado.favoritos] };
    }

    case 'BORRAR_FAVORITO':
      return {
        ...estado,
        favoritos: estado.favoritos.filter((f) => f.id !== accion.id),
      };

    default:
      return estado;
  }
}

// ------------------------------------------------------------------
// 4. Función auxiliar: construir el texto que se va a pronunciar
// ------------------------------------------------------------------

export function construirTexto(frase: Pictograma[]): string {
  if (frase.length === 0) return '';

  const texto = frase.map((p) => p.frase ?? p.etiqueta).join('. ');
  return texto.charAt(0).toUpperCase() + texto.slice(1) + '.';
}

// ------------------------------------------------------------------
// 5. El Context y su Provider
// ------------------------------------------------------------------

type ValorContexto = {
  frase: Pictograma[];
  favoritos: Favorito[];
  texto: string;
  vacia: boolean;
  agregar: (pictograma: Pictograma) => void;
  quitarUltimo: () => void;
  limpiar: () => void;
  hablar: (texto?: string) => void;
  guardarFavorito: () => void;
  borrarFavorito: (id: string) => void;
};

const FraseContext = createContext<ValorContexto | undefined>(undefined);

export function FraseProvider({ children }: { children: React.ReactNode }) {
  const [estado, despachar] = useReducer(fraseReducer, ESTADO_INICIAL);

  const texto = construirTexto(estado.frase);

  const hablar = (textoSuelto?: string) => {
    const aDecir = textoSuelto ?? texto;
    if (aDecir.trim().length === 0) return;

    Speech.stop();
    Speech.speak(aDecir, {
      language: 'es-MX',
      rate: 0.9, // más lento que lo normal: se entiende mejor
    });
  };

  const agregar = (pictograma: Pictograma) => {
    despachar({ tipo: 'AGREGAR', pictograma });
    // Eco de confirmación: al añadir se dice la palabra suelta, no la frase
    // entera. Repetir toda la frase en cada toque resulta lento y ruidoso.
    hablar(pictograma.etiqueta);
  };

  const guardarFavorito = () => {
    if (estado.frase.length === 0) return;
    despachar({
      tipo: 'GUARDAR_FAVORITO',
      favorito: {
        id: `fav-${Date.now()}`,
        texto,
        simbolos: estado.frase.map((p) => p.simbolo).join(' '),
      },
    });
  };

  /**
   * useMemo evita crear un objeto nuevo en cada render. Sin él, React
   * pensaría que el contexto cambió siempre y repintaría todas las
   * pantallas que lo consumen, aunque los datos fueran idénticos.
   */
  const valor = useMemo<ValorContexto>(
    () => ({
      frase: estado.frase,
      favoritos: estado.favoritos,
      texto,
      vacia: estado.frase.length === 0,
      agregar,
      quitarUltimo: () => despachar({ tipo: 'QUITAR_ULTIMO' }),
      limpiar: () => despachar({ tipo: 'LIMPIAR' }),
      hablar,
      guardarFavorito,
      borrarFavorito: (id: string) => despachar({ tipo: 'BORRAR_FAVORITO', id }),
    }),
    [estado, texto],
  );

  return <FraseContext.Provider value={valor}>{children}</FraseContext.Provider>;
}

/**
 * Hook para usar el contexto desde cualquier pantalla.
 *
 * Lanza un error claro si se usa fuera del Provider: es un fallo de
 * programación y es mejor que falle en seguida y con un mensaje entendible.
 */
export function useFrase(): ValorContexto {
  const contexto = useContext(FraseContext);
  if (contexto === undefined) {
    throw new Error('useFrase debe usarse dentro de <FraseProvider>');
  }
  return contexto;
}