import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import type { Pictograma } from '../data/pictogramas';
import { buscarCategoria } from '../data/pictogramas';
import { colores, espacio } from '../theme/estilos';

type Props = {
  pictograma: Pictograma;
  onPress: (pictograma: Pictograma) => void;
};

export default function TarjetaPictograma({ pictograma, onPress }: Props) {
  const categoria = buscarCategoria(pictograma.categoria);

  return (
    <Pressable
      onPress={() => onPress(pictograma)}
      style={({ pressed }) => [estilos.tarjeta, pressed && estilos.pulsada]}
      accessibilityRole="button"
      // Se lee la frase completa, no la etiqueta corta: para un lector de
      // pantalla "Necesito ir al baño" es mucho más útil que "Baño".
      accessibilityLabel={pictograma.frase ?? pictograma.etiqueta}
    >
      <Text
        style={[
          estilos.simbolo,
          { backgroundColor: categoria?.color ?? colores.principal },
        ]}
      >
        {pictograma.simbolo}
      </Text>
      <Text style={estilos.etiqueta} numberOfLines={2}>
        {pictograma.etiqueta}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    // flex: 1 reparte el ancho por igual entre las columnas de la FlatList.
    flex: 1,
    margin: espacio.xs,
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colores.borde,
    alignItems: 'center',
    paddingVertical: espacio.sm,
    paddingHorizontal: espacio.xs,
  },
  pulsada: {
    backgroundColor: colores.principalSuave,
    borderColor: colores.principal,
  },
  simbolo: {
    fontSize: 46,
    borderRadius: 8,
    paddingHorizontal: espacio.sm,
    overflow: 'hidden', // necesario en iOS para que se vea el borderRadius
  },
  etiqueta: {
    marginTop: espacio.xs,
    fontSize: 15,
    fontWeight: '700',
    color: colores.texto,
    textAlign: 'center',
  },
});