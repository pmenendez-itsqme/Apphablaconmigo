import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import BarraFrase from '../components/BarraFrase';
import TarjetaPictograma from '../components/TarjetaPictograma';
import { useFrase } from '../context/FraseContext';
import { pictogramasDe } from '../data/pictogramas';
import { colores, espacio } from '../theme/estilos';

export default function EmocionesScreen() {
  const { agregar } = useFrase();
  const emociones = pictogramasDe('emociones');

  return (
    <View style={estilos.pantalla}>
      <BarraFrase />

      <Text style={estilos.intro}>Toca cómo te sientes ahora mismo.</Text>

      <FlatList
        data={emociones}
        keyExtractor={(pictograma) => pictograma.id}
        numColumns={3}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => (
          <TarjetaPictograma pictograma={item} onPress={agregar} />
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  intro: {
    fontSize: 15,
    color: colores.textoSuave,
    paddingHorizontal: espacio.md,
    paddingTop: espacio.sm,
  },
  lista: {
    paddingHorizontal: espacio.xs,
    paddingVertical: espacio.sm,
  },
});