import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import BarraFrase from '../components/BarraFrase';
import TarjetaPictograma from '../components/TarjetaPictograma';
import { pictogramasDe } from '../data/pictogramas';
import { useFrase } from '../context/FraseContext';
import type { StackParams } from '../navigation/types';
import { colores, espacio } from '../theme/estilos';


type Props = NativeStackScreenProps<StackParams, 'Categoria'>;

export default function CategoriaScreen({ route }: Props) {
  // Dato recibido de la pantalla anterior.
  const { categoriaId } = route.params;

  // Estado LOCAL de esta pantalla.
  const [busqueda, setBusqueda] = useState('');

  // Estado GLOBAL, compartido con las demás pantallas.
  const { agregar } = useFrase();

  const pictogramas = pictogramasDe(categoriaId);

  // Filtro sencillo por nombre. `toLowerCase()` en ambos lados para que
  // dé igual cómo se escriba.
  const visibles = pictogramas.filter((p) =>
    p.etiqueta.toLowerCase().includes(busqueda.toLowerCase().trim()),
  );

  return (
    <View style={estilos.pantalla}>
      <BarraFrase />

      <TextInput
        style={estilos.buscador}
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder="Buscar..."
        placeholderTextColor={colores.textoSuave}
        accessibilityLabel="Buscar un pictograma"
        // Se desactiva el autocorrector: en Android puede añadir espacios
        // invisibles y estropear la búsqueda.
        autoCorrect={false}
      />

      <FlatList
        data={visibles}
        keyExtractor={(pictograma) => pictograma.id}
        // 3 columnas: celdas grandes y fáciles de acertar en un teléfono.
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
  buscador: {
    margin: espacio.sm,
    height: 48,
    borderWidth: 2,
    borderColor: colores.borde,
    borderRadius: 12,
    backgroundColor: colores.tarjeta,
    paddingHorizontal: espacio.md,
    fontSize: 16,
    color: colores.texto,
  },
  lista: {
    paddingHorizontal: espacio.xs,
    paddingBottom: espacio.md,
  },
});